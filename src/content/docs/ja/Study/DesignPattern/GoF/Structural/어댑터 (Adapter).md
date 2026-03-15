---
title: Adapter
---

# Adapter

## パターン一言説明
互換性のない既存インターフェースを、現在システムが期待するインターフェースへ変換するパターンです。

## Unity でよく使う状況
- レガシー SDK や外部 SDK をプロジェクト標準 API に合わせたいとき
- 既存実装を修正せずに再利用したいとき

## 構成要素（役割）
- Target
- Adaptee
- Adapter

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
public interface IAdsService
{
    void ShowRewardedAd(string placementId);
}

public sealed class LegacyAdsSdk
{
    public void ShowRewardVideo(string zoneId) { }
}

public sealed class LegacyAdsServiceAdapter : IAdsService
{
    private readonly LegacyAdsSdk legacyAdsSdk = new();

    public void ShowRewardedAd(string placementId)
    {
        legacyAdsSdk.ShowRewardVideo(placementId);
    }
}
```

## 長所
- モジュール境界が明確になり、結合度を下げられます。
- 既存コードを変更せずに機能拡張や統合がしやすくなります。

## 注意点
- ラッパー層が深くなりすぎるとデバッグが難しくなります。
- 責務境界が曖昧にならないよう、インターフェースは小さく保つべきです。

## 動作ダイアグラム

既存インターフェースを目標インターフェースへ変換して再利用する流れです。

```d2 title="Adapter の流れ"
direction: right

client: "Game UI"
target: "ILeaderboardService"
adapter: "LeaderboardAdapter"
adaptee: "Legacy SDK"
result: "Rank Data"

client -> target: "GetTopRanks()"
target -> adapter
adapter -> adaptee: "Convert Call"
adaptee -> adapter: "legacy response"
adapter -> result: "mapped DTO"
result -> client
```
