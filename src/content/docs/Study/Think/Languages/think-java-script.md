---
title: JavaScript
sidebar:
  order: 3
---

> 모든 웹 기술의 기반이 되는 언어

JavaScript는 문법보다 **실행 모델(Runtime Model)** 을 이해하는 것이 훨씬 중요하다.
Unity 개발자에게 JS는 “웹 문법”이 아니라, **비동기 처리와 이벤트 기반 실행을 설명하기 위한 공통 언어**에 가깝다.

---

## 1. 이벤트 루프 / 마이크로태스크 / 매크로태스크

JavaScript의 핵심은 **이벤트 루프(Event Loop)** 다.

> JS 코드는 한 번에 하나만 실행되지만,
> 실행 "예약"은 여러 큐에서 동시에 관리된다.

### 기본 구조

* **Call Stack**: 현재 실행 중인 코드
* **Task Queue (Macro Task)**: setTimeout, setInterval, DOM 이벤트 등
* **Microtask Queue**: Promise.then, async/await 재개 지점
* **Event Loop**: Call Stack이 비면 큐에서 작업을 가져옴

### 실행 우선순위

1. Call Stack
2. Microtask Queue (전부 비울 때까지)
3. Macro Task Queue (하나씩)

```js
setTimeout(() => console.log("A"));
Promise.resolve().then(() => console.log("B"));
console.log("C");

// 출력 순서: C → B → A
```

### Unity 개발자에게 대응되는 개념

* 메인 스레드 루프
* Job 큐 / 메시지 큐
* 프레임 끝나고 처리되는 콜백들

**대화용 정리 문장**

> “JavaScript는 싱글 스레드지만, 이벤트 루프와 여러 큐 덕분에
> 비동기 작업의 실행 순서를 정교하게 제어합니다.”

---

## 2. Promise 체이닝 vs async / await

Promise와 async/await는 **같은 비동기 모델**을 다른 문법으로 표현한 것이다.

### Promise 체이닝

```js
fetch(url)
  .then(r => r.json())
  .then(data => process(data))
  .catch(err => handle(err));
```

* 콜백 흐름이 드러남
* 중간 분기/에러 처리 가독성 저하 가능

### async / await

```js
try {
  const r = await fetch(url);
  const data = await r.json();
  process(data);
} catch (e) {
  handle(e);
}
```

* 동기 코드처럼 읽힘
* 예외 처리 흐름이 명확

### Unity 개발자 관점

* `Coroutine` vs `async/await (UniTask)` 비교와 매우 유사
* 문법 차이일 뿐, **실행 모델은 동일**

**대화용 정리 문장**

> “async/await는 Promise 위에 얹힌 문법 설탕이라,
> 실제 실행 순서는 이벤트 루프와 마이크로태스크 큐를 따릅니다.”

---

## 3. 싱글 스레드인데 왜 병렬처럼 보이는가

JavaScript는 실제로는 **한 스레드에서만 코드가 실행**된다.

병렬처럼 보이는 이유는:

* IO 작업이 OS/Web API로 위임되고
* 완료 알림만 이벤트 큐로 돌아오기 때문

### 실제 흐름

1. JS는 네트워크/파일 요청을 Web API에 맡김
2. JS 스레드는 즉시 다음 코드 실행
3. 작업 완료 시 콜백이 큐에 등록
4. 이벤트 루프가 적절한 시점에 실행

### Unity 개발자 관점에서의 대응

* 메인 스레드는 게임 로직 유지
* 네이티브/백그라운드 스레드에서 IO 처리
* 완료 결과만 메인으로 전달

즉,

> **동시에 실행되는 것이 아니라, 기다리지 않고 넘기는 것**이다.

**대화용 정리 문장**

> “JavaScript는 싱글 스레드지만, IO를 외부에 위임해서
> 메인 실행 흐름을 막지 않기 때문에 병렬처럼 보입니다.”

---

## 한 문단 요약 (소통용)

> “JavaScript의 핵심은 문법이 아니라 이벤트 루프입니다.
> 싱글 스레드 환경에서 마이크로태스크와 매크로태스크 큐를 통해
> 비동기 작업의 실행 순서를 제어하고, IO를 외부로 위임해서
> 병렬처럼 보이게 만드는 구조죠.”

---

## Unity 개발자가 JavaScript를 이해하면 좋은 이유

* 웹 기반 런처, 관리자 페이지, 툴과 자연스럽게 소통 가능
* 서버/프론트 개발자의 비동기 설계 의도 이해
* async/await, 이벤트 기반 사고방식을 Unity 코드에 반영 가능
* 플랫폼 개발자 관점 확장
