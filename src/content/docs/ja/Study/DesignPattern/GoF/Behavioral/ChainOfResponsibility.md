---
title: ChainOfResponsibility
---

# Chain of Responsibility

## パターン一言説明
要求を複数のハンドラチェーンへ通し、各ハンドラが順番に責務を処理するパターンです。

## Unity でよく使う状況
- ダメージ計算でシールド、バフ、耐性を順番に適用したいとき
- 入力フィルタを段階的に処理したいとき

## 構成要素（役割）
- Handler
- Concrete Handler
- Next Handler

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
public abstract class DamageModifierHandler
{
    private DamageModifierHandler nextHandler;

    public DamageModifierHandler SetNext(DamageModifierHandler nextHandler)
    {
        this.nextHandler = nextHandler;
        return nextHandler;
    }

    public int Handle(int incomingDamage)
    {
        int updatedDamage = ModifyDamage(incomingDamage);
        return nextHandler == null ? updatedDamage : nextHandler.Handle(updatedDamage);
    }

    protected abstract int ModifyDamage(int incomingDamage);
}

public sealed class ShieldDamageHandler : DamageModifierHandler
{
    protected override int ModifyDamage(int incomingDamage)
    {
        return System.Math.Max(0, incomingDamage - 20);
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

要求をチェーンに流し、処理可能なハンドラが責務を引き受ける流れです。

```d2 title="Chain Of Responsibility の流れ"
direction: right

request: "Cast Skill Request"
auth: "AuthHandler"
cooldown: "CooldownHandler"
cost: "CostHandler"
execute: "ExecuteHandler"
reject: "Rejected"
complete: "Executed"

request -> auth
auth -> reject: "fail"
auth -> cooldown: "pass"
cooldown -> reject: "fail"
cooldown -> cost: "pass"
cost -> reject: "fail"
cost -> execute: "pass"
execute -> complete
```
