> For AI agents: the complete documentation index is available at /AchEngine/ja/llms.txt, the full documentation bundle is available at /AchEngine/ja/llms-full.txt.

# PoolManager

Unity `ObjectPool<GameObject>` をラップし、弾やパーティクルの生成・破棄による GC 負荷を減らします。

```csharp
var pool = ServiceLocator.Resolve<PoolManager>();
pool.RegisterPool("Bullet", bulletPrefab, defaultCapacity: 20, maxSize: 100);
var bullet = pool.Get<BulletComponent>("Bullet");
var gameObject = pool.Get("Bullet");
pool.Release("Bullet", gameObject);
pool.ClearPool("Bullet");
pool.ClearAll();
```
