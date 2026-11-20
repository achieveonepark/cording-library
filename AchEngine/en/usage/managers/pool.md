> For AI agents: the complete documentation index is available at /AchEngine/en/llms.txt, the full documentation bundle is available at /AchEngine/en/llms-full.txt.

# PoolManager

`PoolManager` wraps Unity `ObjectPool<GameObject>` to reduce GC pressure from repeatedly created bullets, particles, and similar objects.

## API

```csharp
var pool = ServiceLocator.Resolve<PoolManager>();

pool.RegisterPool("Bullet", bulletPrefab, defaultCapacity: 20, maxSize: 100);

var bullet = pool.Get<BulletComponent>("Bullet");
var gameObject = pool.Get("Bullet");

pool.Release("Bullet", gameObject);
pool.ClearPool("Bullet");
pool.ClearAll();
```
