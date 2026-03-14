---
title: Event Queue
---

# Event Queue

## 패턴 한 줄 설명
이벤트 발행과 소비를 큐로 분리해 시스템 간 결합을 낮추는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 전투 이벤트를 UI/사운드/보상에 동시에 전달할 때
- 즉시 호출 결합을 줄이고 싶을 때

## 구성 요소 (역할)
- Publisher: 이벤트 발행
- Queue: 이벤트 저장
- Consumer: 프레임 단위 처리

## Unity 예시 (C#)
```csharp
using System.Collections.Generic;
using UnityEngine;

public readonly struct CombatEvent
{
    public readonly string EventType;
    public readonly int Value;

    public CombatEvent(string eventType, int value)
    {
        EventType = eventType;
        Value = value;
    }
}

public sealed class CombatEventQueue : MonoBehaviour
{
    private readonly Queue<CombatEvent> pendingEvents = new();

    public void Publish(CombatEvent combatEvent)
    {
        pendingEvents.Enqueue(combatEvent);
    }

    private void Update()
    {
        while (pendingEvents.Count > 0)
        {
            CombatEvent combatEvent = pendingEvents.Dequeue();
            Debug.Log($"${combatEvent.EventType}: ${combatEvent.Value}");
        }
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
- Observer
- Mediator
- Command
