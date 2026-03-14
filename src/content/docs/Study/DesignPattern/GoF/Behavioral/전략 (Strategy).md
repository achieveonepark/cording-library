---
title: Strategy
---

# Strategy

## 패턴 한 줄 설명
동일 목적의 알고리즘을 인터페이스로 캡슐화해 런타임에 바꿔 끼우는 패턴입니다.

## Unity에서 쓰는 대표 상황
- AI 공격 방식을 상황별 교체할 때
- 조준/이동 정책을 캐릭터별로 바꿀 때

## 구성 요소 (역할)
- Strategy Interface
- Concrete Strategy
- Context

## Unity 예시 (C#)
```csharp
using UnityEngine;

public interface IAimStrategy
{
    Vector3 GetAimPosition(Transform shooterTransform, Transform targetTransform);
}

public sealed class DirectAimStrategy : IAimStrategy
{
    public Vector3 GetAimPosition(Transform shooterTransform, Transform targetTransform)
    {
        return targetTransform.position;
    }
}

public sealed class LeadAimStrategy : IAimStrategy
{
    public Vector3 GetAimPosition(Transform shooterTransform, Transform targetTransform)
    {
        return targetTransform.position + targetTransform.forward * 0.5f;
    }
}
```

## 장점
- 행동 로직을 분리해 변경 영향도를 줄일 수 있습니다.
- 규칙 추가/교체가 비교적 안전합니다.

## 주의할 점
- 객체 수와 간접 호출이 늘어 흐름 파악이 어려워질 수 있습니다.
- 전환/실행 순서 버그를 테스트로 고정해야 합니다.

## 같이 보면 좋은 패턴
- State
- Template Method
- Factory Method
