---
title: Prototype
---

# Prototype

## パターン一言説明
新しいオブジェクトをコンストラクタ呼び出しではなく、既存の原型を複製して作るパターンです。

## Unity でよく使う状況
- モンスターテンプレートを複製してランタイムインスタンスを作るとき
- 生成コストの高いオブジェクトを素早く複製したいとき

## 構成要素（役割）
- Prototype
- Clone
- Prototype Registry

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using UnityEngine;

[CreateAssetMenu(menuName = "Game/Enemy Archetype Data")]
public sealed class EnemyArchetypeData : ScriptableObject
{
    public int baseHealth;
    public float moveSpeed;

    public EnemyRuntimeData CloneRuntimeData()
    {
        return new EnemyRuntimeData(baseHealth, moveSpeed);
    }
}

public sealed class EnemyRuntimeData
{
    public int CurrentHealth;
    public float CurrentMoveSpeed;

    public EnemyRuntimeData(int currentHealth, float currentMoveSpeed)
    {
        CurrentHealth = currentHealth;
        CurrentMoveSpeed = currentMoveSpeed;
    }
}
```

## 長所
- オブジェクト生成責務が整理され、依存関係の管理がしやすくなります。
- 環境や状況ごとに生成方針を柔軟に変えられます。

## 注意点
- 単純な問題に過度な生成抽象化を入れないようにする必要があります。
- 生成ルールが増えるほど、文書とテストの同期が重要になります。

## 動作ダイアグラム

登録済みの原型を複製し、ランタイム値を重ねてインスタンス化する流れです。

```d2 title="Prototype の流れ"
direction: right

spawner: "Spawner"
registry: "Prototype Registry"
prototype: "Enemy Prototype"
clone: "Clone()"
customize: "Set Runtime Values"
result: "Spawned Enemy"

spawner -> registry: "request type"
registry -> prototype
prototype -> clone
clone -> customize
customize -> result
```
