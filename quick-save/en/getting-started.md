> For AI agents: the complete documentation index is available at /quick-save/en/llms.txt, the full documentation bundle is available at /quick-save/en/llms-full.txt.

# Getting Started

## Prerequisite: install MemoryPack

Quick Save depends on MemoryPack. First, install MemoryPack via [NuGetForUnity](https://github.com/GlitchEnzo/NuGetForUnity).

1. Install NuGetForUnity in your project.
2. Open **NuGet > Manage NuGet Packages** from the Unity menu.
3. Search for `MemoryPack` and install it.

## Installation

### Unity Package Manager (UPM) — recommended

1. Open **Window > Package Manager**.
2. Click the `+` button in the top left → **Add package from git URL...**.
3. Enter the URL below and click **Add**.

```
https://github.com/achieveonepark/QuickSave.git#1.0.3
```

### Editing manifest.json directly

Add to `dependencies` in `Packages/manifest.json`.

```json
{
  "dependencies": {
    "com.achieve.quick-save": "https://github.com/achieveonepark/QuickSave.git#1.0.3"
  }
}
```


> **Info**
> 
> If you need encryption, also install the [DataProtector](https://github.com/achieveonepark/DataProtector) package. When DataProtector is present, the `USE_ENCRYPT` symbol is defined automatically, enabling the `UseEncryption()` and `UseVersion()` methods. See [Usage › Encryption & Versioning](/quick-save/en/usage/encryption.md) for details.
> 


## Quick start

### 1. Define the data class to save

Add the `[MemoryPackable]` attribute and the `partial` keyword to the class you want to serialize with MemoryPack.

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

### 2. Create a QuickSave instance

Create an instance with the `Builder` pattern. The save directory (`persistentDataPath/quicksave/`) is prepared at creation time.

```csharp
using Achieve.QuickSave;

var save = new QuickSave<PlayerData>.Builder().Build();
```

### 3. Save, load, delete

```csharp
var player = new PlayerData { Name = "Hero", Level = 1, HP = 100f, Gold = 0 };

save.SaveData(player);                 // save

if (save.HasSaveData())                // check existence
{
    PlayerData loaded = save.LoadData(); // load
    Debug.Log(loaded.Name);            // "Hero"
}

save.DeleteData();                     // delete
```

## Next steps

- [Usage › Basic Usage](/quick-save/en/usage/basic.md)
- [API › QuickSave\<T> Methods](/quick-save/en/api/methods.md)
