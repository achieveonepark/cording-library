---
title: Adapter
---

# Adapter

## 패턴 한 줄 설명
호환되지 않는 기존 인터페이스를 현재 시스템 인터페이스로 변환하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 레거시/외부 SDK를 프로젝트 표준 API에 맞출 때
- 기존 구현을 수정 없이 재사용할 때

## 구성 요소 (역할)
- Target
- Adaptee
- Adapter

## Unity 예시 (C#)
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

## 장점
- 모듈 경계를 명확히 해 결합도를 낮출 수 있습니다.
- 기존 코드 수정 없이 기능 확장/통합이 쉬워집니다.

## 주의할 점
- 래퍼/어댑터 계층이 깊어지면 디버깅이 어려워집니다.
- 책임 경계가 흐려지지 않도록 인터페이스를 작게 유지해야 합니다.

## 같이 보면 좋은 패턴
- Bridge
- Proxy
- Facade
