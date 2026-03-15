---
title: Builder
---

# Builder

## パターン一言説明
複雑なオブジェクト生成過程を段階的に分離し、可読性と安全性を高めるパターンです。

## Unity でよく使う状況
- オプションの多い設定オブジェクトを作るとき
- 同じ手順で異なる結果物を作りたいとき

## 構成要素（役割）
- Builder
- Director (任意)
- Product

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
public sealed class EnemyWaveConfig
{
    public int EnemyCount;
    public float SpawnIntervalSeconds;
    public string RewardId;
}

public sealed class EnemyWaveBuilder
{
    private readonly EnemyWaveConfig waveConfig = new();

    public EnemyWaveBuilder SetEnemyCount(int enemyCount)
    {
        waveConfig.EnemyCount = enemyCount;
        return this;
    }

    public EnemyWaveBuilder SetSpawnInterval(float spawnIntervalSeconds)
    {
        waveConfig.SpawnIntervalSeconds = spawnIntervalSeconds;
        return this;
    }

    public EnemyWaveBuilder SetReward(string rewardId)
    {
        waveConfig.RewardId = rewardId;
        return this;
    }

    public EnemyWaveConfig Build() => waveConfig;
}
```

## 長所
- オブジェクト生成責務が整理され、依存関係の管理がしやすくなります。
- 環境や状況ごとに生成方針を柔軟に変えられます。

## 注意点
- 単純な問題に過度な生成抽象化を入れないようにする必要があります。
- 生成ルールが増えるほど、文書とテストの同期が重要になります。

## 動作ダイアグラム

複雑なオブジェクトを段階的に組み立て、最後に結果を返す流れです。

```d2 title="Builder の流れ"
direction: down

director: "Director"
step1: "BuildStats()"
step2: "BuildEquipment()"
step3: "BuildSkills()"
product: "CharacterData"

director -> step1
step1 -> step2
step2 -> step3
step3 -> product
```
