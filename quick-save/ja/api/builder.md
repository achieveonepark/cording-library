> For AI agents: the complete documentation index is available at /quick-save/ja/llms.txt, the full documentation bundle is available at /quick-save/ja/llms-full.txt.

# Builder

`QuickSave<T>.Builder` は `QuickSave<T>` インスタンスを生成するためのビルダークラスです。

```csharp
var save = new QuickSave<T>.Builder()
    /* オプションメソッド */
    .Build();
```

## メソッド

### Build()

```csharp
public QuickSave<T> Build()
```

設定を適用して `QuickSave<T>` インスタンスを返します。この時点で保存ディレクトリがなければ自動的に作成されます。

### UseEncryption(string encryptionKey)

```csharp
public Builder UseEncryption(string encryptionKey)
```


> **Info**
> 
> `USE_ENCRYPT` シンボルが定義されている場合のみ使用できます（DataProtector のインストールが必要）。
> 


保存時の暗号化、読み込み時の復号を有効にします。

| パラメーター          | 型        | 説明          |
| --------------- | -------- | ----------- |
| `encryptionKey` | `string` | 暗号化/復号に使うキー |

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
> `USE_ENCRYPT` シンボルが定義されている場合のみ使用できます。
> 


保存ファイル名にバージョン番号を含めます。既定値は `0` です。

| パラメーター    | 型     | 説明                |
| --------- | ----- | ----------------- |
| `version` | `int` | ファイル名に付与するバージョン番号 |

```csharp
new QuickSave<PlayerData>.Builder()
    .UseEncryption("your-secret-key")
    .UseVersion(2)
    .Build();
// → PlayerData_2.acqs
```
