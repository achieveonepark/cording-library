---
title: Type Object
---

# Type Object

## パターン一言説明
オブジェクトのタイプをクラスではなくデータとしてモデル化し、データ追加で拡張を行うパターンです。

## Unity でよく使う状況
- 武器やモンスタータイプをコード修正なしで増やしたいとき
- バランス値を企画データとして管理したいとき

## 構成要素（役割）
- Type Data: ScriptableObject / テーブル
- Runtime Instance: タイプ参照オブジェクト
- Registry: タイプ検索

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using UnityEngine;

[CreateAssetMenu(menuName = "Game/Weapon Type Data")]
public sealed class WeaponTypeData : ScriptableObject
{
    public string weaponId;
    public int attackPower;
    public float cooldownSeconds;
}

public sealed class WeaponRuntime
{
    private readonly WeaponTypeData weaponTypeData;

    public WeaponRuntime(WeaponTypeData weaponTypeData)
    {
        this.weaponTypeData = weaponTypeData;
    }

    public int AttackPower => weaponTypeData.attackPower;
}
```

## 長所
- ScriptableObject などのデータ追加だけで新しいタイプを増やせます。
- 企画やバランス調整をコード配布から切り離せるため、反復速度が上がります。

## 注意点
- データスキーマが頻繁に変わると、マイグレーションや互換性管理コストが大きくなります。
- ランタイム参照漏れは、エディタでは静かでも実ビルドで壊れることがあります。

## 動作ダイアグラム

インスタンスがタイプデータ（ScriptableObject）を参照して振る舞いを決める流れです。

```d2 title="Type Object の流れ"
direction: right

instance: "Weapon Instance"
type_data: "WeaponTypeData (SO)"
calculator: "Damage Calculator"
context: "Runtime Context"
result: "Final Damage"

instance -> type_data: "typeId"
instance -> context: "durability / level"
type_data -> calculator: "base stats"
context -> calculator: "runtime modifiers"
calculator -> result
result -> instance: "apply"
```
