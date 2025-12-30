---
title: Execution Model
sidebar:
  order: 12
---

## Call Stack / Stack Frame

### 개념
Call Stack은 함수 호출 흐름을 저장하는 메모리 구조다.  
함수가 호출될 때마다 Stack Frame이 하나씩 생성된다.

각 Stack Frame에는 다음 정보가 포함된다.
- Return Address
- 매개변수
- 지역 변수
- 저장된 레지스터 상태

Call Stack은 LIFO(Last-In-First-Out) 구조다.

### 왜 중요한가?

#### 성능
- Stack 메모리는 연속적이다
- 할당/해제가 매우 빠르다
- GC 대상이 아니다

#### 안정성
- 재귀 호출이 깊어지면 Stack Overflow가 발생한다

#### 값 타입 vs 참조 타입
- 값 타입(local variable)은 기본적으로 stack
- 참조 타입(class)은 heap

GC 이야기를 하기 전에 항상 이 질문이 먼저다.  
“이 데이터는 stack에서 끝나는가, heap으로 가는가?”

---

## Inlining

Inlining은 함수 호출을 제거하고 함수 본문을 호출 지점에 직접 삽입하는 최적화다.

- 함수 호출 비용 제거
- 추가적인 컴파일러 최적화 가능

---

## Devirtualization

interface / virtual 호출을 실제 타입이 확정되었을 때 직접 호출로 변환한다.

- JIT / AOT가 타입을 확정할 수 있어야 가능
- 항상 제거되는 것은 아니다

JIT는 런타임 정보 기반으로,  
AOT는 빌드 시점 정보 기반으로 판단한다.
