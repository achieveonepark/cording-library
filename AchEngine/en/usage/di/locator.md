> For AI agents: the complete documentation index is available at /AchEngine/en/llms.txt, the full documentation bundle is available at /AchEngine/en/llms-full.txt.

# ServiceLocator

> **VContainer-free use**
> 
> `ServiceLocator` can be initialized manually even when VContainer is not installed. With VContainer installed, `AchEngineScope` normally initializes it for you.
> 


## API

```csharp
ServiceLocator.Setup(IServiceProvider provider);
T service = ServiceLocator.Resolve<T>();
bool exists = ServiceLocator.TryResolve<T>(out var service);
ServiceLocator.Clear();
```

## Example

```csharp
public class EnemySpawner : MonoBehaviour
{
    private IEnemyService _enemies;

    private void Start()
    {
        _enemies = ServiceLocator.Resolve<IEnemyService>();
    }
}
```

## `[Inject]` vs `ServiceLocator`

Use `[Inject]` for objects created by the VContainer container. Use `ServiceLocator` from `MonoBehaviour`, static callbacks, or objects Unity creates directly.

## Manual initialization without VContainer

Register a provider or service collection during bootstrap, then call `ServiceLocator.Setup(...)` before any consumer resolves a service.


> **Non-VContainer environment**
> 
> `ServiceLocator` is a lookup facade, not a lifetime manager. The bootstrap code owns service creation and disposal when no DI container is present.
> 


## Related docs

- [DI system overview](/AchEngine/en/usage/di.md)
- [DI lifecycle design](/AchEngine/en/usage/di/lifecycle.md)
