---
title: Decorator
---

# Decorator

## パターン一言説明
オブジェクトを包むラッパーによって、ランタイムで機能を動的に追加するパターンです。

## Unity でよく使う状況
- 武器への属性付与を組み合わせで適用したいとき
- 既存コードを触らずに機能拡張したいとき

## 構成要素（役割）
- Component
- Decorator Base
- Concrete Decorator

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
public interface IWeaponDamageCalculator
{
    int CalculateDamage();
}

public sealed class BaseWeaponDamageCalculator : IWeaponDamageCalculator
{
    public int CalculateDamage() => 10;
}

public abstract class WeaponDamageDecorator : IWeaponDamageCalculator
{
    protected readonly IWeaponDamageCalculator innerCalculator;

    protected WeaponDamageDecorator(IWeaponDamageCalculator innerCalculator)
    {
        this.innerCalculator = innerCalculator;
    }

    public abstract int CalculateDamage();
}

public sealed class FireDamageDecorator : WeaponDamageDecorator
{
    public FireDamageDecorator(IWeaponDamageCalculator innerCalculator) : base(innerCalculator) { }

    public override int CalculateDamage() => innerCalculator.CalculateDamage() + 5;
}
```

## 長所
- モジュール境界が明確になり、結合度を下げられます。
- 既存コードを変更せずに機能拡張や統合がしやすくなります。

## 注意点
- ラッパー層が深くなりすぎるとデバッグが難しくなります。
- 責務境界が曖昧にならないよう、インターフェースは小さく保つべきです。

## 動作ダイアグラム

ラッパーを通して責務を動的に追加していくチェーンの流れです。

```d2 title="Decorator の流れ"
direction: right

client: "Client"
base: "Base Damage"
critical: "CriticalDecorator"
elemental: "ElementDecorator"
result: "Final Damage"

client -> elemental: "calculate"
elemental -> critical: "delegate"
critical -> base: "delegate"
base -> critical: "base value"
critical -> elemental: "+ crit"
elemental -> result: "+ element"
```
