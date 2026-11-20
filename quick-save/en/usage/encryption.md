> For AI agents: the complete documentation index is available at /quick-save/en/llms.txt, the full documentation bundle is available at /quick-save/en/llms-full.txt.

# Encryption & Versioning

## Prerequisites

The encryption feature is only active when the [DataProtector](https://github.com/achieveonepark/DataProtector) package is installed.

Once DataProtector is installed, the Assembly Definition automatically defines the `USE_ENCRYPT` symbol, and the Builder's `UseEncryption()` and `UseVersion()` methods become available.

***

## UseEncryption

```csharp
var save = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-secret-key-32chars")
    .Build();
```

- `SaveData` / `SaveDataAsync`: serializes then encrypts before writing.
- `LoadData` / `LoadDataAsync`: decrypts then deserializes.

> Keep your encryption key safe. Changing the key will make existing save files unreadable.

***

## UseVersion

Specifying a version appends the version number to the file name, letting you separate saves across game updates.

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

Resulting file paths:

```
{persistentDataPath}/quicksave/PlayerData_1.acqs   ← v1
{persistentDataPath}/quicksave/PlayerData_2.acqs   ← v2
```

***

## Migration Pattern

Example of migrating from an old version's save file to a new one.

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

***

## Encryption Only (No Version)

If `UseVersion` is not called, the version defaults to `0` and the file name becomes `TypeName_0.acqs`.

```csharp
var save = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-key")
    // UseVersion not called → _0.acqs
    .Build();
```
