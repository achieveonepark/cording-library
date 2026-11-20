> For AI agents: the complete documentation index is available at /AchEngine/en/llms.txt, the full documentation bundle is available at /AchEngine/en/llms-full.txt.

# ConfigManager

`ConfigManager` is a PlayerPrefs-based key-value store for simple options such as volume and language.

## API

```csharp
var cfg = ServiceLocator.Resolve<ConfigManager>();

cfg.AddKey("bgmVolume", 1.0f);
cfg.AddKey("language", "en");

float volume = cfg.GetConfig<float>("bgmVolume", fallback: 1f);
cfg.SetConfig("bgmVolume", 0.5f);
```

`SetConfig` does nothing for a key that has not been registered with `AddKey`.
