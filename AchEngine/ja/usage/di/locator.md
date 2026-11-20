> For AI agents: the complete documentation index is available at /AchEngine/ja/llms.txt, the full documentation bundle is available at /AchEngine/ja/llms-full.txt.

# ServiceLocator

VContainer 未導入でも `ServiceLocator` は手動初期化して使用できます。VContainer 環境では通常 `AchEngineScope` が初期化します。

```csharp
ServiceLocator.Setup(provider);
var service = ServiceLocator.Resolve<IGameService>();
bool exists = ServiceLocator.TryResolve<IGameService>(out var game);
ServiceLocator.Clear();
```

Unity が直接生成する `MonoBehaviour` や静的コールバックでは `ServiceLocator` を使い、VContainer が生成するオブジェクトでは `[Inject]` を使います。

ServiceLocator はライフタイム管理ではなく検索ファサードです。VContainer なしの場合は生成と破棄をブートストラップ側で管理してください。

## 関連ドキュメント

- [DI システム](/AchEngine/ja/usage/di.md)
- [DI ライフサイクル](/AchEngine/ja/usage/di/lifecycle.md)
