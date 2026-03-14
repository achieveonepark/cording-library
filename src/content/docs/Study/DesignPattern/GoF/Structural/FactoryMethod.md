---
title: FactoryMethod
---

# Factory Method

## 패턴 한 줄 설명
생성 메서드의 실제 생성 책임을 하위 클래스가 결정하도록 위임하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 무기별 투사체 생성 규칙이 다를 때
- 타입별 초기화 로직을 분리할 때

## 구성 요소 (역할)
- Creator
- Concrete Creator
- Product

## Unity 예시 (C#)
```csharp
using UnityEngine;

public interface IProjectile
{
    void Fire(Vector3 startPosition, Vector3 direction);
}

public abstract class ProjectileSpawner : MonoBehaviour
{
    public void Shoot(Vector3 startPosition, Vector3 direction)
    {
        IProjectile projectile = CreateProjectile();
        projectile.Fire(startPosition, direction);
    }

    protected abstract IProjectile CreateProjectile();
}
```

## 장점
- 모듈 경계를 명확히 해 결합도를 낮출 수 있습니다.
- 기존 코드 수정 없이 기능 확장/통합이 쉬워집니다.

## 주의할 점
- 래퍼/어댑터 계층이 깊어지면 디버깅이 어려워집니다.
- 책임 경계가 흐려지지 않도록 인터페이스를 작게 유지해야 합니다.

## 같이 보면 좋은 패턴
- Abstract Factory
- Builder
- Strategy
