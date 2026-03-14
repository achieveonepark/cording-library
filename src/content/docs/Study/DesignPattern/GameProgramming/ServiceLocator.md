---
title: Service Locator
---

# Service Locator

## 패턴 한 줄 설명
공통 서비스 접근을 중앙 레지스트리로 모아 호출부 결합을 줄이는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 오디오/저장/분석 서비스를 전역에서 참조할 때
- 초기 단계에서 DI를 단순화할 때

## 구성 요소 (역할)
- Service Interface
- Locator Registry
- Bootstrap Registration

## Unity 예시 (C#)
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

## 장점
- Unity 런타임 성능/구조 개선에 바로 연결됩니다.
- 기능 분리로 테스트와 유지보수가 쉬워집니다.

## 주의할 점
- 패턴 남용 시 추상화 비용이 실익보다 커질 수 있습니다.
- 성능/가독성 트레이드오프를 측정으로 확인해야 합니다.

## 같이 보면 좋은 패턴
- Singleton
- Facade
- Abstract Factory
