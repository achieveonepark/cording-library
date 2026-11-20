> For AI agents: the complete documentation index is available at /quick-save/en/llms.txt, the full documentation bundle is available at /quick-save/en/llms-full.txt.

# Async Save / Load

## Why Async?

`SaveData` / `LoadData` use `File.WriteAllBytes` / `File.ReadAllBytes` internally. On large save files or slow storage (especially mobile), this can momentarily block the main thread.

`SaveDataAsync` / `LoadDataAsync` use `File.WriteAllBytesAsync` / `File.ReadAllBytesAsync` to avoid blocking the main thread.

***

## SaveDataAsync

```csharp
await save.SaveDataAsync(playerData);
```

***

## LoadDataAsync

```csharp
PlayerData loaded = await save.LoadDataAsync();

if (loaded == null)
{
    // No save file
}
```

***

## Full Example (async/await)

```csharp
using Achieve.QuickSave;
using UnityEngine;

public class SaveManager : MonoBehaviour
{
    private QuickSave<PlayerData> _save;

    void Awake()
    {
        _save = new QuickSave<PlayerData>.Builder().Build();
    }

    public async void OnSaveButtonClicked(PlayerData player)
    {
        await _save.SaveDataAsync(player);
        Debug.Log("Saved");
    }

    public async void OnLoadButtonClicked()
    {
        try
        {
            PlayerData data = await _save.LoadDataAsync();
            if (data == null)
                Debug.Log("No save data");
            else
                Debug.Log($"Loaded: {data.Name}");
        }
        catch (System.IO.InvalidDataException e)
        {
            Debug.LogError($"Save file corrupted: {e.Message}");
        }
    }
}
```

***

## Using with UniTask

If UniTask is in your project, you can convert `Task` to `UniTask`.

```csharp
using Cysharp.Threading.Tasks;

public async UniTaskVoid SaveAsync(PlayerData player)
{
    await _save.SaveDataAsync(player).AsUniTask();
}
```
