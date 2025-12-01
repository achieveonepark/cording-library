---
title: State
---

객체의 내부 상태가 변경될 때 객체의 동작을 변경할 수 있도록 하는 패턴입니다. 객체는 마치 클래스를 변경하는 것처럼 보입니다.

## 구현부
상태 패턴은 주로 다음 요소들로 구성됩니다.

### Context (문맥)
- 상태에 따라 동작이 달라지는 객체입니다.
- 현재 상태 객체를 가지고 있으며, 상태 객체의 메서드를 호출하여 동작을 위임합니다.

### State (상태)
- Context의 특정 상태에 대한 동작을 정의하는 인터페이스 또는 추상 클래스입니다.

### ConcreteState (구체적인 상태)
- State 인터페이스를 구현하며, Context의 특정 상태에 대한 동작을 실제로 구현합니다.
- 다음 상태로의 전이를 처리할 수도 있습니다.

## 예시

```csharp
// State 인터페이스
public interface IPlayerState
{
    void HandleInput(Player player, Input input);
    void EnterState(Player player);
    void ExitState(Player player);
}

// ConcreteState: Idle 상태
public class IdleState : IPlayerState
{
    public void HandleInput(Player player, Input input)
    {
        if (input == Input.Jump)
        {
            player.ChangeState(new JumpState());
        }
        else if (input == Input.Attack)
        {
            player.ChangeState(new AttackState());
        }
    }

    public void EnterState(Player player)
    {
        Debug.Log("Entering Idle State");
        // Idle 애니메이션 재생 등
    }

    public void ExitState(Player player)
    {
        Debug.Log("Exiting Idle State");
    }
}

// ConcreteState: Jump 상태
public class JumpState : IPlayerState
{
    public void HandleInput(Player player, Input input)
    {
        // 점프 중에는 다른 입력 무시 또는 특정 입력만 처리
    }

    public void EnterState(Player player)
    {
Log("Entering Jump State");
        // 점프 애니메이션 재생, 물리적 점프 처리 등
    }

    public void ExitState(Player player)
    {
        Debug.Log("Exiting Jump State");
    }
}

// Context: Player
public class Player
{
    private IPlayerState _currentState;

    public Player()
    {
        _currentState = new IdleState(); // 초기 상태 설정
        _currentState.EnterState(this);
    }

    public void ChangeState(IPlayerState newState)
    {
        _currentState.ExitState(this);
        _currentState = newState;
        _currentState.EnterState(this);
    }

    public void Update(Input input)
    {
        _currentState.HandleInput(this, input);
    }
}

// 입력 예시
public enum Input
{
    Jump,
    Attack,
    Move
}
```