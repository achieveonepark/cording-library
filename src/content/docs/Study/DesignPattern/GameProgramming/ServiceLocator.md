---
title: Service Locator
---

서비스 로케이터는 오디오, 물리, 저장 시스템처럼 어플리케이션 전역에서 사용될 '서비스'들의 인스턴스를 등록하고 찾아올 수 있는 중앙 레지스트리(등록소)를 제공하는 디자인 패턴입니다.

서비스를 필요로 하는 클라이언트는 서비스의 구체적인 클래스가 무엇인지 알 필요 없이, 로케이터를 통해 "이런 종류의 서비스를 주세요"라고 요청하여 사용하게 됩니다.

### 왜 사용하는가?

- **느슨한 결합(Loose Coupling):** 클라이언트 코드가 `AudioSystem` 같은 구체적인 클래스 대신 `IAudioSystem`이라는 인터페이스에만 의존하게 됩니다. 이를 통해 실제 오디오 시스템의 구현이 바뀌더라도 클라이언트 코드는 수정할 필요가 없습니다.
- **전역 접근 지점:** 싱글톤(Singleton)과 유사하게 서비스에 대한 전역적인 접근 방법을 제공하지만, 싱글톤보다 유연합니다.
- **테스트 용이성:** 실제 서비스를 사용하는 대신, 테스트용 '가짜' 서비스(Mock Object 또는 Null Service)를 로케이터에 등록하여 단위 테스트를 쉽게 만들 수 있습니다. 예를 들어, 실제 소리를 재생하는 대신 콘솔에 로그만 남기는 `LoggingAudioSystem`을 주입할 수 있습니다.

### 간단한 구현 예제

`IAudioSystem`이라는 인터페이스를 기반으로 실제 서비스와 Null 서비스를 제공하는 예제입니다.

```csharp
// 1. 서비스 인터페이스 정의
public interface IAudioSystem
{
    void PlaySound(int soundId);
}

// 2. 실제 서비스 구현
public class RealAudioSystem : IAudioSystem
{
    public void PlaySound(int soundId)
    {
        Console.WriteLine($"Playing sound {soundId} using REAL audio hardware.");
    }
}

// 3. Null 서비스 구현 (서비스가 없거나 테스트용일 때 사용)
public class NullAudioSystem : IAudioSystem
{
    public void PlaySound(int soundId)
    {
        // 아무것도 하지 않음
        Console.WriteLine($"Sound {soundId} requested, but I'm a null service.");
    }
}

// 4. 서비스 로케이터 구현
public static class ServiceLocator
{
    private static IAudioSystem audioSystem;

    // 등록된 오디오 서비스를 가져오는 메서드
    public static IAudioSystem GetAudio()
    {
        // 서비스가 등록되지 않았다면 Null 서비스를 반환하여 NullReferenceException 방지
        return audioSystem ??= new NullAudioSystem();
    }

    // 서비스를 등록하는 메서드
    public static void RegisterService(IAudioSystem service)
    {
        audioSystem = service;
    }
}

// 사용 예시
public class Game
{
    public void Initialize()
    {
        // 게임 초기화 시 실제 서비스를 로케이터에 등록
        RealAudioSystem realAudio = new RealAudioSystem();
        ServiceLocator.RegisterService(realAudio);
    }

    public void PlayerJump()
    {
        // 게임 코드 어디서든 로케이터를 통해 서비스를 요청
        IAudioSystem audio = ServiceLocator.GetAudio();
        audio.PlaySound(SoundIds.PLAYER_JUMP);
    }
}
```

### 주의사항 및 대안

서비스 로케이터는 클래스의 의존성을 숨긴다는 단점이 있습니다. 어떤 클래스가 어떤 서비스를 필요로 하는지 생성자나 public 속성을 통해 명확히 드러나지 않기 때문에, 코드가 복잡해지면 의존성 관계를 파악하기 어려워질 수 있습니다.

이러한 이유로 현대적인 소프트웨어 아키텍처에서는 클래스가 필요로 하는 의존성을 외부에서 직접 주입해주는 **VContainer를 이용한 의존성 주입(Dependency Injection, DI)** 패턴을 더 선호하는 경향이 있습니다. 하지만 서비스 로케이터는 구현이 간단하고 직관적이어서, 특히 게임 개발이나 소규모 프로젝트에서는 여전히 실용적인 선택지가 될 수 있습니다.
