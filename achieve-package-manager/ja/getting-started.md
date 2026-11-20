> For AI agents: the complete documentation index is available at /achieve-package-manager/ja/llms.txt, the full documentation bundle is available at /achieve-package-manager/ja/llms-full.txt.

# はじめに

## インストール

### Unity Package Manager で Git URL から追加（推奨）

`Window > Package Manager` → 左上の **+** → **Add package from git URL...** を選択して入力:

```
https://github.com/achieveonepark/achieve-package-manager.git
```

特定のバージョンに固定するにはタグを付けます。

```
https://github.com/achieveonepark/achieve-package-manager.git#1.0.0
```

### manifest.json に直接追加

`<Project>/Packages/manifest.json` の `dependencies` に追加します。

```json
{
  "dependencies": {
    "com.achieve.achieve-package-manager": "https://github.com/achieveonepark/achieve-package-manager.git"
  }
}
```

### 要件

- Unity **2022.3** 以降
- `com.unity.nuget.newtonsoft-json`、`com.unity.serialization`（依存関係として自動インストール）
- ネットワークアクセス（OpenUPM カタログの照会、Git ダウンロード用）

## ウィンドウを開く

Unity メニューから:

```
Tools > Achieve Package Manager
```

## レイアウト

- **ツールバー**: 更新、検索、マニフェストファイルの場所を開く
- **サイドバー**: 4 つのカテゴリタブ
- **ステータスバー**: インストール済みパッケージ数 / 更新状態

## 4 つのタブの概要

| タブ                                                              | 用途                                 |
| --------------------------------------------------------------- | ---------------------------------- |
| [Installed](/achieve-package-manager/ja/usage/installed.md)     | 現在のマニフェストのパッケージ / 未解決項目の表示・削除      |
| [OpenUPM](/achieve-package-manager/ja/usage/openupm.md)         | OpenUPM レジストリ全体の閲覧・インストール          |
| [Featured (Git)](/achieve-package-manager/ja/usage/featured.md) | キュレーションされた Git パッケージをワンクリックでインストール |
| [Custom Git URL](/achieve-package-manager/ja/usage/git-url.md)  | 任意の Git URL を入力してインストール            |

## 検索と更新

- ツールバーの**検索**はアクティブなタブのリストに適用されます。
- `↻ Refresh` は Unity パッケージリスト（`Client.List`）を再取得し、OpenUPM カタログを強制的に再ダウンロードします。OpenUPM カタログはセッション内で自動的にキャッシュされます。

詳しい使い方は [使い方](/achieve-package-manager/ja/usage/installed.md) を参照してください。
