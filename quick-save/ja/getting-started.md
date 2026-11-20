> For AI agents: the complete documentation index is available at /quick-save/ja/llms.txt, the full documentation bundle is available at /quick-save/ja/llms-full.txt.

# はじめに

## 事前準備: MemoryPack のインストール

Quick Save は MemoryPack に依存します。まず [NuGetForUnity](https://github.com/GlitchEnzo/NuGetForUnity) を通じて MemoryPack をインストールしてください。

1. NuGetForUnity をプロジェクトにインストールします。
2. Unity メニューから **NuGet > Manage NuGet Packages** を開きます。
3. `MemoryPack` を検索してインストールします。

## インストール

### Unity Package Manager (UPM) — 推奨

1. **Window > Package Manager** を開きます。
2. 左上の `+` ボタン → **Add package from git URL...** を選択します。
3. 以下の URL を入力して **Add** をクリックします。

```
https://github.com/achieveonepark/QuickSave.git#1.0.3
```

### manifest.json を直接編集

`Packages/manifest.json` の `dependencies` に追加します。

```json
{
  "dependencies": {
    "com.achieve.quick-save": "https://github.com/achieveonepark/QuickSave.git#1.0.3"
  }
}
```


> **Info**
> 
> 暗号化が必要な場合は [DataProtector](https://github.com/achieveonepark/DataProtector) パッケージも追加でインストールしてください。DataProtector があると `USE_ENCRYPT` シンボルが自動的に定義され、`UseEncryption()`、`UseVersion()` メソッドが有効になります。詳細は [使い方 › 暗号化 & バージョン管理](/quick-save/ja/usage/encryption.md) を参照してください。
> 


## クイックスタート

### 1. 保存するデータクラスを定義

MemoryPack でシリアライズするクラスに `[MemoryPackable]` 属性と `partial` キーワードを付けます。

```csharp
using MemoryPack;

[MemoryPackable]
public partial class PlayerData
{
    public string Name;
    public int Level;
    public float HP;
    public long Gold;
}
```

### 2. QuickSave インスタンスの生成

`Builder` パターンでインスタンスを生成します。生成時に保存ディレクトリ（`persistentDataPath/quicksave/`）も一緒に準備されます。

```csharp
using Achieve.QuickSave;

var save = new QuickSave<PlayerData>.Builder().Build();
```

### 3. 保存・読み込み・削除

```csharp
var player = new PlayerData { Name = "Hero", Level = 1, HP = 100f, Gold = 0 };

save.SaveData(player);                 // 保存

if (save.HasSaveData())                // 存在確認
{
    PlayerData loaded = save.LoadData(); // 読み込み
    Debug.Log(loaded.Name);            // "Hero"
}

save.DeleteData();                     // 削除
```

## 次のステップ

- [使い方 › 基本的な使い方](/quick-save/ja/usage/basic.md)
- [API › QuickSave\<T> メソッド](/quick-save/ja/api/methods.md)
