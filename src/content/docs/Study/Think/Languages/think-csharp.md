---
title: C# / .NET
---

## 1. GC 압박은 언제 발생하는가

GC는 메모리가 부족해서만 발생하지 않는다. 대부분의 성능 문제는 **할당 패턴(allocation pattern)** 때문에 생긴다.

### 핵심 질문

* 무엇을 얼마나 자주 할당하는가?
* 그 객체는 얼마나 오래 살아남는가?
* 어느 스레드(특히 메인 스레드)에서 발생하는가?

### GC 압박이 커지는 대표 사례

* 프레임 루프 안에서 반복적인 `new`
* LINQ / 람다 / 클로저로 인한 숨은 할당
* 문자열 결합(`+=`)의 반복 사용
* 박싱(Boxing) 발생 (`object`, `interface`, `enum` 등)
* `List<T>` / `Dictionary<K,V>`의 빈번한 resize
* Unity 특화: IMGUI, Instantiate/Destroy, 일부 API 내부 할당

<details>
<summary>Unity에서 GC Alloc을 줄이는 대표 패턴</summary>

- 프레임 루프에서 new 제거
  * Update / LateUpdate / FixedUpdate 안에서 객체 생성 금지
  * 풀링(Object Pool) 사용

- 컬렉션 재사용
  * List/Dictionary를 필드로 유지하고 Clear 사용
  * Capacity를 미리 지정

- LINQ 제거
  * Select / Where / ToList 대신 for 루프
  * 람다 캡처 주의

- 문자열 최적화
  * StringBuilder 재사용
  * 로그 문자열은 조건부로 생성

- Boxing 방지
  * interface / object 사용 시 값형 주의
  * enum → int 캐스팅 주의

- Unity API 주의
  * Find 계열 API 최소화
  * Instantiate/Destroy 대신 Pool

- Coroutine vs async
  * IEnumerator는 내부적으로 할당 발생 가능
  * 반복 사용 시 캐싱 고려

- 구조체 활용
  * 작은 데이터는 struct
  * 단, 복사 비용 고려

- Span / ArraySegment (가능한 환경에서)
  * 임시 배열 생성 방지

- Profiler 기반 검증
  * GC Alloc 컬럼 확인
  * Deep Profile은 참고용으로만 사용


</details>

---

## 2. async / await와 Task 스케줄링

async/await는 스레드를 만드는 문법이 아니다. **중단과 재개 지점**을 만드는 문법이다.

### 재개 위치를 결정하는 요소

* SynchronizationContext
* TaskScheduler

Unity 환경에서는 await 이후가 메인 스레드로 돌아오는 경우가 많지만, 이는 **컨텍스트에 의존**한다.

### 중요한 구분

* IO-bound 작업: async/await로 효과 큼
* CPU-bound 작업: ThreadPool / JobSystem 등 별도 처리 필요

### 자주 나오는 논의 포인트

* 예외는 어디서 처리되는가
* fire-and-forget의 위험성
* CancellationToken 포함 여부

<details>
<summary>async/await & UniTask</summary>

- 메인 스레드 복귀
  * SynchronizationContext 의존
  * 명시적 복귀 API 사용 여부 확인

- fire-and-forget 위험성
  * 예외 누락
  * 로그만 남고 장애 감지 어려움

- CancellationToken 설계
  * 화면 전환/오브젝트 파괴 시 취소 가능 여부

- IO vs CPU 구분
  * async는 IO 대기 최적화
  * CPU 작업은 Task.Run / JobSystem 필요

- UniTask 장점
  * Allocation 감소
  * Unity 친화적 API

- 흔한 실수
  * async void 남용
  * await 없는 async 메서드
 
대화용 한 문장
> "비동기 작업은 IO 대기와 연산을 분리해서 설계했습니다. 메인 스레드 복귀 시점을 명확히 관리합니다."

</details>

---

## 3. IL2CPP / AOT 환경의 변화

IL2CPP는 JIT이 아닌 AOT 환경이다. 즉, 런타임에 코드를 생성하지 않는다.

### 주요 영향

* 리플렉션 사용 시 스트리핑 이슈
* 제네릭 타입은 사용된 경우만 코드 생성
* `link.xml`, `[Preserve]` 필요성
* 스택 트레이스/디버깅 난이도 증가

### 대화에 쓰이는 한 문장 요약

> "IL2CPP에서는 런타임 동적 기능이 제한되기 때문에, 코드 참조를 명시적으로 유지해야 합니다."

<details>
<summary>IL2CPP / AOT 환경</summary>

* 핵심 전제

  * JIT 없음
  * 런타임 코드 생성 불가

* 스트리핑 이슈

  * 리플렉션 사용 시 타입 제거 위험
  * link.xml / [Preserve] 필요

* 제네릭 주의사항

  * 사용된 닫힌 제네릭만 코드 생성
  * MakeGenericType 패턴 위험

* 성능 특성

  * 플랫폼별 차이 큼
  * 빌드 옵션 영향 큼 (Strip Level, Code Generation)

* 디버깅 포인트

  * 스택 트레이스 제한
  * 심볼/옵션 설정 중요

* 네이티브/플랫폼 이슈

  * Android/iOS 네이티브 라이브러리 충돌 가능
  * 빌드 파이프라인(Bee/Gradle/Xcode) 이해 필요

* 실전 한 문장 요약

  * "IL2CPP에서는 동적 기능을 최소화하고, 필요한 타입과 제네릭을 명시적으로 유지하는 쪽으로 설계했습니다."

</details>

---

## 4. 스레드 기본 원리

### 프로세스 vs 스레드

* 프로세스: 메모리 공간 단위
* 스레드: 실행 흐름 단위 (stack + instruction pointer)

### 왜 문제가 되는가

* Race Condition
* Visibility 문제
* Atomicity 깨짐

### 해결 전략

1. 공유를 허용하고 보호 (lock, mutex)
2. 공유를 줄이고 메시지 전달 (queue, channel)

Unity에서는 대부분의 API가 메인 스레드 전용이므로, 백그라운드 작업 후 메인 스레드 복귀 패턴이 일반적이다.
