---
title: Game Framework
---


| [🪄github 바로가기](https://github.com/achieveonepark/game-framework)

# Game Framework

Unity에서의 게임 개발을 빠르게 진행할 수 있도록 설계된  
사전 구축된 시스템과 확장 기능들의 모음입니다.

이 프레임워크는 다양한 매니저와 시스템을 포함하는  
중앙 정적 클래스 `GameFramework.Core`를 기준으로 구성되어 있습니다.

## UPM Installation

1. Unity Package Manager를 엽니다 (`Window > Package Manager`).
2. 좌측 상단의 `+` 아이콘을 클릭한 후 `Add package from git URL...`을 선택합니다.
3. 다음 URL을 입력합니다:  
   `https://github.com/achieveonepark/game-framework.git`

## Dependencies

이 프레임워크는 전체 기능을 사용하기 위해 몇 가지 외부 패키지에 의존합니다.

### Required
- **[UniTask](https://github.com/Cysharp/UniTask):**  
  프레임워크 전반에서 비동기 작업을 처리하기 위해 필수로 사용됩니다.  
  Game Framework 패키지를 설치하기 **이전에 반드시 설치**해야 합니다.

### Optional
다음 패키지들은 추가 기능을 활성화하기 위해 선택적으로 설치할 수 있습니다.

- **[UniTaskPubSub](https://github.com/hadashiA/UniTaskPubSub):**  
  반응형(Event 기반) UI를 위한 `UIBindingManager` 기능을 활성화합니다.
- **[QuickSave](https://github.com/achieveonepark/quicksave):**  
  `Core.Player`의 데이터 영속화 기능을 활성화합니다.  
  사용하려면 프로젝트의 Scripting Define Symbols에  
  `USE_QUICK_SAVE`를 추가해야 합니다.

## Features & API

프레임워크의 대부분의 모듈은  
정적 클래스 `GameFramework.Core` 내부의 중첩 클래스로 제공됩니다.

### Access Patterns
- **Static Classes**  
  직접 접근합니다 (예: `Core.Time.TimeScale`)
- **MonoBehaviour Singletons**  
  `Instance` 프로퍼티를 통해 접근합니다  
  (예: `Core.Sound.Instance.PlayBGM()`)  
  → 씬에 해당 GameObject가 존재해야 합니다.

### System Modules
| 클래스 | 접근 방식 | 설명 |
| :--- | :--- | :--- |
| `Core.Log` | Static | 다양한 레벨의 콘솔 로그 출력을 처리합니다. |
| `Core.Config` | Static | PlayerPrefs에 저장되는 키-값 설정을 관리합니다. |
| `Core.Player` | Static | "Container" 기반의 런타임 플레이어 데이터 중앙 관리 클래스입니다. |
| `Core.Time` | Static | 전역 타임 스케일 제어 및 현재 시간을 제공합니다. |
| `Core.Scene` | Singleton | 씬 로딩 및 언로딩을 관리합니다. |
| `Core.Popup` | Singleton | UI 팝업의 생성 및 라이프사이클을 관리합니다. |

### Other Features
- **유틸리티 및 확장 메서드**  
  Unity 및 C# 기본 타입을 위한 다양한 확장 메서드를 제공합니다.  
  `Runtime/Extensions` 폴더를 참고하세요.
- **UI 컴포넌트**  
  `SafeArea`, `Draggable`과 같은 UI 보조 컴포넌트를 포함합니다.

## Quick Start Examples

### `Core.Log`
카테고리별 콘솔 로그를 처리합니다.
```csharp
Core.Log.Debug("디버그 메시지입니다.");
Core.Log.Info("중요한 정보 출력용 로그입니다.");
Core.Log.Warning("문제가 발생할 수 있습니다.");
```

### Core.Config

PlayerPrefs에 저장되는 간단한 데이터를 관리합니다.

```csharp
// 키가 존재하지 않을 경우 초기값 설정
Core.Config.AddKey("BGMVolume", 0.8f);

// 값 설정 및 조회
Core.Config.SetConfig("BGMVolume", 0.7f);
float currentVolume = (float)Core.Config.GetConfig("BGMVolume");
```

### Core.Player (데이터 관리)

컨테이너 클래스를 통해 런타임 데이터를 관리합니다.

1. 데이터와 컨테이너 정의

```csharp
// 실제 데이터 구조
public class CharacterData : PlayerDataBase
{
    public string Name;
    public int Level;
}

// 데이터를 담는 컨테이너
public class CharacterDataContainer : PlayerDataContainerBase<int, CharacterData>
{
    public CharacterDataContainer()
    {
        // 중요: GetContainer<T> 사용을 위해
        // DataKey는 반드시 클래스 이름과 동일해야 합니다.
        DataKey = typeof(CharacterDataContainer).Name;
    }
}
```

2. 컨테이너 등록 및 사용

```csharp
// 게임 시작 시 컨테이너 생성 및 등록
var characterContainer = new CharacterDataContainer();
characterContainer.Add(1, new CharacterData { Id = 1, Name = "Hero", Level = 1 });
Core.Player.AddContainer(characterContainer);

// 다른 위치에서 데이터 조회 및 사용
var myChars = Core.Player.GetContainer<CharacterDataContainer>();
var mainChar = myChars.GetInfo(1);
mainChar.Level++;

// 전체 데이터 저장 / 로드 (USE_QUICK_SAVE 필요)
Core.Player.Save();
Core.Player.Load();
```

### Core.Popup (Singleton)

Core.Popup 스크립트와 팝업 프리팹 리스트를 가진
PopupManager GameObject가 필요합니다.

```csharp
// 매니저에 등록된 특정 타입의 팝업 열기
// Open() 메서드는 자동으로 호출됩니다.
var myPopup = Core.Popup.Instance.Open<MyAwesomePopup>();

// 팝업 오픈 시 데이터 전달
var data = new MyPopupData { Message = "Hello!" };
Core.Popup.Instance.Open<MyAwesomePopup>(data);

// 팝업 닫기
myPopup.Close();
```

### Core.Time

Unity의 Time과 Ping 쏴서 가져 온 시간의 DateTime을 감싼 래퍼 클래스입니다.

```csharp
// 게임 속도를 2배로 설정
Core.Time.TimeScale = 2.0f;

// 현재 실제 시간 가져오기
DateTime now = Core.Time.Now;
```