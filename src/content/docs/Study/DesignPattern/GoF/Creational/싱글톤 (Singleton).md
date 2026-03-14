---
title: Singleton
---

# Singleton

## 패턴 한 줄 설명
인스턴스를 하나만 유지하고 전역 접근점을 제공하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 게임 설정/로그 같은 단일 서비스가 필요할 때
- 씬 간 유지되는 매니저를 둘 때

## 구성 요소 (역할)
- Singleton Instance
- Global Accessor
- Lifetime Guard

## Unity 예시 (C#)
```csharp
using UnityEngine;

public sealed class GameSettingsService : MonoBehaviour
{
    public static GameSettingsService Instance { get; private set; }

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
        DontDestroyOnLoad(gameObject);
    }
}
```

## 장점
- 객체 생성 책임을 정리해 의존성 관리가 쉬워집니다.
- 환경별/상황별 생성 정책을 유연하게 바꿀 수 있습니다.

## 주의할 점
- 간단한 문제에 과한 생성 추상화를 넣지 않아야 합니다.
- 생성 규칙이 많아질수록 문서와 테스트 동기화가 중요합니다.

## 같이 보면 좋은 패턴
- Service Locator
- Facade
- Abstract Factory
