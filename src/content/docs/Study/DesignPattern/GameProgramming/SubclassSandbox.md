---
title: Subclass Sandbox
---

# Subclass Sandbox

## 패턴 한 줄 설명
부모가 안전한 확장 API를 제공하고 자식은 그 범위 내에서만 구현하도록 제한하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 스킬/AI를 확장하되 코어 규칙을 보호해야 할 때
- 디자이너 확장 포인트를 통제할 때

## 구성 요소 (역할)
- Base Class: 안전 API 제공
- Hook: 자식 구현 지점
- Subclass: 확장 구현

## Unity 예시 (C#)
```csharp
public abstract class SkillBase
{
    public void ExecuteSkill()
    {
        if (!CanExecute())
        {
            return;
        }

        ConsumeResource();
        PlayCastAnimation();
        ApplyEffect();
    }

    protected virtual bool CanExecute() => true;
    protected virtual void ConsumeResource() { }
    protected virtual void PlayCastAnimation() { }
    protected abstract void ApplyEffect();
}

public sealed class FireballSkill : SkillBase
{
    protected override void ApplyEffect()
    {
        // Spawn fireball projectile.
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
- Template Method
- State
- Command
