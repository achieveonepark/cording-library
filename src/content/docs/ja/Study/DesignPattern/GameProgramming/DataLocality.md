---
title: Data Locality
---

# Data Locality

## パターン一言説明
頻繁にアクセスするデータを連続メモリに配置し、キャッシュ効率を高める性能重視パターンです。

## Unity でよく使う状況
- 弾やパーティクルのような大量オブジェクトを毎フレーム更新するとき
- CPU ボトルネックを減らしたいとき

## 構成要素（役割）
- Hot Data: 頻繁にアクセスする値
- Contiguous Storage: 連続配列
- Loop: 単純な反復処理

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using UnityEngine;

public struct ProjectileState
{
    public Vector3 Position;
    public Vector3 Velocity;
}

public static class ProjectileSimulation
{
    public static void Simulate(ProjectileState[] projectileStates, float deltaTime)
    {
        for (int projectileIndex = 0; projectileIndex < projectileStates.Length; projectileIndex++)
        {
            projectileStates[projectileIndex].Position += projectileStates[projectileIndex].Velocity * deltaTime;
        }
    }
}
```

## 長所
- 連続メモリアクセスによってキャッシュミスを減らし、大量演算の性能を向上できます。
- Burst や Jobs のようなデータ指向処理と組み合わせると特に効果的です。

## 注意点
- 構造を性能優先に寄せすぎると、可読性やドメイン表現が弱くなることがあります。
- 配列同期やインデックス管理を誤ると、データ不整合バグが起きやすくなります。

## 動作ダイアグラム

連続メモリブロックを順次処理してキャッシュ効率を高める流れです。

```d2 title="Data Locality の流れ"
direction: right

frame: "Frame Start"

soa: {
  label: "SoA Buffers"
  positions: "positions[]"
  velocities: "velocities[]"
  hp: "hp[]"
}

chunk_loop: "for (i = 0..N)"
cache_hit: "Cache-friendly access"
result: "Bulk update complete"

frame -> chunk_loop
chunk_loop -> positions: "read i"
chunk_loop -> velocities: "read i"
chunk_loop -> hp: "read i"
positions -> cache_hit
velocities -> cache_hit
hp -> cache_hit
cache_hit -> result
```
