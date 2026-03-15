---
title: Memento
---

# Memento

## パターン一言説明
オブジェクト内部状態をカプセル化したスナップショットとして保存・復元するパターンです。

## Unity でよく使う状況
- チェックポイント復帰を実装するとき
- Undo / Redo をサポートするとき

## 構成要素（役割）
- Originator
- Memento
- Caretaker

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

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

## 長所
- 内部詳細を公開せずに状態保存・復元ロジックを切り離せます。
- チェックポイントや履歴系システムと相性が良いです。

## 注意点
- 状態が大きいとスナップショットデータも急激に増えます。
- 復元タイミングを明確にしないと同期バグが起きやすくなります。

## 動作ダイアグラム

元の状態をスナップショットとして保存し、必要時に復元する流れです。

```d2 title="Memento の流れ"
direction: right

originator: "Originator"
create: "Create Memento"
caretaker: "Caretaker Stack"
undo: "Undo Request"
restore: "Restore Memento"
state: "Previous State"

originator -> create: "save"
create -> caretaker: "push"
undo -> caretaker: "pop"
caretaker -> restore
restore -> originator
originator -> state
```
