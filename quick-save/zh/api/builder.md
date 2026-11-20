> For AI agents: the complete documentation index is available at /quick-save/zh/llms.txt, the full documentation bundle is available at /quick-save/zh/llms-full.txt.

# Builder

`QuickSave<T>.Builder` 是用于创建 `QuickSave<T>` 实例的构建者类。

```csharp
var save = new QuickSave<T>.Builder()
    /* 选项方法 */
    .Build();
```

## 方法

### Build()

```csharp
public QuickSave<T> Build()
```

应用配置并返回 `QuickSave<T>` 实例。此时如果保存目录不存在会自动创建。

### UseEncryption(string encryptionKey)

```csharp
public Builder UseEncryption(string encryptionKey)
```


> **Info**
> 
> 仅在定义了 `USE_ENCRYPT` 符号时可用（需要安装 DataProtector）。
> 


启用保存时加密、读取时解密。

| 参数              | 类型       | 说明         |
| --------------- | -------- | ---------- |
| `encryptionKey` | `string` | 用于加密/解密的密钥 |

```csharp
new QuickSave<PlayerData>.Builder()
    .UseEncryption("your-secret-key")
    .Build();
```

### UseVersion(int version)

```csharp
public Builder UseVersion(int version)
```


> **Info**
> 
> 仅在定义了 `USE_ENCRYPT` 符号时可用。
> 


在存档文件名中包含版本号。默认值为 `0`。

| 参数        | 类型    | 说明         |
| --------- | ----- | ---------- |
| `version` | `int` | 附加到文件名的版本号 |

```csharp
new QuickSave<PlayerData>.Builder()
    .UseEncryption("your-secret-key")
    .UseVersion(2)
    .Build();
// → PlayerData_2.acqs
```
