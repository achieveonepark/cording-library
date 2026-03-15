---
title: Strategy
---

# Strategy

## パターン一言説明
同じ目的を持つアルゴリズムをインターフェースでカプセル化し、ランタイムで差し替えるパターンです。

## Unity でよく使う状況
- AI 攻撃方式を状況別に切り替えたいとき
- 照準や移動方針をキャラクターごとに変えたいとき

## 構成要素（役割）
- Strategy Interface
- Concrete Strategy
- Context

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using UnityEngine;

public interface IAimStrategy
{
    Vector3 GetAimPosition(Transform shooterTransform, Transform targetTransform);
}

public sealed class DirectAimStrategy : IAimStrategy
{
    public Vector3 GetAimPosition(Transform shooterTransform, Transform targetTransform)
    {
        return targetTransform.position;
    }
}

public sealed class LeadAimStrategy : IAimStrategy
{
    public Vector3 GetAimPosition(Transform shooterTransform, Transform targetTransform)
    {
        return targetTransform.position + targetTransform.forward * 0.5f;
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

コンテキストが Strategy インターフェースを通してアルゴリズムを切り替える流れです。

```d2 title="Strategy の流れ"
direction: right

context: "PathContext"
selector: "Select Strategy"
a_star: "AStarStrategy"
flow_field: "FlowFieldStrategy"
execute: "FindPath()"
result: "Path Result"

context -> selector
selector -> a_star: "small map"
selector -> flow_field: "large crowd"
a_star -> execute
flow_field -> execute
execute -> result
result -> context
```
