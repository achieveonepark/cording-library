---
title: Facade
---

# Facade

## 패턴 한 줄 설명
복잡한 서브시스템을 단순한 상위 API로 감싸 사용성을 높이는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 게임 부팅 절차를 한 메서드로 감출 때
- 모듈 내부 상세를 외부에 숨길 때

## 구성 요소 (역할)
- Facade
- Subsystem
- Client

## Unity 예시 (C#)
```csharp
public sealed class GameStartupFacade
{
    private readonly SaveSystem saveSystem = new();
    private readonly AudioSystem audioSystem = new();
    private readonly UiSystem uiSystem = new();

    public void StartGame()
    {
        saveSystem.Load();
        audioSystem.Initialize();
        uiSystem.OpenLobby();
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
- Mediator
- Service Locator
- Adapter
