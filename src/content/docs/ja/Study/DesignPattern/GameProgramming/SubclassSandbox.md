---
title: Subclass Sandbox
---

# Subclass Sandbox

## パターン一言説明
親が安全な拡張 API を提供し、子はその範囲内だけで実装するよう制限するパターンです。

## Unity でよく使う状況
- スキルや AI を拡張しつつコア規則を守りたいとき
- デザイナー向け拡張ポイントを制御したいとき

## 構成要素（役割）
- Base Class: 安全な API 提供
- Hook: 子クラス実装ポイント
- Subclass: 拡張実装

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

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

## 長所
- 親が許可した API だけを公開するため、拡張コードを安全に制限できます。
- クールダウンやリソース消費などの共通ルールをベース側で強制しやすいです。

## 注意点
- ベースクラスが肥大化すると、かえって拡張の柔軟性が下がります。
- フックメソッドの契約が曖昧だと、サブクラス間で動作の一貫性が崩れます。

## 動作ダイアグラム

親テンプレートが共通ルールを強制し、子はフックだけを実装する流れです。

```d2 title="Subclass Sandbox の流れ"
direction: right

caller: "SkillRunner"
base: "SkillBase.Cast()"
validate: "Mana / Cooldown Check"
hook: "DoCast() Hook"
child: "FireballSkill.DoCast"
common: "Apply Global Rule"
result: "Skill Executed"

caller -> base
base -> validate
validate -> hook: "pass"
hook -> child
child -> common
common -> result
validate -> result: "fail -> cancel"
```
