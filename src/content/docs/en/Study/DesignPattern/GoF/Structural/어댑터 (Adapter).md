---
title: Adapter
---

# Adapter

## One-line pattern summary
A pattern that converts an incompatible existing interface into the interface expected by the current system.

## Typical Unity use cases
- When aligning a legacy or external SDK with the project's standard API.
- When reusing an existing implementation without modifying it.

## Parts (roles)
- Target
- Adaptee
- Adapter

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

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

## Advantages
- It clarifies module boundaries and reduces coupling.
- Features can be extended or integrated without modifying existing code.

## Things to watch out for
- If wrapper layers become too deep, debugging gets harder.
- Interfaces should stay small so responsibility boundaries do not blur.

## Interaction diagram

This shows the flow where an existing interface is converted into the target interface for reuse.

```d2 title="Adapter Flow"
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
