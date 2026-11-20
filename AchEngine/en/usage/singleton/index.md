> For AI agents: the complete documentation index is available at /AchEngine/en/llms.txt, the full documentation bundle is available at /AchEngine/en/llms-full.txt.

# Singleton

## `Singleton<T>` — pure C# singleton

Use the pure C# base for services that do not need a Unity lifecycle.

```csharp
public sealed class GameRules : Singleton<GameRules>
{
    public int MaxPlayers = 4;
}

var rules = GameRules.Instance;
```

## `MonoSingleton<T>` — scene-local singleton

Use this base for a component that should have one instance in the current scene.

```csharp
public class ObjectTouchManager : MonoSingleton<ObjectTouchManager> { }
```

## `PersistentMonoSingleton<T>` — persistent singleton

Use this base when the component should survive scene changes through `DontDestroyOnLoad`.

```csharp
public class AudioRoot : PersistentMonoSingleton<AudioRoot> { }
```
