> For AI agents: the complete documentation index is available at /AchEngine/ja/llms.txt, the full documentation bundle is available at /AchEngine/ja/llms-full.txt.

# AchSceneManager

非同期シーン遷移を提供し、`IScene` でライフサイクルを管理します。

```csharp
public class GameScene : MonoBehaviour, IScene
{
    public async Task OnSceneStart() { }
    public Task OnSceneEnd() => Task.CompletedTask;
}

var scenes = ServiceLocator.Resolve<AchSceneManager>();
await scenes.LoadSceneAsync("Lobby");
await scenes.ReloadSceneAsync();
await scenes.UnloadSceneAsync("SubScene");
```

Unity の `SceneManager` と区別するため `Ach` 接頭辞を使用しています。
