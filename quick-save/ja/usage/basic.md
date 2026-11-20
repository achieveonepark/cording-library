> For AI agents: the complete documentation index is available at /quick-save/ja/llms.txt, the full documentation bundle is available at /quick-save/ja/llms-full.txt.

# 基本的な使い方

## データクラスの準備

Quick Save は `MemoryPack` でシリアライズするため、保存するクラスに 2 つの条件が必要です。

- `[MemoryPackable]` 属性
- `partial` キーワード

```csharp
using MemoryPack;

[MemoryPackable]
public partial class InventoryData
{
    public List<string> Items;
    public int Capacity;
}
```


> **Info**
> 
> `QuickSave<T>` のジェネリック制約は `where T : class` です。構造体（struct）はサポートしていません。
> 


## Builder でインスタンスを生成

```csharp
var save = new QuickSave<InventoryData>.Builder().Build();
```

`Build()` 呼び出し時に保存ディレクトリ（`persistentDataPath/quicksave/`）がなければ自動的に作成されます。その後の `SaveData` / `LoadData` 呼び出しではディレクトリチェックのコストは発生しません。

## SaveData

```csharp
var inventory = new InventoryData
{
    Items = new List<string> { "Sword", "Shield" },
    Capacity = 20
};

save.SaveData(inventory);
```

ファイルは `{persistentDataPath}/quicksave/InventoryData.acqs` に保存されます。

## HasSaveData

読み込み前にファイルの存在を確認します。

```csharp
if (save.HasSaveData())
{
    // ファイルがある場合のみ読み込み
}
```

## LoadData

```csharp
InventoryData loaded = save.LoadData();
```

- ファイルがなければ `null` を返します。
- ファイルは存在するがデシリアライズに失敗した場合は `InvalidDataException` が発生します。ファイルなしとファイル破損を区別して処理できます。

```csharp
try
{
    var data = save.LoadData();
    if (data == null)
    {
        // 保存ファイルなし → デフォルト値を使用
    }
}
catch (InvalidDataException e)
{
    Debug.LogError($"保存ファイル破損: {e.Message}");
    save.DeleteData(); // 破損ファイルを削除して再起動
}
```

## DeleteData

```csharp
save.DeleteData();
```

ファイルが存在しない場合は何もしません。（例外なし）

## エディターから保存ファイルを削除

Unity エディターのメニュー **Achieve > Delete Save** を使うと、`quicksave/` ディレクトリ内のすべての `.acqs` ファイルを削除できます。削除前に確認ダイアログが表示されます。
