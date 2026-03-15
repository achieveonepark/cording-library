---
title: Game Framework
---

| [🪄GitHub へ移動](https://github.com/achieveonepark/game-framework)

# Game Framework

Unity でのゲーム開発を素早く進められるように設計された、
事前構築済みシステムと拡張機能のコレクションです。

このフレームワークは、さまざまなマネージャーやシステムを含む
中央静的クラス `GameFramework.Core` を基準に構成されています。

## UPM Installation

1. Unity Package Manager (`Window > Package Manager`) を開きます。
2. 左上の `+` アイコンをクリックし、`Add package from git URL...` を選びます。
3. 次の URL を入力します。  
   `https://github.com/achieveonepark/game-framework.git`

## Dependencies

このフレームワークは、全機能を使用するためにいくつかの外部パッケージへ依存しています。

### Required
- **[UniTask](https://github.com/Cysharp/UniTask):**  
  フレームワーク全体で非同期処理を扱うために必須です。  
  Game Framework パッケージをインストールする **前に必ず導入** してください。

### Optional
以下のパッケージは追加機能を有効にするため、必要に応じて導入できます。

- **[UniTaskPubSub](https://github.com/hadashiA/UniTaskPubSub):**  
  リアクティブ（イベントベース）UI のための `UIBindingManager` 機能を有効にします。
- **[QuickSave](https://github.com/achieveonepark/quicksave):**  
  `Core.Player` のデータ永続化機能を有効にします。  
  使用するには、プロジェクトの Scripting Define Symbols に `USE_QUICK_SAVE` を追加する必要があります。

## Features & API

フレームワーク内の大半のモジュールは、
静的クラス `GameFramework.Core` の入れ子クラスとして提供されます。

### Access Patterns
- **Static Classes**  
  直接アクセスします（例: `Core.Time.TimeScale`）
- **MonoBehaviour Singletons**  
  `Instance` プロパティ経由でアクセスします  
  （例: `Core.Sound.Instance.PlayBGM()`）  
  → 対応する GameObject がシーン内に存在している必要があります。

### System Modules
| クラス | アクセス方式 | 説明 |
| :--- | :--- | :--- |
| `Core.Log` | Static | さまざまなレベルのコンソールログ出力を処理します。 |
| `Core.Config` | Static | PlayerPrefs に保存されるキー・値設定を管理します。 |
| `Core.Player` | Static | Container ベースのランタイムプレイヤーデータ中央管理クラスです。 |
| `Core.Time` | Static | グローバルなタイムスケール制御と現在時刻の取得を行います。 |
| `Core.Scene` | Singleton | シーンのロードとアンロードを管理します。 |
| `Core.Popup` | Singleton | UI ポップアップの生成とライフサイクルを管理します。 |

### Other Features
- **ユーティリティおよび拡張メソッド**  
  Unity と C# の基本型に対するさまざまな拡張メソッドを提供します。  
  `Runtime/Extensions` フォルダを参照してください。
- **UI コンポーネント**  
  `SafeArea` や `Draggable` のような UI 補助コンポーネントを含みます。

## Quick Start Examples

### `Core.Log`
カテゴリ別のコンソールログを扱います。
```csharp
Core.Log.Debug("これはデバッグメッセージです。");
Core.Log.Info("重要な情報を出力するためのログです。");
Core.Log.Warning("問題が発生する可能性があります。");
```

### Core.Config

PlayerPrefs に保存される簡単なデータを管理します。

```csharp
// キーが存在しない場合は初期値を設定
Core.Config.AddKey("BGMVolume", 0.8f);

// 値の設定と取得
Core.Config.SetConfig("BGMVolume", 0.7f);
float currentVolume = (float)Core.Config.GetConfig("BGMVolume");
```

### Core.Player (データ管理)

コンテナクラスを通してランタイムデータを管理します。

1. データとコンテナを定義する

```csharp
// 実際のデータ構造
public class CharacterData : PlayerDataBase
{
    public string Name;
    public int Level;
}

// データを保持するコンテナ
public class CharacterDataContainer : PlayerDataContainerBase<int, CharacterData>
{
    public CharacterDataContainer()
    {
        // 重要: GetContainer<T> を使うために
        // DataKey は必ずクラス名と同じでなければなりません。
        DataKey = typeof(CharacterDataContainer).Name;
    }
}
```

2. コンテナを登録して使う

```csharp
// ゲーム開始時にコンテナを生成して登録
var characterContainer = new CharacterDataContainer();
characterContainer.Add(1, new CharacterData { Id = 1, Name = "Hero", Level = 1 });
Core.Player.AddContainer(characterContainer);

// 別の場所からデータを取得して利用
var myChars = Core.Player.GetContainer<CharacterDataContainer>();
var mainChar = myChars.GetInfo(1);
mainChar.Level++;

// 全データの保存 / 読み込み（USE_QUICK_SAVE が必要）
Core.Player.Save();
Core.Player.Load();
```

### Core.Popup (Singleton)

Core.Popup スクリプトとポップアッププレハブ一覧を持つ
PopupManager GameObject が必要です。

```csharp
// マネージャーに登録された特定タイプのポップアップを開く
// Open() は自動で呼ばれます。
var myPopup = Core.Popup.Instance.Open<MyAwesomePopup>();

// ポップアップを開くときにデータを渡す
var data = new MyPopupData { Message = "Hello!" };
Core.Popup.Instance.Open<MyAwesomePopup>(data);

// ポップアップを閉じる
myPopup.Close();
```

### Core.Time

Unity の Time と、Ping を使って取得した時刻の DateTime を包むラッパークラスです。

```csharp
// ゲーム速度を 2 倍に設定
Core.Time.TimeScale = 2.0f;

// 現在の実時間を取得
DateTime now = Core.Time.Now;
```
