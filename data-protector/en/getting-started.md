> For AI agents: the complete documentation index is available at /data-protector/en/llms.txt, the full documentation bundle is available at /data-protector/en/llms-full.txt.

# Getting Started

## Installation

Choose one of the following methods.

:::tip
Check the version after `#` in the GitHub URL. You can pin the version that matches the latest changes in the Changelog.
:::

### Unity Package Manager (UPM)

1. Open UPM and click the `+` button in the top left.
2. Select `Install package from git URL...`.
3. Enter `https://github.com/achieveonepark/DataProtector.git#1.0.0` and click Install.

### Manual addition

Open `Packages/manifest.json` in your Unity project and add the following line under `dependencies`.

```json
"com.achieve.data-protector": "https://github.com/achieveonepark/DataProtector.git#1.0.0"
```

## Basic usage

Encrypt and decrypt data with a 16-byte key.

```csharp
using Achieve.DataProtector;

string key = "1234567890123456"; // 16-byte key

var encrypted = DataProtector.Encrypt(originalBytes, key);
var decrypted = DataProtector.Decrypt(encrypted, key);
```

See the [API](/data-protector/en/api.md) for detailed methods.
