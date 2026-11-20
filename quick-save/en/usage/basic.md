> For AI agents: the complete documentation index is available at /quick-save/en/llms.txt, the full documentation bundle is available at /quick-save/en/llms-full.txt.

# Basic Usage

## Preparing a Data Class

Two requirements for the class you want to serialize with MemoryPack:

- `[MemoryPackable]` attribute
- `partial` keyword

```csharp
using MemoryPack;

[MemoryPackable]
public partial class InventoryData
{
    public List<string> Items;
    public int Capacity;
}
```

> The generic constraint on `QuickSave<T>` is `where T : class`. Structs are not supported.

***

## Creating an Instance via Builder

```csharp
var save = new QuickSave<InventoryData>.Builder().Build();
```

When `Build()` is called, the save directory (`persistentDataPath/quicksave/`) is created if it doesn't exist. Subsequent calls to `SaveData` / `LoadData` incur no directory check overhead.

***

## SaveData

```csharp
var inventory = new InventoryData
{
    Items = new List<string> { "Sword", "Shield" },
    Capacity = 20
};

save.SaveData(inventory);
```

The file is saved at `{persistentDataPath}/quicksave/InventoryData.acqs`.

***

## HasSaveData

Check whether the save file exists before loading.

```csharp
if (save.HasSaveData())
{
    // Load only when a file exists
}
```

***

## LoadData

```csharp
InventoryData loaded = save.LoadData();
```

- Returns `null` if the file doesn't exist.
- Throws `InvalidDataException` if the file exists but deserialization fails — allowing you to distinguish between a missing file and a corrupted one.

```csharp
try
{
    var data = save.LoadData();
    if (data == null)
    {
        // No save file → use defaults
    }
}
catch (InvalidDataException e)
{
    Debug.LogError($"Save file corrupted: {e.Message}");
    save.DeleteData(); // Remove corrupted file and restart
}
```

***

## DeleteData

```csharp
save.DeleteData();
```

Does nothing if the file doesn't exist. No exception is thrown.

***

## Deleting Saves in the Editor

Use the Unity Editor menu **Achieve > Delete Save** to delete all `.acqs` files in the `quicksave/` directory. A confirmation dialog is shown before deletion.
