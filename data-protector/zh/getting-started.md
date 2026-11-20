> For AI agents: the complete documentation index is available at /data-protector/zh/llms.txt, the full documentation bundle is available at /data-protector/zh/llms-full.txt.

# 快速开始

## 安装

选择以下方法之一。

:::tip
请检查 GitHub URL 中 `#` 之后的版本。你可以固定到与 Changelog 中最新更改对应的版本。
:::

### Unity Package Manager (UPM)

1. 打开 UPM，点击左上角的 `+` 按钮。
2. 选择 `Install package from git URL...`。
3. 输入 `https://github.com/achieveonepark/DataProtector.git#1.0.0` 并点击 Install。

### 手动添加

打开 Unity 项目的 `Packages/manifest.json`，在 `dependencies` 下添加以下行。

```json
"com.achieve.data-protector": "https://github.com/achieveonepark/DataProtector.git#1.0.0"
```

## 基本用法

用 16 字节的密钥对数据进行加密和解密。

```csharp
using Achieve.DataProtector;

string key = "1234567890123456"; // 16 字节密钥

var encrypted = DataProtector.Encrypt(originalBytes, key);
var decrypted = DataProtector.Decrypt(encrypted, key);
```

详细方法请参阅 [API](/data-protector/zh/api.md)。
