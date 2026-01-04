---
title: QuickSave
---

| [🪄github 바로가기][git]

Cysharp의 [MemoryPack](https://github.com/cysharp/memorypack)을 이용하여 Binary 파일을 Serialize, Deserialize하여 데이터를 저장 및 로드하는 기능을 제공합니다.<br>
[Data Protector](https://github.com/achieveonepark/dataprotector)를 설치하시면 데이터를 압축하여 암/복호화할 수 있는 기능도 제공합니다. ([문서](https://achieveonepark.github.io/cording-library/Documents/DataProtector/DataProtector/))

---

## Install

다음 설치 방법 중 하나를 선택하세요.

> 참고: GitHub URL의 `#` 뒤에 있는 버전은 Changelog에 기재된 최신 변경 사항을 기준으로 확인하세요.

### [NuGetForUnity](https://github.com/GlitchEnzo/NuGetForUnity)을 이용하여 MemoryPack 설치하기
1. NugetForUnity 패키지를 README를 따라 설치합니다.
2. 에디터 상단의 `NuGet/Manage NuGet Packages`를 클릭하여 `MemoryPack`을 다운로드합니다.<br>

### Install via Unity Package Manager (UPM)

1. Unity Package Manager를 열고 좌측 상단의 `+` 버튼을 클릭합니다.
2. `Install package from git URL...`을 선택합니다.
3. `https://github.com/achieveonepark/quick-save.git#1.0.0` 을 입력한 뒤 Install을 클릭합니다.

### Manual Addition

Unity 프로젝트의 `Packages` 폴더에 있는 `manifest.json` 파일을 엽니다.  
`dependencies` 항목 아래에 다음 라인을 추가합니다.

```json
"com.achieve.quick-save": https://github.com/achieveonepark/quick-save.git#1.0.0"
```

## 빠른 시작


이 설정을 통해 메모리팩은 유니티 내에서 원활한 바이너리 직렬화 및 역직렬화를 준비할 수 있습니다.

### quick-save 설치하기

아래 두 가지 방법 중 하나를 선택합니다.

>github URL의 # 뒷버전은 Changelog의 최신 사항을 참고해주세요.

### UPM에서 사용하기
1. UPM을 연 후 좌측 상단의 + 버튼을 누릅니다.
2. `Install package from git URL...`을 선택합니다.
3. ``를 입력 후 Install합니다.

### 직접 추가하기
1. `Unity Project/Packages/manifest.json` 파일을 실행합니다.
2. `Dependencies`에 `"com.achieve.quick-save": "https://github.com/achieveonepark/quick-save.git#1.0.0"` 내용을 추가합니다.

---

## 설명

### API

이 패키지는 아래의 기능을 제공합니다.

    QuickSave.Builder           | QuickSave 객체를 생성합니다.
    QuickSave.SaveData<T>       | T 클래스의 데이터를 Binary 파일로 persistentDataPath에 Save합니다.
    QuickSave.LoadData<T>       | T 클래스의 데이터를 persistentDataPath에서 가져와 Load합니다. 

### 사용 방법

```csharp
[MemoryPackable]
public partial class Monster
{
    public int HP;
    public long Attack;
    public long Defense;
}
```

```csharp
using Achieve.QuickSave

public class DataMng : MonoBehaviour
{
    QuickSave<Monster> data;

    void Start()
    {
        Monster monster = new Monster();
        monster.HP = 10000;
        monster.Attack = 10000;
        monster.Defense = 100000;

        data = new QuickSave<Monster>.Builder()
                                     .UseEncryption("ejrjejrtlq3mgfeq") // Data Protector를 추가한 경우 사용 가능합니다.
                                     .UseVersion(55) // 데이터에 대한 버전을 설정합니다.
                                     .Build();

        // 데이터를 저장합니다.
        data.SaveData(monster);

        // 물리적으로 저장 된 데이터를 Load합니다.
         var loadMonster = data.LoadData();
    }
}

```


---

## Dependencies
[Memory Pack](https://github.com/achieveonepark/MemoryPack#1.21.1) (1.21.1)

---

## ChangeLog
[link](https://github.com/achieveonepark/QuickSave/blob/main/CHANGELOG.md)

[git]: https://github.com/achieveonepark/quick-save