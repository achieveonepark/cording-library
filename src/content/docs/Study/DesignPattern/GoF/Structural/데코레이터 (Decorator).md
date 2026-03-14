---
title: Decorator
---

# Decorator

## 패턴 한 줄 설명
객체를 감싸는 래퍼를 통해 런타임에 기능을 동적으로 덧붙이는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 무기에 속성 부여를 조합식으로 적용할 때
- 기존 코드를 건드리지 않고 기능 확장할 때

## 구성 요소 (역할)
- Component
- Decorator Base
- Concrete Decorator

## Unity 예시 (C#)
```csharp
public interface IWeaponDamageCalculator
{
    int CalculateDamage();
}

public sealed class BaseWeaponDamageCalculator : IWeaponDamageCalculator
{
    public int CalculateDamage() => 10;
}

public abstract class WeaponDamageDecorator : IWeaponDamageCalculator
{
    protected readonly IWeaponDamageCalculator innerCalculator;

    protected WeaponDamageDecorator(IWeaponDamageCalculator innerCalculator)
    {
        this.innerCalculator = innerCalculator;
    }

    public abstract int CalculateDamage();
}

public sealed class FireDamageDecorator : WeaponDamageDecorator
{
    public FireDamageDecorator(IWeaponDamageCalculator innerCalculator) : base(innerCalculator) { }

    public override int CalculateDamage() => innerCalculator.CalculateDamage() + 5;
}
```

## 장점
- 모듈 경계를 명확히 해 결합도를 낮출 수 있습니다.
- 기존 코드 수정 없이 기능 확장/통합이 쉬워집니다.

## 주의할 점
- 래퍼/어댑터 계층이 깊어지면 디버깅이 어려워집니다.
- 책임 경계가 흐려지지 않도록 인터페이스를 작게 유지해야 합니다.

## 같이 보면 좋은 패턴
- Component
- Strategy
- Chain of Responsibility
