---
title: Mediator
---

# Mediator

## 패턴 한 줄 설명
여러 객체의 상호작용을 중재 객체로 모아 객체 간 직접 의존을 줄이는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 인벤토리/장비/상점 UI 연동을 중앙 제어할 때
- 서로 참조가 복잡해질 때

## 구성 요소 (역할)
- Mediator
- Concrete Mediator
- Colleague

## Unity 예시 (C#)
```csharp
public interface IUiMediator
{
    void Notify(object sender, string eventId);
}

public sealed class LobbyUiMediator : IUiMediator
{
    public InventoryPanel InventoryPanel { get; set; }
    public EquipmentPanel EquipmentPanel { get; set; }

    public void Notify(object sender, string eventId)
    {
        if (sender == InventoryPanel && eventId == "ItemSelected")
        {
            EquipmentPanel.PreviewSelectedItem();
        }
    }
}
```

## 장점
- 행동 로직을 분리해 변경 영향도를 줄일 수 있습니다.
- 규칙 추가/교체가 비교적 안전합니다.

## 주의할 점
- 객체 수와 간접 호출이 늘어 흐름 파악이 어려워질 수 있습니다.
- 전환/실행 순서 버그를 테스트로 고정해야 합니다.

## 같이 보면 좋은 패턴
- Observer
- Facade
- Event Queue
