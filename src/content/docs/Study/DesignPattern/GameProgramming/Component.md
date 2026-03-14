---
title: Component
---

# Component

## 패턴 한 줄 설명
상속 대신 기능을 작은 단위로 쪼개 조합해 엔티티를 구성하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 캐릭터 기능을 유연하게 조합해야 할 때
- 런타임에 기능을 켜고 끄는 설계가 필요할 때

## 구성 요소 (역할)
- Entity: 컴포넌트 컨테이너
- Component: 독립 기능 단위
- Composer: 초기 조합 설정

## Unity 예시 (C#)
```csharp
using System.Collections.Generic;
using UnityEngine;

public interface IGameComponent
{
    void Tick(float deltaTime);
}

public sealed class MovementComponent : IGameComponent
{
    private readonly Transform targetTransform;
    private readonly float moveSpeed;

    public MovementComponent(Transform targetTransform, float moveSpeed)
    {
        this.targetTransform = targetTransform;
        this.moveSpeed = moveSpeed;
    }

    public void Tick(float deltaTime)
    {
        targetTransform.position += Vector3.forward * moveSpeed * deltaTime;
    }
}

public sealed class CharacterControllerRoot : MonoBehaviour
{
    private readonly List<IGameComponent> components = new();

    private void Awake()
    {
        components.Add(new MovementComponent(transform, 5f));
    }
}
```

## 장점
- Unity 런타임 성능/구조 개선에 바로 연결됩니다.
- 기능 분리로 테스트와 유지보수가 쉬워집니다.

## 주의할 점
- 패턴 남용 시 추상화 비용이 실익보다 커질 수 있습니다.
- 성능/가독성 트레이드오프를 측정으로 확인해야 합니다.

## 같이 보면 좋은 패턴
- Strategy
- Decorator
- Type Object
