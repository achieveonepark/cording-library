---
title: Memento
---

# Memento

## 패턴 한 줄 설명
객체 내부 상태를 캡슐화한 스냅샷으로 저장/복원하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 체크포인트 복귀를 구현할 때
- Undo/Redo를 지원할 때

## 구성 요소 (역할)
- Originator
- Memento
- Caretaker

## Unity 예시 (C#)
```csharp
using System.Collections.Generic;
using UnityEngine;

public readonly struct PlayerStateSnapshot
{
    public readonly Vector3 Position;
    public readonly int Health;

    public PlayerStateSnapshot(Vector3 position, int health)
    {
        Position = position;
        Health = health;
    }
}

public sealed class PlayerStateHistory
{
    private readonly Stack<PlayerStateSnapshot> snapshots = new();

    public void Save(PlayerStateSnapshot snapshot) => snapshots.Push(snapshot);
    public bool TryRestore(out PlayerStateSnapshot snapshot) => snapshots.TryPop(out snapshot);
}
```

## 장점
- 행동 로직을 분리해 변경 영향도를 줄일 수 있습니다.
- 규칙 추가/교체가 비교적 안전합니다.

## 주의할 점
- 객체 수와 간접 호출이 늘어 흐름 파악이 어려워질 수 있습니다.
- 전환/실행 순서 버그를 테스트로 고정해야 합니다.

## 같이 보면 좋은 패턴
- Command
- State
- Prototype
