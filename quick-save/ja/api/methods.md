> For AI agents: the complete documentation index is available at /quick-save/ja/llms.txt, the full documentation bundle is available at /quick-save/ja/llms-full.txt.

# QuickSave<T> メソッド

`QuickSave<T>` の公開メソッドリファレンスです。


> **Info**
> 
> ジェネリック制約: `where T : class`
> 


## SaveData

```csharp
public void SaveData(T data)
```

`data` を MemoryPack でシリアライズしてファイルに保存します。暗号化が有効な場合はシリアライズ後に暗号化します。

| パラメーター | 型   | 説明         |
| ------ | --- | ---------- |
| `data` | `T` | 保存するオブジェクト |

```csharp
save.SaveData(player);
```

## SaveDataAsync

```csharp
public Task SaveDataAsync(T data)
```

`SaveData` の非同期版です。メインスレッドをブロックしません。

```csharp
await save.SaveDataAsync(player);
```

## LoadData

```csharp
public T LoadData()
```

保存ファイルを読み込み、デシリアライズしたオブジェクトを返します。

| 戻り値                       | 条件                  |
| ------------------------- | ------------------- |
| `T` インスタンス                | 正常に読み込み             |
| `null`                    | ファイルなし              |
| `InvalidDataException` 発生 | ファイルは存在するがデシリアライズ失敗 |

```csharp
try
{
    var data = save.LoadData();
    if (data == null) { /* ファイルなし */ }
}
catch (InvalidDataException e)
{
    Debug.LogError(e.Message); // ファイル破損
}
```

## LoadDataAsync

```csharp
public Task<T> LoadDataAsync()
```

`LoadData` の非同期版です。

```csharp
var data = await save.LoadDataAsync();
```

## HasSaveData

```csharp
public bool HasSaveData()
```

保存ファイルが存在すれば `true`、なければ `false` を返します。`LoadData` の前にファイルの有無を確認するときに使用します。

```csharp
if (save.HasSaveData())
{
    var data = save.LoadData();
}
```

## DeleteData

```csharp
public void DeleteData()
```

保存ファイルを削除します。ファイルがなければ何もしません。

```csharp
save.DeleteData();
```
