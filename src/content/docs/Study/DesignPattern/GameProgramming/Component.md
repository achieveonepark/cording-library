---
title: Component
---

컴포넌트 패턴은 거대한 상속 계층 구조를 만드는 대신, 객체를 독립적인 부품(컴포넌트)들의 조합으로 정의하는 디자인 패턴입니다. 이 구조에서 게임 객체(GameObject)는 컴포넌트들을 담는 컨테이너 역할을 하며, 실제 동작은 각 컴포넌트가 수행합니다.

이는 "상속보다 조합(Composition over Inheritance)" 원칙의 대표적인 예시입니다.

### 왜 사용하는가?

- **유연성 및 재사용성:** 상속은 부모-자식 간의 강한 결합을 만들어 구조를 경직되게 합니다. 반면 컴포넌트 패턴을 사용하면, 필요한 기능을 부품처럼 갈아 끼울 수 있습니다. 예를 들어, '플레이어' 객체와 '움직이는 함정' 객체는 둘 다 'Transform(위치)' 컴포넌트를 가질 수 있지만, '플레이어'만 'PlayerInput(입력)' 컴포넌트를 가질 수 있습니다.
- **코드 중복 감소:** 여러 객체에서 공통적으로 사용되는 기능(예: 체력, 물리 효과)을 하나의 컴포넌트로 만들어두면 어디서든 재사용할 수 있습니다.
- **낮은 결합도:** 각 컴포넌트는 다른 컴포넌트에 대해 거의 알지 못하며, 독립적으로 개발하고 테스트할 수 있습니다.

### 간단한 구현 예제

C#으로 컴포넌트 패턴의 기본 구조를 구현한 예제입니다.

```csharp
// 모든 컴포넌트가 구현해야 할 공통 인터페이스
public interface IComponent
{
    void Update();
}

// 게임 객체 클래스. 컴포넌트들을 담는 컨테이너 역할을 한다.
public class GameObject
{
    private List<IComponent> components = new List<IComponent>();

    public T GetComponent<T>() where T : class, IComponent
    {
        foreach (var component in components)
        {
            if (component is T)
            {
                return component as T;
            }
        }
        return null;
    }

    public void AddComponent(IComponent component)
    {
        components.Add(component);
    }

    public void Update()
    {
        // 자신이 가진 모든 컴포넌트의 Update를 호출
        foreach (var component in components)
        {
            component.Update();
        }
    }
}

// 구체적인 컴포넌트 구현 예시
public class TransformComponent : IComponent
{
    public float X { get; set; }
    public float Y { get; set; }

    public void Update()
    {
        // 위치와 관련된 로직 처리 (예: 이동)
    }
}

public class HealthComponent : IComponent
{
    public int Health { get; set; } = 100;

    public void Update()
    {
        // 체력과 관련된 로직 처리 (예: 체력 자연 회복)
    }
}

// 사용 예시
public class Game
{
    public void Start()
    {
        // 플레이어 객체 생성
        GameObject player = new GameObject();
        player.AddComponent(new TransformComponent());
        player.AddComponent(new HealthComponent());

        // 몬스터 객체 생성
        GameObject monster = new GameObject();
        monster.AddComponent(new TransformComponent());
        
        // 게임 루프에서 객체들 업데이트
        player.Update();
        monster.Update();
    }
}
```
