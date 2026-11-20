> For AI agents: the complete documentation index is available at /AchEngine/ja/llms.txt, the full documentation bundle is available at /AchEngine/ja/llms-full.txt.

# はじめに

AchEngine のコア機能を 5 分で体験するガイドです。

## 1. DI スコープの設定

シーンに空の GameObject を作成し、`AchEngineScope` コンポーネントを追加します。

```
Hierarchy
└── [AchEngineScope]   ← AchEngineScope コンポーネントを追加
```

## 2. Installer の作成

```csharp
using AchEngine.DI;
using UnityEngine;

public class GameInstaller : AchEngineInstaller
{
    public override void Install(IServiceBuilder builder)
    {
        builder
            .Register<IGameService, GameService>()
            .Register<IPlayerService, PlayerService>(ServiceLifetime.Transient);
    }
}
```

`AchEngineScope` Inspector の **Installers** 配列に `GameInstaller` をドラッグします。

## 3. UI Root の作成

**Project Settings › AchEngine › UI Workspace** で **UI Root 生成** ボタンをクリックするか、シーンに `UIRoot` プレハブを配置します。

## 4. UIView の定義

```csharp
using AchEngine.UI;

public class MainMenuView : UIView
{
    protected override void OnInitialize()
    {
        // 最初の生成時に 1 回呼ばれる
    }

    protected override void OnOpened()
    {
        // Show() 後、トランジション完了時に呼ばれる
    }

    protected override void OnClosed()
    {
        // Close() 後、プールに返却される
    }
}
```

## 5. View の表示

```csharp
// [Inject] を使用（VContainer が必要）
[Inject] readonly IUIService _ui;
_ui.Show<MainMenuView>();

// ServiceLocator を使用（MonoBehaviour など）
ServiceLocator.Resolve<IUIService>().Show("MainMenu");

// 閉じる
_ui.Close<MainMenuView>();
```

## 6. テーブルデータの読み込み

```csharp
// TableManager を通じて型安全にアクセス
var itemTable = TableManager.Get<ItemTable>();
var sword = itemTable.Get(101);
Debug.Log(sword.Name); // "Iron Sword"
```

## 次のステップ

各モジュールの詳しい説明は左のサイドバーから確認してください。

- [DI システム](/AchEngine/ja/usage/di.md)
- [UI System](/AchEngine/ja/usage/ui.md)
- [Table Loader](/AchEngine/ja/usage/table.md)
- [Addressables](/AchEngine/ja/usage/addressables.md)
- [Localization](/AchEngine/ja/usage/localization.md)
- [モジュール連携ガイド](/AchEngine/ja/usage/integration.md)
