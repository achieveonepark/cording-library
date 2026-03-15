---
title: Component
---

# Component

## パターン一言説明
継承の代わりに機能を小さな単位へ分割し、その組み合わせでエンティティを構成するパターンです。

## Unity でよく使う状況
- キャラクター機能を柔軟に組み合わせたいとき
- ランタイムで機能の ON/OFF を切り替える設計が必要なとき

## 構成要素（役割）
- Entity: コンポーネントコンテナ
- Component: 独立した機能単位
- Composer: 初期組み合わせ設定

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using System.Collections.Generic;
using UnityEngine;

public interface IGameComponent
{
    void Tick(float deltaTime);
}

public sealed class MovementComponent : IGameComponent
{
    private readonly Transform targetTransform;
    private readonly float moveSpeed;

    public MovementComponent(Transform targetTransform, float moveSpeed)
    {
        this.targetTransform = targetTransform;
        this.moveSpeed = moveSpeed;
    }

    public void Tick(float deltaTime)
    {
        targetTransform.position += Vector3.forward * moveSpeed * deltaTime;
    }
}

public sealed class CharacterControllerRoot : MonoBehaviour
{
    private readonly List<IGameComponent> components = new();

    private void Awake()
    {
        components.Add(new MovementComponent(transform, 5f));
    }
}
```

## 長所
- 機能をモジュールとして分けることで、キャラクターやオブジェクトのバリエーションを素早く作れます。
- 特定コンポーネントだけをテスト・差し替えしやすく、回帰範囲を小さくできます。

## 注意点
- コンポーネント間の依存が大きくなると、別の形の結合が生まれます。
- Update ループが各コンポーネントに分散すると、呼び出しコストとデバッグ難度が上がります。

## 動作ダイアグラム

エンティティが複数のコンポーネントを組み合わせて最終状態を作る流れです。

```d2 title="Component の流れ"
direction: right

game_loop: "Game Loop"
entity: "Player Entity"

components: {
  label: "Components"
  movement: "Movement"
  health: "Health"
  inventory: "Inventory"
}

result: "Transform / State Applied"

game_loop -> entity: "Tick()"
entity -> movement: "update"
entity -> health: "update"
entity -> inventory: "update"
movement -> result
health -> result
inventory -> result
```
