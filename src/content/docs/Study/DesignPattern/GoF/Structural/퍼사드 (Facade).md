---
title: Facade
---
# Facade

복잡한 서브시스템에 대한 간단한 통합 인터페이스를 제공하는 패턴입니다. 클라이언트는 퍼사드(Facade)가 제공하는 간단한 메서드만 호출하면, 퍼사드 내부에서 복잡한 서브시스템의 여러 객체들을 조작하여 원하는 결과를 얻을 수 있습니다.

## 구현부
Facade 패턴은 주로 다음 요소들로 구성됩니다.

### Facade (퍼사드)
- 서브시스템의 복잡한 기능들을 조합하여 클라이언트가 사용하기 쉬운 상위 수준의 인터페이스를 제공합니다.
- 클라이언트의 요청을 서브시스템의 적절한 객체들에게 전달합니다.

### Subsystem (서브시스템)
- 실제 기능을 수행하는 여러 클래스들의 집합입니다.
- 퍼사드에 의해 호출되지만, 퍼사드를 직접 알지는 못합니다.

## 예시

```csharp
using System;

// --- 서브시스템 클래스들 ---

// 1. 오디오 시스템
public class AudioSystem
{
    public void TurnOn() => Console.WriteLine("Audio System: ON");
    public void TurnOff() => Console.WriteLine("Audio System: OFF");
    public void SetVolume(int level) => Console.WriteLine($"Audio System: Volume set to {level}");
}

// 2. 비디오 시스템
public class VideoSystem
{
    public void TurnOn() => Console.WriteLine("Video System: ON");
    public void TurnOff() => Console.WriteLine("Video System: OFF");
    public void SetSource(string source) => Console.WriteLine($"Video System: Source set to {source}");
}

// 3. 조명 시스템
public class LightSystem
{
    public void Dim(int level) => Console.WriteLine($"Lights: Dimmed to {level}%");
    public void Brighten() => Console.WriteLine("Lights: Brightened to 100%");
}

// --- Facade 클래스 ---

public class HomeTheaterFacade
{
    private AudioSystem _audio;
    private VideoSystem _video;
    private LightSystem _lights;

    public HomeTheaterFacade(AudioSystem audio, VideoSystem video, LightSystem lights)
    {
        _audio = audio;
        _video = video;
        _lights = lights;
    }

    // 영화 볼 준비를 하는 간단한 인터페이스
    public void WatchMovie(string movie)
    {
        Console.WriteLine("Get ready to watch a movie...");
        _lights.Dim(10);
        _video.TurnOn();
        _video.SetSource(movie);
        _audio.TurnOn();
        _audio.SetVolume(15);
    }

    // 영화 시청을 끝내는 간단한 인터페이스
    public void EndMovie()
    {
        Console.WriteLine("\nShutting movie theater down...");
        _audio.TurnOff();
        _video.TurnOff();
        _lights.Brighten();
    }
}

// 사용 예시
public class FacadeExample
{
    public static void Run()
    {
        // 서브시스템 객체 생성
        AudioSystem audio = new AudioSystem();
        VideoSystem video = new VideoSystem();
        LightSystem lights = new LightSystem();

        // 퍼사드를 통해 서브시스템 사용
        HomeTheaterFacade homeTheater = new HomeTheaterFacade(audio, video, lights);
        homeTheater.WatchMovie("Inception");
        homeTheater.EndMovie();
    }
}
```