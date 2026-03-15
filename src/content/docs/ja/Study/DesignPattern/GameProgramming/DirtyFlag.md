---
title: Dirty Flag
---

# Dirty Flag

## パターン一言説明
値が変わったときだけ高コストな計算をやり直すように印を付ける遅延更新パターンです。

## Unity でよく使う状況
- ステータス合算やレイアウト計算が重いとき
- 毎フレーム再計算する必要がないとき

## 構成要素（役割）
- Primary Data: 元データ
- Dirty Flag: 再計算が必要かどうか
- Cache: 計算結果

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
public sealed class PlayerAttackStat
{
    private int baseAttackPower;
    private int equipmentBonusPower;
    private bool needsRecalculation = true;
    private int cachedAttackPower;

    public void SetBaseAttackPower(int value)
    {
        baseAttackPower = value;
        needsRecalculation = true;
    }

    public void SetEquipmentBonusPower(int value)
    {
        equipmentBonusPower = value;
        needsRecalculation = true;
    }

    public int GetFinalAttackPower()
    {
        if (!needsRecalculation)
        {
            return cachedAttackPower;
        }

        cachedAttackPower = baseAttackPower + equipmentBonusPower;
        needsRecalculation = false;
        return cachedAttackPower;
    }
}
```

## 長所
- 値が変わったときだけ計算するため、フレームごとの不要な演算を減らせます。
- UI、ステータス、Transform のように変更頻度が低い計算に特に効果があります。

## 注意点
- フラグ更新を忘れると古い値を使い続けるバグが起きます。
- 依存関係が複雑になると、どの変更でフラグを立てるべきか管理が難しくなります。

## 動作ダイアグラム

値変更時だけ再計算してコストを減らす遅延更新の流れです。

```d2 title="Dirty Flag の流れ"
direction: right

change_event: "Stat Changed"
mark_dirty: "dirty = true"
render_request: "UI / Combat Query"
check_dirty: "dirty?"
recalc: "Recalculate Cached Value"
reuse: "Use Cached Value"
output: "Final Value"

change_event -> mark_dirty
mark_dirty -> render_request
render_request -> check_dirty
check_dirty -> recalc: "yes"
check_dirty -> reuse: "no"
recalc -> output
reuse -> output
recalc -> reuse: "dirty = false"
```
