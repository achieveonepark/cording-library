---
title: Command
---

# Command

## 패턴 한 줄 설명
요청을 객체로 만들고 실행/취소/큐잉을 유연하게 처리하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 입력 리플레이/매크로를 구현할 때
- Undo/Redo가 필요할 때

## 구성 요소 (역할)
- Command
- Invoker
- Receiver

## Unity 예시 (C#)
```csharp
using System.Collections.Generic;

public interface ICommand
{
    void Execute();
    void Undo();
}

public sealed class MoveUnitCommand : ICommand
{
    private readonly Unit controlledUnit;
    private readonly int deltaX;

    public MoveUnitCommand(Unit controlledUnit, int deltaX)
    {
        this.controlledUnit = controlledUnit;
        this.deltaX = deltaX;
    }

    public void Execute() => controlledUnit.X += deltaX;
    public void Undo() => controlledUnit.X -= deltaX;
}

public sealed class CommandHistory
{
    private readonly Stack<ICommand> executedCommands = new();

    public void ExecuteCommand(ICommand command)
    {
        command.Execute();
        executedCommands.Push(command);
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
- Memento
- Event Queue
- Chain of Responsibility
