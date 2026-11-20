> For AI agents: the complete documentation index is available at /quick-save/ko/llms.txt, the full documentation bundle is available at /quick-save/ko/llms-full.txt.

# 암호화 & 버전 관리

## 사전 준비

암호화 기능은 [DataProtector](https://github.com/achieveonepark/DataProtector) 패키지가 설치되어 있을 때만 활성화됩니다.

DataProtector를 설치하면 Assembly Definition이 자동으로 `USE_ENCRYPT` 심볼을 정의하고, Builder의 `UseEncryption()` · `UseVersion()` 메서드가 컴파일에 포함됩니다.

***

## UseEncryption

```csharp
var save = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-secret-key-32chars")
    .Build();
```

- `SaveData` / `SaveDataAsync` 호출 시 직렬화된 바이너리를 암호화한 후 저장합니다.
- `LoadData` / `LoadDataAsync` 호출 시 파일을 복호화한 후 역직렬화합니다.

> 암호화 키는 안전한 곳에 보관하세요. 키가 바뀌면 기존 저장 파일을 로드할 수 없습니다.

***

## UseVersion

버전을 지정하면 파일 이름에 버전 번호가 포함됩니다. 게임 업데이트 시 이전 버전 저장 파일과 새 버전 저장 파일을 분리하여 운용할 수 있습니다.

```csharp
var saveV1 = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-key")
    .UseVersion(1)
    .Build();

var saveV2 = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-key")
    .UseVersion(2)
    .Build();
```

저장 파일 경로:

```
{persistentDataPath}/quicksave/PlayerData_1.acqs   ← v1
{persistentDataPath}/quicksave/PlayerData_2.acqs   ← v2
```

***

## 마이그레이션 패턴

구 버전 저장 파일을 새 버전으로 마이그레이션하는 예시입니다.

```csharp
var oldSave = new QuickSave<PlayerDataV1>.Builder()
    .UseEncryption("my-key")
    .UseVersion(1)
    .Build();

var newSave = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-key")
    .UseVersion(2)
    .Build();

if (oldSave.HasSaveData() && !newSave.HasSaveData())
{
    PlayerDataV1 legacy = oldSave.LoadData();
    PlayerData migrated = Migrate(legacy);
    newSave.SaveData(migrated);
    oldSave.DeleteData();
}
```

***

## 버전 없이 암호화만 사용하기

`UseVersion`을 호출하지 않으면 버전은 기본값 `0`으로 처리되고 파일 이름은 `TypeName_0.acqs`가 됩니다.

```csharp
var save = new QuickSave<PlayerData>.Builder()
    .UseEncryption("my-key")
    // UseVersion 미호출 → _0.acqs
    .Build();
```
