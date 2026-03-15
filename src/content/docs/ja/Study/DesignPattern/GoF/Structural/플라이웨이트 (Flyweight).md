---
title: Flyweight
---

# Flyweight

## パターン一言説明
共有可能な不変状態を再利用し、大量オブジェクトのメモリ使用量を減らすパターンです。

## Unity でよく使う状況
- 同じ見た目のリソースを多くのインスタンスが共有するとき
- タイル、アイコン、投射体データに重複が多いとき

## 構成要素（役割）
- Flyweight
- Factory (Cache)
- Intrinsic / Extrinsic State

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using System.Collections.Generic;
using UnityEngine;

public sealed class ProjectileVisualFlyweight
{
    public readonly Sprite Sprite;

    public ProjectileVisualFlyweight(Sprite sprite)
    {
        Sprite = sprite;
    }
}

public sealed class ProjectileVisualFlyweightFactory
{
    private readonly Dictionary<string, ProjectileVisualFlyweight> cachedVisuals = new();

    public ProjectileVisualFlyweight Get(string visualKey, Sprite sprite)
    {
        if (!cachedVisuals.TryGetValue(visualKey, out ProjectileVisualFlyweight flyweight))
        {
            flyweight = new ProjectileVisualFlyweight(sprite);
            cachedVisuals.Add(visualKey, flyweight);
        }

        return flyweight;
    }
}
```

## 長所
- モジュール境界が明確になり、結合度を下げられます。
- 既存コードを変更せずに機能拡張や統合がしやすくなります。

## 注意点
- ラッパー層が深くなりすぎるとデバッグが難しくなります。
- 責務境界が曖昧にならないよう、インターフェースは小さく保つべきです。

## 動作ダイアグラム

共有可能な内部状態を再利用し、外部状態だけをコンテキストから注入する流れです。

```d2 title="Flyweight の流れ"
direction: right

spawn: "Spawn Bullet"
factory: "Flyweight Factory"
shared: "Shared BulletType"
context: "Bullet Context (pos/speed)"
render: "Draw / Simulate"

spawn -> factory: "get(typeId)"
factory -> shared: "reuse"
spawn -> context: "extrinsic state"
shared -> render: "intrinsic"
context -> render: "extrinsic"
```
