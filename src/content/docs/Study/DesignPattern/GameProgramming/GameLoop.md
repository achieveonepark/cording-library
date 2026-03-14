---
title: Game Loop
---

# Game Loop

## 패턴 한 줄 설명
입력-업데이트-렌더의 반복 흐름을 안정적으로 유지하는 게임의 핵심 실행 패턴입니다.

## Unity에서 쓰는 대표 상황
- 고정 스텝 시뮬레이션을 구현할 때
- 입력과 렌더 타이밍을 분리하고 싶을 때

## 구성 요소 (역할)
- Input Step
- Simulate Step
- Render Step

## Unity 예시 (C#)
```csharp
using UnityEngine;

public sealed class FixedStepLoop : MonoBehaviour
{
    private const float SimulationStep = 1f / 60f;
    private float accumulatedDeltaTime;

    private void Update()
    {
        accumulatedDeltaTime += Time.deltaTime;

        while (accumulatedDeltaTime >= SimulationStep)
        {
            Simulate(SimulationStep);
            accumulatedDeltaTime -= SimulationStep;
        }

        float interpolationAlpha = accumulatedDeltaTime / SimulationStep;
        Render(interpolationAlpha);
    }

    private void Simulate(float deltaTime) { }
    private void Render(float interpolationAlpha) { }
}
```

## 장점
- Unity 런타임 성능/구조 개선에 바로 연결됩니다.
- 기능 분리로 테스트와 유지보수가 쉬워집니다.

## 주의할 점
- 패턴 남용 시 추상화 비용이 실익보다 커질 수 있습니다.
- 성능/가독성 트레이드오프를 측정으로 확인해야 합니다.

## 같이 보면 좋은 패턴
- State
- Command
- Event Queue
