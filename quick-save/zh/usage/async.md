> For AI agents: the complete documentation index is available at /quick-save/zh/llms.txt, the full documentation bundle is available at /quick-save/zh/llms-full.txt.

# 异步保存 / 读取

## 为什么需要异步

`SaveData` / `LoadData` 内部使用 `File.WriteAllBytes` / `File.ReadAllBytes`。当存档文件较大或存储设备较慢（尤其是移动端）时，可能会暂时阻塞主线程。

`SaveDataAsync` / `LoadDataAsync` 使用 `File.WriteAllBytesAsync` / `File.ReadAllBytesAsync`，在不阻塞主线程的情况下工作。

## SaveDataAsync

```csharp
await save.SaveDataAsync(playerData);
```

## LoadDataAsync

```csharp
PlayerData loaded = await save.LoadDataAsync();

if (loaded == null)
{
    // 没有存档文件
}
```

## 完整示例 (async/await)

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
        Debug.Log("保存完成");
    }

    public async void OnLoadButtonClicked()
    {
        try
        {
            PlayerData data = await _save.LoadDataAsync();
            if (data == null)
                Debug.Log("没有存档数据");
            else
                Debug.Log($"读取完成: {data.Name}");
        }
        catch (System.IO.InvalidDataException e)
        {
            Debug.LogError($"存档文件损坏: {e.Message}");
        }
    }
}
```

## 与 UniTask 配合使用

如果项目中有 UniTask，可以把 `Task` 转换为 `UniTask` 使用。

```csharp
using Cysharp.Threading.Tasks;

public async UniTaskVoid SaveAsync(PlayerData player)
{
    await _save.SaveDataAsync(player).AsUniTask();
}
```
