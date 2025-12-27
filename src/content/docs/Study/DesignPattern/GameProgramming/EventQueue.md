---
title: Event Queue
---

이벤트 큐는 시스템의 한 부분에서 발생한 이벤트를 즉시 처리하지 않고, 중간 저장소인 큐(Queue)에 차곡차곡 쌓아두었다가, 다른 부분에서 이를 순차적으로 꺼내어 처리하도록 만드는 디자인 패턴입니다.

이벤트의 발신자(Sender)와 수신자(Receiver) 사이의 직접적인 결합을 끊어주는 역할을 합니다.

### 왜 사용하는가?

- **디커플링 (Decoupling):** 이벤트를 보내는 쪽은 누가 이 이벤트를 받아서 처리하는지 알 필요가 없고, 받는 쪽 또한 누가 이벤트를 보냈는지 알 필요가 없습니다. 예를 들어, '물리 시스템'은 '두 객체가 충돌했다'는 이벤트만 큐에 던져넣으면 됩니다. 그러면 '오디오 시스템'이 이 이벤트를 보고 충돌음을 재생하고, '게임 로직 시스템'은 점수를 올리는 식입니다. 오디오 시스템을 제거해도 물리 시스템은 아무런 영향을 받지 않습니다.
- **처리 시점 제어:** 이벤트를 발생 즉시 처리하면 연쇄적인 로직 호출로 인해 코드를 추적하기 어려워지거나 얘기치 못한 버그가 발생할 수 있습니다. 이벤트 큐를 사용하면 모든 이벤트를 게임 루프의 특정 시점(예: 업데이트 끝, 렌더링 시작 전)에 모아서 처리할 수 있어 흐름이 명확해집니다.
- **비동기 처리:** 이벤트를 다른 스레드로 보내 처리하게 하거나, 시간 간격을 두고 처리하는 등 유연한 구현이 가능해집니다.

### 간단한 구현 예제

간단한 오디오 시스템이 이벤트 큐를 통해 사운드를 재생하는 예제입니다.

```csharp
// 이벤트 타입을 식별하기 위한 열거형
public enum EventType
{
    PlayerJumped,
    EnemyDied,
    ItemCollected
}

// 이벤트 클래스
public class Event
{
    public EventType Type { get; }
    public Event(EventType type)
    {
        Type = type;
    }
}

// 중앙 이벤트 큐 (보통 싱글톤으로 구현)
public static class EventQueue
{
    private static Queue<Event> eventQueue = new Queue<Event>();

    public static void Enqueue(Event e)
    {
        eventQueue.Enqueue(e);
        Console.WriteLine($"Event enqueued: {e.Type}");
    }

    public static Event Dequeue()
    {
        if (eventQueue.Count > 0)
        {
            return eventQueue.Dequeue();
        }
        return null;
    }
}

// 이벤트를 처리하는 시스템
public class AudioSystem
{
    public void ProcessEvents()
    {
        Event e;
        while ((e = EventQueue.Dequeue()) != null)
        {
            Console.WriteLine($"AudioSystem processing event: {e.Type}");
            switch (e.Type)
            {
                case EventType.PlayerJumped:
                    // 점프 사운드 재생
                    break;
                case EventType.EnemyDied:
                    // 적 사망 사운드 재생
                    break;
                // ...
            }
        }
    }
}

// 사용 예시
public class Game
{
    public void Play()
    {
        AudioSystem audio = new AudioSystem();

        // 게임 로직 중 어딘가에서 이벤트 발생
        if (player.Jumped)
        {
            EventQueue.Enqueue(new Event(EventType.PlayerJumped));
        }
        
        if (enemy.IsDead)
        {
            EventQueue.Enqueue(new Event(EventType.EnemyDied));
        }
        
        // 메인 루프의 특정 시점에서 모든 이벤트를 처리
        audio.ProcessEvents();
    }
}
```
