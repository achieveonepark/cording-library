---
title: Singleton
---

# Singleton

## パターン一言説明
インスタンスを 1 つだけ維持し、グローバルなアクセスポイントを提供するパターンです。

## Unity でよく使う状況
- ゲーム設定やログのように単一サービスが必要なとき
- シーン間で維持されるマネージャーを置くとき

## 構成要素（役割）
- Singleton Instance
- Global Accessor
- Lifetime Guard

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using UnityEngine;

public sealed class GameSettingsService : MonoBehaviour
{
    public static GameSettingsService Instance { get; private set; }

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }

        Instance = this;
        DontDestroyOnLoad(gameObject);
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

複数の呼び出し元が同じインスタンスを共有する流れです。

```d2 title="Singleton の流れ"
direction: right

callers: {
  label: "Callers"
  ui: "UISystem"
  gameplay: "GameplaySystem"
  audio_user: "CutsceneSystem"
}

singleton: "AudioManager.Instance"
instance: "Single Object"

ui -> singleton
gameplay -> singleton
audio_user -> singleton
singleton -> instance: "create once"
instance -> ui: "shared"
instance -> gameplay: "shared"
instance -> audio_user: "shared"
```
