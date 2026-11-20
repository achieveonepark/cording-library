> For AI agents: the complete documentation index is available at /AchEngine/en/llms.txt, the full documentation bundle is available at /AchEngine/en/llms-full.txt.

# AchSceneManager

`AchSceneManager` provides asynchronous scene transitions and manages scene lifecycle through `IScene`.

## Implement `IScene`

Attach an `IScene` component to a scene root:

```csharp
public class GameScene : MonoBehaviour, IScene
{
    public async Task OnSceneStart() { /* initialize */ }
    public Task OnSceneEnd() => Task.CompletedTask;
}
```

## API

```csharp
var scenes = ServiceLocator.Resolve<AchSceneManager>();

await scenes.LoadSceneAsync("Lobby");
await scenes.ReloadSceneAsync();
await scenes.UnloadSceneAsync("SubScene");

scenes.OnSceneLoadStarted += ShowLoadingUI;
AchSceneManager.OnSceneLoadCompleted += HideLoadingUI;
```

The `Ach` prefix distinguishes this manager from Unity's `UnityEngine.SceneManagement.SceneManager`.
