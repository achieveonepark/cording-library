---
title: TemplateMethod
---

# Template Method

## パターン一言説明
全体手順は固定し、細部のステップだけをサブクラスで変えるパターンです。

## Unity でよく使う状況
- スキル実行順序は同じで、効果だけが異なるとき
- 共通の前処理 / 後処理を強制したいとき

## 構成要素（役割）
- Template Method
- Primitive Operation
- Concrete Class

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
public abstract class SkillExecutionTemplate
{
    public void Execute()
    {
        if (!CanExecute())
        {
            return;
        }

        ConsumeCost();
        PlayCastAnimation();
        ApplyEffect();
    }

    protected virtual bool CanExecute() => true;
    protected virtual void ConsumeCost() { }
    protected virtual void PlayCastAnimation() { }
    protected abstract void ApplyEffect();
}

public sealed class HealSkillTemplate : SkillExecutionTemplate
{
    protected override void ApplyEffect()
    {
        // Heal target.
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

親がアルゴリズム順序を固定し、一部ステップだけを子が変更する流れです。

```d2 title="Template Method の流れ"
direction: down

template: "AbilityBase.Execute()"
step1: "Validate()"
step2: "ConsumeResource()"
step3: "DoAction() (override)"
step4: "AfterAction()"
result: "Ability Done"

template -> step1
step1 -> step2
step2 -> step3
step3 -> step4
step4 -> result
```
