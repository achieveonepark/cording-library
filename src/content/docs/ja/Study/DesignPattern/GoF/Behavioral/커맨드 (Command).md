---
title: Command
---

# Command

## パターン一言説明
要求をオブジェクトとして表現し、実行、取り消し、キューイングを柔軟に扱うパターンです。

## Unity でよく使う状況
- 入力リプレイやマクロを実装したいとき
- Undo / Redo が必要なとき

## 構成要素（役割）
- Command
- Invoker
- Receiver

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

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

## 長所
- 振る舞いを分離できるため、変更の影響範囲を小さくできます。
- ルールの追加や差し替えを比較的安全に行えます。

## 注意点
- オブジェクト数や間接呼び出しが増えると、流れを追いにくくなります。
- 実行順序のバグはテストで固定しておく必要があります。

## 動作ダイアグラム

要求をオブジェクトとしてカプセル化し、実行、キューイング、undo を分離する流れです。

```d2 title="Command の流れ"
direction: right

input: "Player Input"
factory: "Command Factory"
invoker: "Invoker"
command: "Concrete Command"
receiver: "Receiver"
undo_stack: "Undo Stack"

input -> factory
factory -> command
command -> invoker: "submit"
invoker -> receiver: "execute"
invoker -> undo_stack: "push"
undo_stack -> receiver: "undo"
```
