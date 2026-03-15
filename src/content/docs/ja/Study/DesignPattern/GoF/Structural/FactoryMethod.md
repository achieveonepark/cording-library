---
title: FactoryMethod
---

# Factory Method

## パターン一言説明
生成メソッドの実際の生成責務をサブクラスへ委譲するパターンです。

## Unity でよく使う状況
- 武器ごとに投射体生成ルールが異なるとき
- 型ごとの初期化ロジックを分離したいとき

## 構成要素（役割）
- Creator
- Concrete Creator
- Product

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using UnityEngine;

public interface IProjectile
{
    void Fire(Vector3 startPosition, Vector3 direction);
}

public abstract class ProjectileSpawner : MonoBehaviour
{
    public void Shoot(Vector3 startPosition, Vector3 direction)
    {
        IProjectile projectile = CreateProjectile();
        projectile.Fire(startPosition, direction);
    }

    protected abstract IProjectile CreateProjectile();
}
```

## 長所
- モジュール境界が明確になり、結合度を下げられます。
- 既存コードを変更せずに機能拡張や統合がしやすくなります。

## 注意点
- ラッパー層が深くなりすぎるとデバッグが難しくなります。
- 責務境界が曖昧にならないよう、インターフェースは小さく保つべきです。

## 動作ダイアグラム

親は生成手順を維持しつつ、実際の生成型は子クラスが決める流れです。

```d2 title="Factory Method の流れ"
direction: right

client: "Client"
creator: "Creator.Spawn()"
factory_method: "CreateProduct()"
concrete_a: "BulletSpawner"
concrete_b: "EffectSpawner"
product: "IProduct"

client -> creator
creator -> factory_method
factory_method -> concrete_a: "mode A"
factory_method -> concrete_b: "mode B"
concrete_a -> product
concrete_b -> product
product -> client
```
