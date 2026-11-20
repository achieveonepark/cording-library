> For AI agents: the complete documentation index is available at /quick-save/zh/llms.txt, the full documentation bundle is available at /quick-save/zh/llms-full.txt.

# 快速开始

## 前置准备：安装 MemoryPack

Quick Save 依赖 MemoryPack。请先通过 [NuGetForUnity](https://github.com/GlitchEnzo/NuGetForUnity) 安装 MemoryPack。

1. 在项目中安装 NuGetForUnity。
2. 在 Unity 菜单中打开 **NuGet > Manage NuGet Packages**。
3. 搜索 `MemoryPack` 并安装。

## 安装

### Unity Package Manager (UPM) — 推荐

1. 打开 **Window > Package Manager**。
2. 点击左上角的 `+` 按钮 → 选择 **Add package from git URL...**。
3. 输入下面的 URL 并点击 **Add**。

```
https://github.com/achieveonepark/QuickSave.git#1.0.3
```

### 直接编辑 manifest.json

在 `Packages/manifest.json` 的 `dependencies` 中添加。

```json
{
  "dependencies": {
    "com.achieve.quick-save": "https://github.com/achieveonepark/QuickSave.git#1.0.3"
  }
}
```


> **Info**
> 
> 如果需要加密，请额外安装 [DataProtector](https://github.com/achieveonepark/DataProtector) 包。当存在 DataProtector 时，会自动定义 `USE_ENCRYPT` 符号，从而启用 `UseEncryption()`、`UseVersion()` 方法。详情请参阅 [使用方法 › 加密与版本管理](/quick-save/zh/usage/encryption.md)。
> 


## 快速上手

### 1. 定义要保存的数据类

为要用 MemoryPack 序列化的类添加 `[MemoryPackable]` 特性和 `partial` 关键字。

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

### 2. 创建 QuickSave 实例

用 `Builder` 模式创建实例。创建时会一并准备保存目录（`persistentDataPath/quicksave/`）。

```csharp
using Achieve.QuickSave;

var save = new QuickSave<PlayerData>.Builder().Build();
```

### 3. 保存、读取、删除

```csharp
var player = new PlayerData { Name = "Hero", Level = 1, HP = 100f, Gold = 0 };

save.SaveData(player);                 // 保存

if (save.HasSaveData())                // 检查是否存在
{
    PlayerData loaded = save.LoadData(); // 读取
    Debug.Log(loaded.Name);            // "Hero"
}

save.DeleteData();                     // 删除
```

## 后续步骤

- [使用方法 › 基本用法](/quick-save/zh/usage/basic.md)
- [API › QuickSave\<T> 方法](/quick-save/zh/api/methods.md)
