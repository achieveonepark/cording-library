---
title: Memory Model
sidebar:
  order: 13
---

## Stack / Heap / Static

### Stack
- 지역 변수
- 함수 수명과 동일
- GC 대상 아님
- 매우 빠름

### Heap
- class, array, closure
- 수명 불명확
- GC 대상
- 상대적으로 느림

### Static
- 앱 전체 수명
- Domain Reload 영향을 받음
- 캐시로 자주 사용됨

---

## Escape Analysis

객체가 메서드 밖으로 탈출(Escape)하는지 분석하는 개념이다.

- Escape 발생 → heap 필요
- Escape 없음 → 이론적으로 stack 가능

.NET에서는 제한적으로만 적용된다.

---

## Memory Locality / Cache Line

CPU는 연속된 메모리 접근을 선호한다.

- Cache Line ≈ 64 bytes
- struct 배열은 cache 친화적
- class 배열은 포인터 추적 비용 발생

ECS / Data-Oriented Design의 근거가 된다.
