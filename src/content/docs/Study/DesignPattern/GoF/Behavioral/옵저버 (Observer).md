---
title: Observer
---

# Observer

## 패턴 한 줄 설명
발행자 상태 변화가 구독자들에게 자동 통지되도록 하는 반응형 패턴입니다.

## Unity에서 쓰는 대표 상황
- 체력 변화에 UI/사운드/업적을 동시에 반응시킬 때
- 느슨한 이벤트 연결이 필요할 때

## 구성 요소 (역할)
- Subject
- Observer
- Subscribe/Unsubscribe

## Unity 예시 (C#)
```csharp
using System;

public sealed class HealthModel
{
    public event Action<int, int> HealthChanged;

    public void SetHealth(int currentHealth, int maxHealth)
    {
        HealthChanged?.Invoke(currentHealth, maxHealth);
    }
}

public sealed class HealthBarPresenter
{
    public void Bind(HealthModel healthModel)
    {
        healthModel.HealthChanged += OnHealthChanged;
    }

    private void OnHealthChanged(int currentHealth, int maxHealth) { }
}
```

## 장점
- 행동 로직을 분리해 변경 영향도를 줄일 수 있습니다.
- 규칙 추가/교체가 비교적 안전합니다.

## 주의할 점
- 객체 수와 간접 호출이 늘어 흐름 파악이 어려워질 수 있습니다.
- 전환/실행 순서 버그를 테스트로 고정해야 합니다.

## 같이 보면 좋은 패턴
- Event Queue
- Mediator
- Dirty Flag
