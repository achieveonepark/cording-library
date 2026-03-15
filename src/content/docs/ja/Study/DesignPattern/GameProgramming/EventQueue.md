---
title: Event Queue
---

# Event Queue

## パターン一言説明
イベントの発行と消費をキューで分離し、システム間の結合を下げるパターンです。

## Unity でよく使う状況
- 戦闘イベントを UI / サウンド / 報酬へ同時に届けたいとき
- 即時呼び出しによる密結合を減らしたいとき

## 構成要素（役割）
- Publisher: イベント発行者
- Queue: イベント保存先
- Consumer: フレーム単位の処理者

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using System.Collections.Generic;
using UnityEngine;

public readonly struct CombatEvent
{
    public readonly string EventType;
    public readonly int Value;

    public CombatEvent(string eventType, int value)
    {
        EventType = eventType;
        Value = value;
    }
}

public sealed class CombatEventQueue : MonoBehaviour
{
    private readonly Queue<CombatEvent> pendingEvents = new();

    public void Publish(CombatEvent combatEvent)
    {
        pendingEvents.Enqueue(combatEvent);
    }

    private void Update()
    {
        while (pendingEvents.Count > 0)
        {
            CombatEvent combatEvent = pendingEvents.Dequeue();
            Debug.Log($"${combatEvent.EventType}: ${combatEvent.Value}");
        }
    }
}
```

## 長所
- 生産者と消費者のタイミングを分離でき、システム間の直接依存を減らせます。
- イベントログ、リプレイ、バッチ処理のような拡張がしやすくなります。

## 注意点
- キューが詰まると遅延が発生し、応答性が落ちることがあります。
- 順序や重複処理のルールが曖昧だと、再現しづらいバグにつながります。

## 動作ダイアグラム

生産者と消費者をキューで分離して非同期に受け渡す流れです。

```d2 title="Event Queue の流れ"
direction: right

producers: {
  label: "Producers"
  combat: "CombatSystem"
  ai: "AISystem"
  loot: "LootSystem"
}

queue: "Event Queue"

consumers: {
  label: "Consumers"
  ui: "UISystem"
  audio: "AudioSystem"
  analytics: "AnalyticsSystem"
}

combat -> queue: "enqueue"
ai -> queue: "enqueue"
loot -> queue: "enqueue"
queue -> ui: "dequeue"
queue -> audio: "dequeue"
queue -> analytics: "dequeue"
```
