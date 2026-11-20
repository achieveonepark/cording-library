> For AI agents: the complete documentation index is available at /quick-save/ko/llms.txt, the full documentation bundle is available at /quick-save/ko/llms-full.txt.

# 비동기 저장 / 로드

## 왜 비동기가 필요한가

`SaveData` / `LoadData`는 내부적으로 `File.WriteAllBytes` / `File.ReadAllBytes`를 사용합니다. 저장 파일이 크거나 저장 장치가 느린 환경(특히 모바일)에서는 메인 스레드를 일시적으로 블로킹할 수 있습니다.

`SaveDataAsync` / `LoadDataAsync`는 `File.WriteAllBytesAsync` / `File.ReadAllBytesAsync`를 사용하여 메인 스레드 블로킹 없이 동작합니다.

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
    // 저장 파일 없음
}
```

***

## 전체 예제 (async/await)

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
        Debug.Log("저장 완료");
    }

    public async void OnLoadButtonClicked()
    {
        try
        {
            PlayerData data = await _save.LoadDataAsync();
            if (data == null)
                Debug.Log("저장 데이터 없음");
            else
                Debug.Log($"로드 완료: {data.Name}");
        }
        catch (System.IO.InvalidDataException e)
        {
            Debug.LogError($"저장 파일 손상: {e.Message}");
        }
    }
}
```

***

## UniTask와 함께 사용

UniTask가 프로젝트에 있는 경우 `Task`를 `UniTask`로 변환하여 사용할 수 있습니다.

```csharp
using Cysharp.Threading.Tasks;

public async UniTaskVoid SaveAsync(PlayerData player)
{
    await _save.SaveDataAsync(player).AsUniTask();
}
```
