---
title: Observer
---

# Observer

## パターン一言説明
発行者の状態変化が購読者へ自動通知されるようにするリアクティブパターンです。

## Unity でよく使う状況
- 体力変化に UI、サウンド、実績を同時に反応させたいとき
- 疎結合なイベント接続が必要なとき

## 構成要素（役割）
- Subject
- Observer
- Subscribe / Unsubscribe

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using System;

public sealed class HealthModel
{
    public event Action<int, int> HealthChanged;

    public void SetHealth(int currentHealth, int maxHealth)
    {
        HealthChanged?.Invoke(currentHealth, maxHealth);
    }
}

public sealed class HealthBarPresenter
{
    public void Bind(HealthModel healthModel)
    {
        healthModel.HealthChanged += OnHealthChanged;
    }

    private void OnHealthChanged(int currentHealth, int maxHealth) { }
}
```

## 長所
- 振る舞いを分離できるため、変更の影響範囲を小さくできます。
- ルールの追加や差し替えを比較的安全に行えます。

## 注意点
- オブジェクト数や間接呼び出しが増えると、流れを追いにくくなります。
- 実行順序のバグはテストで固定しておく必要があります。

## 動作ダイアグラム

主体の状態変化が購読者へ自動的に伝播する流れです。

```d2 title="Observer の流れ"
direction: right

subject: "HealthModel"
notify: "Notify()"

observers: {
  label: "Observers"
  hpbar: "HealthBar"
  sfx: "DamageFX"
  achievement: "AchievementTracker"
}

subject -> notify: "health changed"
notify -> hpbar
notify -> sfx
notify -> achievement
```
