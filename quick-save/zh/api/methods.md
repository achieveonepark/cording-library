> For AI agents: the complete documentation index is available at /quick-save/zh/llms.txt, the full documentation bundle is available at /quick-save/zh/llms-full.txt.

# QuickSave<T> 方法

`QuickSave<T>` 的公开方法参考。


> **Info**
> 
> 泛型约束：`where T : class`
> 


## SaveData

```csharp
public void SaveData(T data)
```

将 `data` 用 MemoryPack 序列化并保存到文件。启用加密时，序列化后会进行加密。

| 参数     | 类型  | 说明     |
| ------ | --- | ------ |
| `data` | `T` | 要保存的对象 |

```csharp
save.SaveData(player);
```

## SaveDataAsync

```csharp
public Task SaveDataAsync(T data)
```

`SaveData` 的异步版本。不阻塞主线程。

```csharp
await save.SaveDataAsync(player);
```

## LoadData

```csharp
public T LoadData()
```

读取存档文件并返回反序列化后的对象。

| 返回值                       | 条件          |
| ------------------------- | ----------- |
| `T` 实例                    | 正常读取        |
| `null`                    | 文件不存在       |
| 抛出 `InvalidDataException` | 文件存在但反序列化失败 |

```csharp
try
{
    var data = save.LoadData();
    if (data == null) { /* 文件不存在 */ }
}
catch (InvalidDataException e)
{
    Debug.LogError(e.Message); // 文件损坏
}
```

## LoadDataAsync

```csharp
public Task<T> LoadDataAsync()
```

`LoadData` 的异步版本。

```csharp
var data = await save.LoadDataAsync();
```

## HasSaveData

```csharp
public bool HasSaveData()
```

存档文件存在时返回 `true`，否则返回 `false`。用于在 `LoadData` 之前确认文件是否存在。

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

删除存档文件。文件不存在时不执行任何操作。

```csharp
save.DeleteData();
```
