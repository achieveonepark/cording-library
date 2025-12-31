---
title: Coroutine
sidebar:
  order: 22
---

#### Unity에서의 의미
- 프레임 기반 비동기
- Unity 엔진 수명 모델에 가장 밀접

#### Unity 개발자에게 중요한 포인트
- MonoBehaviour가 Destroy되면 자동 중단
- “수명 연동”이라는 점에서는 가장 안전

#### 예외 전파
- 예외는 대부분 로그로만 출력
- 호출자가 실패를 감지하기 어려움

#### 취소
- 구조적 취소 개념이 없음
- StopCoroutine / StopAllCoroutines는 거칠고 위험

#### Unity에서 흔한 사고
- 중첩 Coroutine으로 흐름 추적 불가
- 실패를 상태로 전달하지 못함