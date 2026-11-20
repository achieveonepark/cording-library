> For AI agents: the complete documentation index is available at /AchEngine/ja/llms.txt, the full documentation bundle is available at /AchEngine/ja/llms-full.txt.

# ConfigManager

PlayerPrefs ベースのキー・バリュー設定ストアです。

```csharp
var cfg = ServiceLocator.Resolve<ConfigManager>();
cfg.AddKey("bgmVolume", 1.0f);
cfg.AddKey("language", "ja");
float volume = cfg.GetConfig<float>("bgmVolume", fallback: 1f);
cfg.SetConfig("bgmVolume", 0.5f);
```

`AddKey` で登録していないキーへの `SetConfig` は無視されます。
