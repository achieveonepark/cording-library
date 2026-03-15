---
title: State
---

# State

## パターン一言説明
状態ごとの振る舞いをオブジェクトへ分離し、状態遷移に応じて動作を切り替えるパターンです。

## Unity でよく使う状況
- プレイヤー移動や戦闘状態が増えていくとき
- `if-else` による状態分岐が肥大化するとき

## 構成要素（役割）
- Context
- State Interface
- Concrete State

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

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

## 長所
- 振る舞いを分離できるため、変更の影響範囲を小さくできます。
- ルールの追加や差し替えを比較的安全に行えます。

## 注意点
- オブジェクト数や間接呼び出しが増えると、流れを追いにくくなります。
- 実行順序のバグはテストで固定しておく必要があります。

## 動作ダイアグラム

コンテキストが現在状態オブジェクトへ処理を委譲し、状態遷移を行う流れです。

```d2 title="State の流れ"
direction: right

context: "PlayerContext"
idle: "IdleState"
run: "RunState"
jump: "JumpState"
input: "Input"
output: "Animation / Logic"

input -> context
context -> idle: "delegate"
idle -> run: "move key"
run -> jump: "jump key"
jump -> idle: "landing"
idle -> output
run -> output
jump -> output
```
