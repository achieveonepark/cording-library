> For AI agents: the complete documentation index is available at /quick-save/en/llms.txt, the full documentation bundle is available at /quick-save/en/llms-full.txt.

# Builder

`QuickSave<T>.Builder` is a builder class for constructing `QuickSave<T>` instances.

```csharp
var save = new QuickSave<T>.Builder()
    /* optional methods */
    .Build();
```

***

## Methods

### Build()

```csharp
public QuickSave<T> Build()
```

Applies the configuration and returns a `QuickSave<T>` instance. The save directory is created automatically at this point if it doesn't exist.

***

### UseEncryption(string encryptionKey)

```csharp
public Builder UseEncryption(string encryptionKey)
```

> Available only when the `USE_ENCRYPT` symbol is defined (requires DataProtector).

Enables encryption on save and decryption on load.

| Parameter       | Type     | Description                            |
| --------------- | -------- | -------------------------------------- |
| `encryptionKey` | `string` | Key used for encryption and decryption |

```csharp
new QuickSave<PlayerData>.Builder()
    .UseEncryption("your-secret-key")
    .Build();
```

***

### UseVersion(int version)

```csharp
public Builder UseVersion(int version)
```

> Available only when the `USE_ENCRYPT` symbol is defined.

Appends a version number to the save file name. Defaults to `0`.

| Parameter | Type  | Description                              |
| --------- | ----- | ---------------------------------------- |
| `version` | `int` | Version number appended to the file name |

```csharp
new QuickSave<PlayerData>.Builder()
    .UseEncryption("your-secret-key")
    .UseVersion(2)
    .Build();
// → PlayerData_2.acqs
```
