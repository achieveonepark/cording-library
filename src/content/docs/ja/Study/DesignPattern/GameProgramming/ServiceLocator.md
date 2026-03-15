---
title: Service Locator
---

# Service Locator

## パターン一言説明
共通サービスへのアクセスを中央レジストリへ集め、呼び出し側の結合を下げるパターンです。

## Unity でよく使う状況
- オーディオ・保存・分析サービスをグローバルに参照するとき
- 初期段階で DI を簡略化したいとき

## 構成要素（役割）
- Service Interface
- Locator Registry
- Bootstrap Registration

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
public interface IAudioService
{
    void PlaySfx(string clipId);
}

public static class GameServices
{
    public static IAudioService AudioService { get; private set; }

    public static void RegisterAudioService(IAudioService audioService)
    {
        AudioService = audioService;
    }
}

public sealed class DamageFeedbackSystem
{
    public void OnHit()
    {
        GameServices.AudioService?.PlaySfx("Hit");
    }
}
```

## 長所
- 共通サービスを一箇所から差し替え・注入できるため、初期開発の速度が上がります。
- 呼び出し側が生成責務を持たなくなるため、利用コードが単純になります。

## 注意点
- 隠れたグローバル依存が生まれ、テスト分離や依存追跡が難しくなります。
- 初期化順序が崩れると、実行時 Null 参照が起きやすくなります。

## 動作ダイアグラム

クライアントがインターフェースキーでサービスを解決して使う流れです。

```d2 title="Service Locator の流れ"
direction: right

client: "Gameplay System"
locator: "Service Locator"
registry: "Service Registry"
service: "IAudioService Implementation"
result: "Play SFX"

client -> locator: "Resolve<IAudioService>()"
locator -> registry: "lookup key"
registry -> service: "return instance"
service -> result: "Play(soundId)"
result -> client: "done"
```
