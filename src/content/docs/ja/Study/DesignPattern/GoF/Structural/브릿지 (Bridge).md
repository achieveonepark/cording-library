---
title: Bridge
---

# Bridge

## パターン一言説明
抽象化と実装を分離し、両方を独立して拡張できるようにするパターンです。

## Unity でよく使う状況
- 入力デバイス実装を操作ロジックから分離したいとき
- プラットフォーム別バックエンド実装を差し替えたいとき

## 構成要素（役割）
- Abstraction
- Implementor
- Concrete Implementor

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using UnityEngine;

public interface IInputReader
{
    Vector2 ReadMovement();
}

public sealed class KeyboardInputReader : IInputReader
{
    public Vector2 ReadMovement()
    {
        float horizontal = Input.GetAxisRaw("Horizontal");
        float vertical = Input.GetAxisRaw("Vertical");
        return new Vector2(horizontal, vertical);
    }
}

public sealed class CharacterMovementController
{
    private readonly IInputReader inputReader;

    public CharacterMovementController(IInputReader inputReader)
    {
        this.inputReader = inputReader;
    }

    public Vector2 GetMoveDirection() => inputReader.ReadMovement();
}
```

## 長所
- モジュール境界が明確になり、結合度を下げられます。
- 既存コードを変更せずに機能拡張や統合がしやすくなります。

## 注意点
- ラッパー層が深くなりすぎるとデバッグが難しくなります。
- 責務境界が曖昧にならないよう、インターフェースは小さく保つべきです。

## 動作ダイアグラム

抽象化と実装を分離し、それぞれを独立に拡張する委譲の流れです。

```d2 title="Bridge の流れ"
direction: right

abstraction: "Weapon"
refined: "Rifle / Cannon"
implementor: "IFireMode"
raycast: "RaycastFire"
projectile: "ProjectileFire"
output: "Fire Result"

refined -> abstraction: "inherits"
abstraction -> implementor: "has-a"
implementor -> raycast: "select"
implementor -> projectile: "select"
raycast -> output
projectile -> output
```
