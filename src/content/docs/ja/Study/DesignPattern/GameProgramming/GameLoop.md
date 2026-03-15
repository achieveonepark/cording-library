---
title: Game Loop
---

# Game Loop

## パターン一言説明
入力・更新・描画の繰り返しを安定して維持する、ゲームの中核実行パターンです。

## Unity でよく使う状況
- 固定ステップシミュレーションを実装するとき
- 入力タイミングと描画タイミングを分離したいとき

## 構成要素（役割）
- Input Step
- Simulate Step
- Render Step

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

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

## 長所
- 更新順序を固定することで、シミュレーションの再現性とデバッグの安定性が高まります。
- 固定ステップと補間を分けることで、物理精度と画面の滑らかさを両立できます。

## 注意点
- 重いフレームでは `while` ループが長くなり、spiral of death に陥ることがあります。
- `Update` と `FixedUpdate` の責務が混ざると、入力遅延や物理誤差が大きくなります。

## 動作ダイアグラム

入力・シミュレーション・描画をフレーム単位で繰り返すメインループです。

```d2 title="Game Loop の流れ"
direction: right

start: "Frame Begin"
input: "Poll Input"
fixed_step: "Fixed Update / Physics"
game_update: "Gameplay Update"
render: "Render"
next: "Next Frame"

start -> input
input -> fixed_step
fixed_step -> game_update
game_update -> render
render -> next
next -> start: "loop"
```
