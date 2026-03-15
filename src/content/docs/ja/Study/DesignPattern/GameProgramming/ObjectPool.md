---
title: Object Pool
---

# Object Pool

## パターン一言説明
頻繁に生成・破棄されるオブジェクトを再利用し、割り当てコストと GC スパイクを減らすパターンです。

## Unity でよく使う状況
- 弾やエフェクトを大量に生成・削除するとき
- モバイルで GC の跳ねを減らしたいとき

## 構成要素（役割）
- Pool: 再利用保管庫
- Get: 取り出し
- Release: 返却

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using UnityEngine;
using UnityEngine.Pool;

public sealed class ProjectilePoolController : MonoBehaviour
{
    [SerializeField] private GameObject projectilePrefab;

    private ObjectPool<GameObject> projectilePool;

    private void Awake()
    {
        projectilePool = new ObjectPool<GameObject>(
            createFunc: () => Instantiate(projectilePrefab),
            actionOnGet: projectile => projectile.SetActive(true),
            actionOnRelease: projectile => projectile.SetActive(false),
            actionOnDestroy: projectile => Destroy(projectile),
            collectionCheck: false,
            defaultCapacity: 32,
            maxSize: 256
        );
    }

    public GameObject SpawnProjectile(Vector3 spawnPosition)
    {
        GameObject projectile = projectilePool.Get();
        projectile.transform.position = spawnPosition;
        return projectile;
    }
}
```

## 長所
- Instantiate / Destroy の頻度を下げ、GC スパイクやヒッチを減らせます。
- 最大オブジェクト数を制御しやすく、性能予算を見積もりやすくなります。

## 注意点
- 返却漏れがあるとプール枯渇や不要なメモリ増加につながります。
- 再利用オブジェクトの状態初期化を忘れると、前フレームのデータが混ざるバグが起きます。

## 動作ダイアグラム

オブジェクトを再利用して割り当てと解放を減らす管理フローです。

```d2 title="Object Pool の流れ"
direction: right

spawn_request: "Spawn Request"
check_pool: "Idle Object Exists?"
checkout: "Get From Pool"
create_new: "Instantiate"
active_use: "Active Object"
release: "Release()"
reset: "Reset State"
pool_store: "Return To Pool"

spawn_request -> check_pool
check_pool -> checkout: "yes"
check_pool -> create_new: "no"
checkout -> active_use
create_new -> active_use
active_use -> release
release -> reset
reset -> pool_store
pool_store -> check_pool
```
