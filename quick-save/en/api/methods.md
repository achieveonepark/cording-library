> For AI agents: the complete documentation index is available at /quick-save/en/llms.txt, the full documentation bundle is available at /quick-save/en/llms-full.txt.

# QuickSave<T> Methods

Public method reference for `QuickSave<T>`.

> Generic constraint: `where T : class`

***

## SaveData

```csharp
public void SaveData(T data)
```

Serializes `data` with MemoryPack and writes it to a file. If encryption is enabled, the binary is encrypted after serialization.

| Parameter | Type | Description        |
| --------- | ---- | ------------------ |
| `data`    | `T`  | The object to save |

```csharp
save.SaveData(player);
```

***

## SaveDataAsync

```csharp
public Task SaveDataAsync(T data)
```

Async version of `SaveData`. Does not block the main thread.

```csharp
await save.SaveDataAsync(player);
```

***

## LoadData

```csharp
public T LoadData()
```

Reads the save file and returns the deserialized object.

| Return value                  | Condition                             |
| ----------------------------- | ------------------------------------- |
| `T` instance                  | Successfully loaded                   |
| `null`                        | File does not exist                   |
| Throws `InvalidDataException` | File exists but deserialization fails |

```csharp
try
{
    var data = save.LoadData();
    if (data == null) { /* no file */ }
}
catch (InvalidDataException e)
{
    Debug.LogError(e.Message); // corrupted file
}
```

***

## LoadDataAsync

```csharp
public Task<T> LoadDataAsync()
```

Async version of `LoadData`.

```csharp
var data = await save.LoadDataAsync();
```

***

## HasSaveData

```csharp
public bool HasSaveData()
```

Returns `true` if the save file exists, `false` otherwise. Use this to check for a file before calling `LoadData`.

```csharp
if (save.HasSaveData())
{
    var data = save.LoadData();
}
```

***

## DeleteData

```csharp
public void DeleteData()
```

Deletes the save file. Does nothing if the file doesn't exist.

```csharp
save.DeleteData();
```
