---
title: TypeScript
---

> JS 생태계에서 **협업을 가능하게 만드는 언어**

TypeScript는 JavaScript를 더 안전하게 만드는 언어라기보다는,
**코드베이스가 커질수록 사람 사이의 약속을 강제하는 도구**에 가깝다.

Unity 개발자 관점에서는 이렇게 이해하면 가장 빠르다:

> **TypeScript는 JS 세계에서 C#의 타입 시스템과 인터페이스 문화 역할을 한다.**

---

## 1. 타입은 설계를 문서화하는 수단이다

TypeScript의 타입은 컴파일러만을 위한 것이 아니다.
**사람에게 보여주는 설계 문서**에 가깝다.

```ts
interface UserProfile {
  id: string;
  level: number;
  nickname?: string;
}
```

이 타입 하나로:

* 서버 개발자
* 프론트엔드 개발자
* 툴 개발자

가 **같은 데이터 구조를 기준으로 대화**하게 된다.

### Unity 개발자 관점의 대응 개념

* C#의 `interface`, DTO, public API
* ScriptableObject로 구조를 고정하는 설계 방식
* Addressables 설정 구조를 문서로 남기는 감각

**대화용 정리 문장**

> “TypeScript 타입은 런타임 기능이라기보단,
> API와 데이터 구조를 팀 단위로 공유하기 위한 설계 문서에 가깝다고 봅니다.”

---

## 2. any를 쓰는 순간 발생하는 비용

`any`는 TypeScript에서 **컴파일러에게 타입 검증 책임을 포기한다**는 선언이다.

```ts
function handle(data: any) {
  return data.user.profile.level;
}
```

이 코드는:

* API 구조가 바뀌어도
* 필드가 사라져도
* 타입이 틀려도

**컴파일 에러 없이 통과한다.**

### 즉시 발생하는 비용

* 타입 안정성 상실
* 자동 완성 및 리팩토링 품질 저하
* 런타임 에러 가능성 증가

### Unity / C# 쪽으로 번역하면

* `object`로 모든 걸 받는 코드
* `Dictionary<string, object>` 남발
* `dynamic`에 의존한 로직

**대화용 정리 문장**

> “any를 쓰는 순간, API 변경을 컴파일 타임에 잡아주는 안전망을 스스로 버리는 셈이라서
> 최소한의 경계 지점에서만 사용하는 게 맞다고 생각합니다.”

---

## 3. API 변경은 어떻게 컴파일 타임에 감지되는가

TypeScript가 협업에서 강력한 이유는,
**API 변경 비용을 런타임이 아니라 컴파일 타임으로 끌어올린다는 점**이다.

```ts
// before
interface User {
  id: string;
  level: number;
}

// after
interface User {
  id: string;
  exp: number;
}
```

이 변경이 발생하면:

* `user.level`을 사용하는 모든 코드에서 컴파일 에러 발생
* QA나 런타임 이전에 문제 인지 가능
* 변경 영향 범위가 즉시 드러남

### Unity 개발자에게 익숙한 감각

* C#에서 프로퍼티 이름 변경 시 컴파일 에러 발생
* Addressables key 변경 시 참조 코드가 깨지는 경험
* ScriptableObject 구조 변경 시 직렬화 문제를 바로 인지하는 흐름

**대화용 정리 문장**

> “TypeScript는 API 변경이 런타임 버그가 아니라
> 컴파일 에러로 드러나게 만들어서, 대규모 협업에서 안정성이 크게 올라갑니다.”

---

## 한 문단 요약 (소통용)

> “TypeScript는 JS를 빠르게 만드는 언어라기보다는,
> 팀 단위 협업에서 API와 데이터 구조를 타입으로 문서화하고,
> 변경 비용을 런타임이 아니라 컴파일 타임으로 옮겨주는 도구라고 생각합니다.
> any를 쓰는 순간 그 안전망을 포기하게 되죠.”

---

## Unity 개발자가 TypeScript를 이해하면 좋은 이유

* 웹 기반 툴, 관리자 페이지, 빌드 파이프라인과 자연스럽게 소통 가능
* 서버/프론트 개발자의 의사결정 맥락 이해
* 단순 클라이언트 개발자가 아니라 **플랫폼 관점 개발자**로 확장됨
