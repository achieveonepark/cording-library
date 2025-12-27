---
title: Subclass Sandbox
---

서브클래스 샌드박스는 부모 클래스가 자식 클래스에게 '모래 상자(Sandbox)'처럼 제한되고 안전한 환경을 제공하는 디자인 패턴입니다. 자식 클래스는 부모가 미리 정의해둔 보호된(protected) 메서드들만을 사용하여 자신의 고유한 동작을 구현합니다.

이를 통해 자식 클래스가 게임의 민감한 부분에 직접 접근하여 문제를 일으키는 것을 방지하고, 코드의 안정성과 예측 가능성을 높입니다.

### 왜 사용하는가?

- **안정성:** 스크립터나 주니어 개발자가 게임의 핵심 시스템(파일 IO, 렌더링 엔진, 네트워크 등)에 직접 접근하여 예기치 못한 버그를 만드는 것을 원천적으로 차단합니다.
- **단순화:** 자식 클래스를 만드는 사람은 복잡한 엔진의 내부 구조를 알 필요 없이, `Move()`, `PlaySound()`처럼 의도가 명확한 몇 가지 기능들만 조합하여 원하는 로직을 쉽게 구현할 수 있습니다.
- **유지보수:** 부모 클래스가 제공하는 샌드박스 메서드들의 내부 구현(예: 오디오 시스템 교체)이 변경되어도, 자식 클래스들의 코드는 전혀 수정할 필요가 없습니다.

### 간단한 구현 예제

다양한 적(Enemy)들의 행동 패턴을 샌드박스 패턴으로 구현하는 예제입니다. `Enemy`라는 부모 클래스가 샌드박스 환경을 제공하고, `Grunt`, `Wizard` 같은 자식 클래스들은 이 환경 안에서 행동을 정의합니다.

```csharp
// 부모 클래스: 샌드박스 환경 제공
public abstract class Enemy
{
    // 자식 클래스가 오버라이드하여 고유한 행동을 정의할 부분
    public abstract void Activate();

    // --- 샌드박스 메서드들 ---
    // 자식들은 이 메서드들을 호출하여 행동을 수행한다.
    protected void PlaySound(SoundId sound)
    {
        // 내부적으로 서비스 로케이터 등을 통해 오디오 시스템에 접근
        ServiceLocator.GetAudio().PlaySound(sound);
    }

    protected void SpawnParticles(ParticleType type)
    {
        // 파티클 시스템에 접근
        ServiceLocator.GetParticles().Spawn(type);
    }

    protected void Move(float x, float y)
    {
        // 물리 엔진에 접근
        Console.WriteLine($"Moving to ({x}, {y})");
    }
}

// 자식 클래스 1: Grunt
public class Grunt : Enemy
{
    public override void Activate()
    {
        // 샌드박스가 제공하는 기능들만으로 행동 정의
        PlaySound(SoundIds.GRUNT_APPEAR);
        Move(10, 0); 
    }
}

// 자식 클래스 2: Wizard
public class Wizard : Enemy
{
    public override void Activate()
    {
        // 샌드박스가 제공하는 기능들만으로 행동 정의
        PlaySound(SoundIds.WIZARD_APPEAR);
        SpawnParticles(ParticleType.MAGIC);
    }
}

// 게임 로직
public class Game
{
    public void SpawnEnemies()
    {
        List<Enemy> enemies = new List<Enemy> { new Grunt(), new Wizard() };

        // 적의 종류와 상관없이 Activate()만 호출하면 각자 알아서 행동
        foreach (var enemy in enemies)
        {
            enemy.Activate();
        }
    }
}
```

이 구조에서 `Grunt`나 `Wizard` 클래스는 `ServiceLocator`나 `Console`에 직접 접근할 수 없으며, 오직 부모인 `Enemy`가 물려준 `PlaySound`, `SpawnParticles`, `Move` 같은 '안전한' 장난감들만 가지고 놀 수 있습니다.
