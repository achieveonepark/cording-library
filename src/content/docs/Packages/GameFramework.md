---
title: Game Framework
---


| [🪄github 바로가기][git]

---

게임 제작을 수월하게 하기 위해 유니티에서 사용할 수 있는 프레임워크를 제작했습니다.

### 포함 된 기능:

1. [Config](https://github.com/achieveonepark/GameFramework?tab=readme-ov-file#config)
2. [Popup / Scene Base Classes](https://github.com/achieveonepark/GameFramework?tab=readme-ov-file#popup)
3. [Time Management](https://github.com/achieveonepark/GameFramework?tab=readme-ov-file#time-management)
4. [UIBinding using UniTaskPubSub](https://github.com/achieveonepark/GameFramework?tab=readme-ov-file#uibinding-using-unitaskpubsub)
5. [Singleton Pattern](https://github.com/achieveonepark/GameFramework?tab=readme-ov-file#singleton)
6. [Logging](https://github.com/achieveonepark/GameFramework?tab=readme-ov-file#logging)
7. [User-Friendly UnityWebRequest Wrapper](https://github.com/achieveonepark/GameFramework?tab=readme-ov-file#user-friendly-unitywebrequest-wrapper)


### 추천 기능:
1. [Quick Save](https://github.com/achieveonepark/quicksave): 메모리팩을 이용한 효율적인 데이터 물리 저장 / 로드 기능 제공
2. [Data Protector](https://github.com/achieveonepark/dataprotector): AES-128을 이용한 암/복호화 기능 제공
3. [Infinity Value](https://github.com/achieveonepark/infinityValue): 천 단위 그룹이 있는 무한한 숫자를 위한 값의 구조체 제공
4. [Smart Addressables](https://github.com/achieveonepark/SmartAddressables): 유니티 어드레서블 사용의 편의성과 효율성 제공
5. [Lite DB](https://github.com/achieveonepark/LiteDB): SQLite를 사용하여 데이터를 효율적으로 관리하도록 기능 제공

## Quick Start

### Config
`ConfigManager`에 추가된 모든 데이터는 `PlayerPrefs`에 저장됩니다.

```csharp
ConfigManager.AddKey("Sound", 0);
ConfigManager.AddKey("BGM", 0);
ConfigManager.AddKey("DataKey", "DataValue");

var sound = ConfigManager.GetConfig("Sound");
ConfigManager.SetConfig("Sound", 100);
```

### Popup
에디터 설정:

1. `PopupManager`를 Hierarchy에 추가합니다. (DontDestroyOnLoad로 활성화됩니다.)
2. `PopupManager` 컴포넌트의 `popups` Field에 사용할 Popup들을 모두 캐싱합니다.

```csharp
public class SettingPopup : Popup
{
    // ...
}
public class CommonPopup : Popup
{
    // ...
}
public class SettingData
{
    public int Volume;
    // ...
}

// Calling GetPopup will also trigger the popup's Open method.
var commonPopup = PopupManager.GetPopup<CommonPopup>();

// objName : Txt_Level, TMP Support
var lvTxt = commonPopup.Get<Text>("Level");
var lvTxt = commonPopup.Get<TMP_Text>("Level"); 

SettingData data = new SettingData { Volume = 200 };
var settingPopup = PopupManager.GetPopup<SettingPopup>(data);
```

### Time Management
`TimeManager`로 현재 시간을 받아오거나, 게임의 TimeScale를 조정합니다.

```csharp
DateTime now = TimeManager.Now;
TimeManager.TimeScale = 2;
```

### UIBinding using UniTaskPubSub

>[hadashiA/UniTaskPubSub](https://github.com/hadashiA/UniTaskPubSub)을 사용한 기능입니다.<br>
기능에 대한 설명은 링크를 참조해주세요.<br> 

이 설정을 통해 이벤트 관리가 간소화됩니다. UI 호출 및 상태 변경 처리에 용이합니다.

```csharp
// Register
UIBindingManager.Subscribe<SettingData>(data =>
{
    SetVolume(data.Volume);
});

// Call
UIBindingManager.Publish(new SettingData { Volume = 5 });
```

### Singleton

- **MonoSingleton**: MonoBehavior를 상속 받는 Singleton
- **PersistentMonoSingleton**: MonoSingleton과 같은 기능이지만 `DontDestroyOnLoad`로 로드합니다.
- **Singleton**: MonoBehavior 상속받지 않는 객체를 Singleton으로 사용합니다.

### Logging

패키지에는 기본 `Log` 클래스가 포함되어 있습니다. (GameLog)<br>
사용자 지정이 필요한 경우 `IGameLog` 에서 상속하여 사용자 지정 로거를 구현할 수 있습니다.<br>
패키지의 `GameLog.cs` 를 참조하세요.

```csharp
GameLog.Debug("Debug");
GameLog.Info("Info");
GameLog.Warning("Warning");
GameLog.Error("Error");
throw GameLog.Fatal("Fatal");
```

### UnityWebRequest Wrapper

이 class는 UnityWebRequest를 간편하게 사용하기 위해 제작되었습니다.

```csharp
var result = new HttpLink.Builder()
    .SetUrl("https://jsonplaceholder.typicode.com/posts/1")
    .SetMethod("GET")
    .Build();
await result.SendAsync();
if (result.Success)
{
    var resultBytes = result.ReceiveData;
    var resultStr = result.ReceiveDataString;
}
```


## ChangeLog
[link](https://github.com/achieveonepark/game-framework/blob/main/CHANGELOG.md)

[git]: https://github.com/achieveonepark/game-framework