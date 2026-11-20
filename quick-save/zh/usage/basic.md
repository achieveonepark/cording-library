> For AI agents: the complete documentation index is available at /quick-save/zh/llms.txt, the full documentation bundle is available at /quick-save/zh/llms-full.txt.

# 基本用法

## 准备数据类

Quick Save 使用 `MemoryPack` 进行序列化，因此要保存的类需要满足两个条件。

- `[MemoryPackable]` 特性
- `partial` 关键字

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
> `QuickSave<T>` 的泛型约束是 `where T : class`。不支持结构体（struct）。
> 


## 用 Builder 创建实例

```csharp
var save = new QuickSave<InventoryData>.Builder().Build();
```

调用 `Build()` 时，如果保存目录（`persistentDataPath/quicksave/`）不存在会自动创建。之后调用 `SaveData` / `LoadData` 时不会再产生目录检查开销。

## SaveData

```csharp
var inventory = new InventoryData
{
    Items = new List<string> { "Sword", "Shield" },
    Capacity = 20
};

save.SaveData(inventory);
```

文件会保存到 `{persistentDataPath}/quicksave/InventoryData.acqs`。

## HasSaveData

在读取前确认文件是否存在。

```csharp
if (save.HasSaveData())
{
    // 仅在文件存在时读取
}
```

## LoadData

```csharp
InventoryData loaded = save.LoadData();
```

- 文件不存在时返回 `null`。
- 文件存在但反序列化失败时会抛出 `InvalidDataException`。可以区分“文件不存在”和“文件损坏”分别处理。

```csharp
try
{
    var data = save.LoadData();
    if (data == null)
    {
        // 没有存档文件 → 使用默认值
    }
}
catch (InvalidDataException e)
{
    Debug.LogError($"存档文件损坏: {e.Message}");
    save.DeleteData(); // 删除损坏文件后重新开始
}
```

## DeleteData

```csharp
save.DeleteData();
```

文件不存在时不执行任何操作。（无异常）

## 在编辑器中删除存档文件

使用 Unity 编辑器菜单 **Achieve > Delete Save**，可以删除 `quicksave/` 目录中所有 `.acqs` 文件。删除前会显示确认对话框。
