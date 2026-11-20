> For AI agents: the complete documentation index is available at /quick-save/ko/llms.txt, the full documentation bundle is available at /quick-save/ko/llms-full.txt.

# 시작하기

## 사전 준비: MemoryPack 설치

Quick Save는 MemoryPack에 의존합니다. 먼저 [NuGetForUnity](https://github.com/GlitchEnzo/NuGetForUnity)를 통해 MemoryPack을 설치하세요.

1. NuGetForUnity를 프로젝트에 설치합니다.
2. Unity 메뉴에서 **NuGet > Manage NuGet Packages**를 엽니다.
3. `MemoryPack`을 검색하여 설치합니다.

## 설치

### Unity Package Manager (UPM) — 권장

1. **Window > Package Manager**를 엽니다.
2. 좌측 상단 `+` 버튼 → **Add package from git URL...**&#xB97C; 선택합니다.
3. 아래 URL을 입력하고 **Add**를 클릭합니다.

```
https://github.com/achieveonepark/QuickSave.git#1.0.3
```

### manifest.json 직접 편집

`Packages/manifest.json`의 `dependencies`에 추가합니다.

```json
{
  "dependencies": {
    "com.achieve.quick-save": "https://github.com/achieveonepark/QuickSave.git#1.0.3"
  }
}
```


> **Info**
> 
> 암호화가 필요하면 [DataProtector](https://github.com/achieveonepark/DataProtector) 패키지를 추가로 설치하세요. DataProtector가 있으면 `USE_ENCRYPT` 심볼이 자동 정의되어 `UseEncryption()`, `UseVersion()` 메서드가 활성화됩니다. 자세한 내용은 [사용법 › 암호화 & 버전 관리](/quick-save/ko/usage/encryption.md)를 참고하세요.
> 


## 빠른 시작

### 1. 저장할 데이터 클래스 정의

MemoryPack으로 직렬화할 클래스에 `[MemoryPackable]` 어트리뷰트와 `partial` 키워드를 붙입니다.

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

### 2. QuickSave 인스턴스 생성

`Builder` 패턴으로 인스턴스를 생성합니다. 생성 시 저장 디렉토리(`persistentDataPath/quicksave/`)도 함께 준비됩니다.

```csharp
using Achieve.QuickSave;

var save = new QuickSave<PlayerData>.Builder().Build();
```

### 3. 저장, 로드, 삭제

```csharp
var player = new PlayerData { Name = "Hero", Level = 1, HP = 100f, Gold = 0 };

save.SaveData(player);                 // 저장

if (save.HasSaveData())                // 존재 확인
{
    PlayerData loaded = save.LoadData(); // 로드
    Debug.Log(loaded.Name);            // "Hero"
}

save.DeleteData();                     // 삭제
```

## 다음 단계

- [사용법 › 기본 사용법](/quick-save/ko/usage/basic.md)
- [API › QuickSave\<T> 메서드](/quick-save/ko/api/methods.md)
