---
title: Data Locality
---

# Data Locality

## 패턴 한 줄 설명
자주 접근하는 데이터를 연속 메모리에 배치해 캐시 효율을 높이는 성능 중심 패턴입니다.

## Unity에서 쓰는 대표 상황
- 총알/파티클처럼 대량 객체를 매 프레임 갱신할 때
- CPU 병목을 줄여야 할 때

## 구성 요소 (역할)
- Hot Data: 자주 접근하는 값
- Contiguous Storage: 연속 배열
- Loop: 단순 반복 처리

## Unity 예시 (C#)
```csharp
using UnityEngine;

public struct ProjectileState
{
    public Vector3 Position;
    public Vector3 Velocity;
}

public static class ProjectileSimulation
{
    public static void Simulate(ProjectileState[] projectileStates, float deltaTime)
    {
        for (int projectileIndex = 0; projectileIndex < projectileStates.Length; projectileIndex++)
        {
            projectileStates[projectileIndex].Position += projectileStates[projectileIndex].Velocity * deltaTime;
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
- Object Pool
- Flyweight
- Component
