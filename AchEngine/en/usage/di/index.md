> For AI agents: the complete documentation index is available at /AchEngine/en/llms.txt, the full documentation bundle is available at /AchEngine/en/llms-full.txt.

# DI System — Overview

AchEngine provides a small DI abstraction without exposing VContainer directly.


> **Optional module**
> 
> The real DI container is enabled only when `jp.hadashikick.vcontainer` is installed. Without it, `ServiceLocator` remains usable with manual setup.
> 


## Core components

| Class                | Role                                                    |
| -------------------- | ------------------------------------------------------- |
| `AchEngineScope`     | Scene entry point wrapping VContainer's `LifetimeScope` |
| `AchEngineInstaller` | Base class for defining service registrations           |
| `IServiceBuilder`    | Registration interface independent of VContainer        |
| `ServiceLocator`     | Static facade for resolving services at runtime         |

## Basic flow

```mermaid
flowchart TD
A([Load scene]) --> B[AchEngineScope.Awake]
B --> C["AchEngineInstaller<br/>.Install(builder) × N"]
C --> D[("Build VContainer")]
D --> E[ServiceLocator.Setup]
E --> F{Runtime}
F --> G["[Inject]<br/>attribute injection"]
F --> H["ServiceLocator<br/>.Resolve<T>()"]
```

## `ServiceLifetime`

```csharp
public enum ServiceLifetime
{
    Singleton, // One instance per container (default)
    Transient, // A new instance per request
    Scoped,    // One instance per scope
}
```

## Next steps

- [AchEngineInstaller](/AchEngine/en/usage/di/installer.md)
- [ServiceLocator](/AchEngine/en/usage/di/locator.md)
- [DI lifecycle design](/AchEngine/en/usage/di/lifecycle.md)
