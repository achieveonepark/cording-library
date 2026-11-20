> For AI agents: the complete documentation index is available at /data-protector/ja/llms.txt, the full documentation bundle is available at /data-protector/ja/llms-full.txt.

# はじめに

## インストール

以下のいずれかの方法を選択します。

:::tip
GitHub URL の `#` 以降のバージョンを確認してください。Changelog の最新の変更に対応するバージョンを指定できます。
:::

### Unity Package Manager (UPM)

1. UPM を開き、左上の `+` ボタンをクリックします。
2. `Install package from git URL...` を選択します。
3. `https://github.com/achieveonepark/DataProtector.git#1.0.0` を入力して Install を押します。

### 手動追加

Unity プロジェクトの `Packages/manifest.json` を開き、`dependencies` に次の行を追加します。

```json
"com.achieve.data-protector": "https://github.com/achieveonepark/DataProtector.git#1.0.0"
```

## 基本的な使い方

16 バイトのキーでデータを暗号化・復号します。

```csharp
using Achieve.DataProtector;

string key = "1234567890123456"; // 16 バイトのキー

var encrypted = DataProtector.Encrypt(originalBytes, key);
var decrypted = DataProtector.Decrypt(encrypted, key);
```

詳細なメソッドは [API](/data-protector/ja/api.md) を参照してください。
