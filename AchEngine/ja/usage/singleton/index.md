> For AI agents: the complete documentation index is available at /AchEngine/ja/llms.txt, the full documentation bundle is available at /AchEngine/ja/llms-full.txt.

# シングルトン

## `Singleton<T>` — 純粋 C\#

Unity ライフサイクルが不要なサービス向けです。

```csharp
public sealed class GameRules : Singleton<GameRules> { }
var rules = GameRules.Instance;
```

## `MonoSingleton<T>` — シーン内

```csharp
public class ObjectTouchManager : MonoSingleton<ObjectTouchManager> { }
```

## `PersistentMonoSingleton<T>` — 永続

```csharp
public class AudioRoot : PersistentMonoSingleton<AudioRoot> { }
```

シーンをまたいで保持するコンポーネントは `PersistentMonoSingleton<T>` を使います。
