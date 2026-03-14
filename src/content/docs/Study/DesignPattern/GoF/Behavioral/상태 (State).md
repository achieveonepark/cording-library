---
title: State
---

# State

## 패턴 한 줄 설명
상태별 행동을 객체로 분리해 상태 전환에 따라 동작을 교체하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 플레이어 이동/전투 상태가 많아질 때
- if-else 상태 분기가 비대해질 때

## 구성 요소 (역할)
- Context
- State Interface
- Concrete State

## Unity 예시 (C#)
```csharp
public interface ICharacterState
{
    void Tick(PlayerStateMachine stateMachine);
}

public sealed class IdleState : ICharacterState
{
    public void Tick(PlayerStateMachine stateMachine)
    {
        if (stateMachine.MoveInput > 0f)
        {
            stateMachine.ChangeState(new RunState());
        }
    }
}

public sealed class RunState : ICharacterState
{
    public void Tick(PlayerStateMachine stateMachine)
    {
        if (stateMachine.MoveInput <= 0f)
        {
            stateMachine.ChangeState(new IdleState());
        }
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
- Strategy
- Template Method
- Command
