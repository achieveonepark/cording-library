---
title: CAS / Lock-free
sidebar:
  order: 32
---

## 개요
CAS는 CPU 명령어를 이용해 **락 없이 원자적 상태 변경**을 수행하는 방식이다.

> CAS: Compare-And-Swap

## Unity에서의 위치
- `Interlocked` API
- Unity 엔진 내부
- Job System / ECS / Burst 기반

## Unity 개발자가 직접 쓸 일은?
- 거의 없음

## 그래도 알아야 하는 이유
- 고성능 동시성 구조의 원리 이해
- 왜 “락 없이도 안전한지” 설명 가능
- 엔진 내부 구조 이해에 도움

## 위험 포인트
- 코드 가독성 매우 낮음
- 논리 버그 재현 어려움

## 설계 관점 권장
- 직접 구현 ❌
- 내부 라이브러리 신뢰 ✅

## 한 줄 요약
> Lock-free는 **알아두되, 직접 쓰지 않아도 된다**.

### 예시

기본적인 Interlocked 사용
```csharp
int _counter;

void Increment()
{
    Interlocked.Increment(ref _counter);
}
```

<br/>

비교-교체(CAS) 예시
```csharp
void TrySet(ref int target, int newValue)
{
    int original;
    do
    {
        original = target;
        if (original >= newValue)
            return;
    }
    while (Interlocked.CompareExchange(
        ref target,
        newValue,
        original
    ) != original);
}
```

- 포인트
  - 빠르지만 가독성 낮음
  - Unity 일반 로직에는 과도


### Unity에서 Interlocked를 언제 쓰나?

- 카운터(통계/진행도)
- 플래그/상태 전이(중복 실행 방지)
- "한 번만 실행” 가드

### 반대로 이건 Interlocked로 풀기 어렵거나 비추:
- 여러 필드를 같이 일관성 있게 갱신해야 하는 상태(트랜잭션 성격)
- 컬렉션 동시 수정 (그건 Concurrent 컬렉션/큐로)
