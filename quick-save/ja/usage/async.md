> For AI agents: the complete documentation index is available at /quick-save/ja/llms.txt, the full documentation bundle is available at /quick-save/ja/llms-full.txt.

# 非同期の保存 / 読み込み

## なぜ非同期が必要か

`SaveData` / `LoadData` は内部で `File.WriteAllBytes` / `File.ReadAllBytes` を使用します。保存ファイルが大きい、または保存デバイスが遅い環境（特にモバイル）では、メインスレッドを一時的にブロックする可能性があります。

`SaveDataAsync` / `LoadDataAsync` は `File.WriteAllBytesAsync` / `File.ReadAllBytesAsync` を使用し、メインスレッドをブロックせずに動作します。

## SaveDataAsync

```csharp
await save.SaveDataAsync(playerData);
```

## LoadDataAsync

```csharp
PlayerData loaded = await save.LoadDataAsync();

if (loaded == null)
{
    // 保存ファイルなし
}
```

## 完全な例 (async/await)

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
        Debug.Log("保存完了");
    }

    public async void OnLoadButtonClicked()
    {
        try
        {
            PlayerData data = await _save.LoadDataAsync();
            if (data == null)
                Debug.Log("保存データなし");
            else
                Debug.Log($"読み込み完了: {data.Name}");
        }
        catch (System.IO.InvalidDataException e)
        {
            Debug.LogError($"保存ファイル破損: {e.Message}");
        }
    }
}
```

## UniTask と併用

UniTask がプロジェクトにある場合、`Task` を `UniTask` に変換して使用できます。

```csharp
using Cysharp.Threading.Tasks;

public async UniTaskVoid SaveAsync(PlayerData player)
{
    await _save.SaveDataAsync(player).AsUniTask();
}
```
