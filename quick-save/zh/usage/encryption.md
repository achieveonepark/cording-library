> For AI agents: the complete documentation index is available at /quick-save/zh/llms.txt, the full documentation bundle is available at /quick-save/zh/llms-full.txt.

# 加密与版本管理

## 前置准备

加密功能仅在安装了 [DataProtector](https://github.com/achieveonepark/DataProtector) 包时才会启用。

安装 DataProtector 后，Assembly Definition 会自动定义 `USE_ENCRYPT` 符号，Builder 的 `UseEncryption()`、`UseVersion()` 方法会被纳入编译。

## UseEncryption

```csharp
var save = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-secret-key-32chars")
    .Build();
```

- 调用 `SaveData` / `SaveDataAsync` 时，先把序列化后的二进制加密再保存。
- 调用 `LoadData` / `LoadDataAsync` 时，先解密文件再反序列化。


> **Warning**
> 
> 请把加密密钥保存在安全的地方。密钥改变后将无法读取已有的存档文件。
> 


## UseVersion

指定版本后，文件名会包含版本号。游戏更新时可以把旧版本与新版本的存档文件分开管理。

```csharp
var saveV1 = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-key")
    .UseVersion(1)
    .Build();

var saveV2 = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-key")
    .UseVersion(2)
    .Build();
```

存档文件路径：

```
{persistentDataPath}/quicksave/PlayerData_1.acqs   ← v1
{persistentDataPath}/quicksave/PlayerData_2.acqs   ← v2
```

## 迁移模式

将旧版本存档迁移到新版本的示例。

```csharp
var oldSave = new QuickSave<PlayerDataV1>.Builder()
    .UseEncryption("my-key")
    .UseVersion(1)
    .Build();

var newSave = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-key")
    .UseVersion(2)
    .Build();

if (oldSave.HasSaveData() && !newSave.HasSaveData())
{
    PlayerDataV1 legacy = oldSave.LoadData();
    PlayerData migrated = Migrate(legacy);
    newSave.SaveData(migrated);
    oldSave.DeleteData();
}
```

## 不带版本，仅使用加密

如果不调用 `UseVersion`，版本会按默认值 `0` 处理，文件名为 `TypeName_0.acqs`。

```csharp
var save = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-key")
    // 未调用 UseVersion → _0.acqs
    .Build();
```
