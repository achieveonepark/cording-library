> For AI agents: the complete documentation index is available at /quick-save/ja/llms.txt, the full documentation bundle is available at /quick-save/ja/llms-full.txt.

# 暗号化 & バージョン管理

## 事前準備

暗号化機能は [DataProtector](https://github.com/achieveonepark/DataProtector) パッケージがインストールされている場合のみ有効になります。

DataProtector をインストールすると、Assembly Definition が自動的に `USE_ENCRYPT` シンボルを定義し、Builder の `UseEncryption()`・`UseVersion()` メソッドがコンパイルに含まれます。

## UseEncryption

```csharp
var save = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-secret-key-32chars")
    .Build();
```

- `SaveData` / `SaveDataAsync` 呼び出し時、シリアライズしたバイナリを暗号化してから保存します。
- `LoadData` / `LoadDataAsync` 呼び出し時、ファイルを復号してからデシリアライズします。


> **Warning**
> 
> 暗号化キーは安全な場所に保管してください。キーが変わると既存の保存ファイルを読み込めなくなります。
> 


## UseVersion

バージョンを指定すると、ファイル名にバージョン番号が含まれます。ゲーム更新時に旧バージョンと新バージョンの保存ファイルを分けて運用できます。

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

保存ファイルのパス:

```
{persistentDataPath}/quicksave/PlayerData_1.acqs   ← v1
{persistentDataPath}/quicksave/PlayerData_2.acqs   ← v2
```

## マイグレーションパターン

旧バージョンの保存ファイルを新バージョンへ移行する例です。

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

## バージョンなしで暗号化のみ使用

`UseVersion` を呼び出さない場合、バージョンは既定値 `0` として扱われ、ファイル名は `TypeName_0.acqs` になります。

```csharp
var save = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-key")
    // UseVersion 未呼び出し → _0.acqs
    .Build();
```
