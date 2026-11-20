> For AI agents: the complete documentation index is available at /quick-save/ko/llms.txt, the full documentation bundle is available at /quick-save/ko/llms-full.txt.

# 기본 사용법

## 데이터 클래스 준비

Quick Save는 `MemoryPack`으로 직렬화하므로 저장할 클래스에 두 가지 조건이 필요합니다.

- `[MemoryPackable]` 어트리뷰트
- `partial` 키워드

```csharp
using MemoryPack;

[MemoryPackable]
public partial class InventoryData
{
    public List<string> Items;
    public int Capacity;
}
```

> `QuickSave<T>`의 제네릭 제약은 `where T : class`입니다. 구조체(struct)는 지원하지 않습니다.

***

## Builder로 인스턴스 생성

```csharp
var save = new QuickSave<InventoryData>.Builder().Build();
```

`Build()` 호출 시점에 저장 디렉토리(`persistentDataPath/quicksave/`)가 없으면 자동으로 생성됩니다. 이후 `SaveData` / `LoadData` 호출 시에는 디렉토리 체크 비용이 발생하지 않습니다.

***

## SaveData

```csharp
var inventory = new InventoryData
{
    Items = new List<string> { "Sword", "Shield" },
    Capacity = 20
};

save.SaveData(inventory);
```

파일은 `{persistentDataPath}/quicksave/InventoryData.acqs`에 저장됩니다.

***

## HasSaveData

로드 전에 파일 존재 여부를 확인합니다.

```csharp
if (save.HasSaveData())
{
    // 파일이 있을 때만 로드
}
```

***

## LoadData

```csharp
InventoryData loaded = save.LoadData();
```

- 파일이 없으면 `null`을 반환합니다.
- 파일이 존재하지만 역직렬화에 실패하면 `InvalidDataException`이 발생합니다. 파일 없음과 파일 손상을 구분해 처리할 수 있습니다.

```csharp
try
{
    var data = save.LoadData();
    if (data == null)
    {
        // 저장 파일 없음 → 기본값 사용
    }
}
catch (InvalidDataException e)
{
    Debug.LogError($"저장 파일 손상: {e.Message}");
    save.DeleteData(); // 손상된 파일 제거 후 재시작
}
```

***

## DeleteData

```csharp
save.DeleteData();
```

파일이 존재하지 않으면 아무 작업도 하지 않습니다. (예외 없음)

***

## 에디터에서 저장 파일 삭제

Unity 에디터 메뉴 **Achieve > Delete Save**를 사용하면 `quicksave/` 디렉토리의 모든 `.acqs` 파일을 삭제할 수 있습니다. 삭제 전 확인 다이얼로그가 표시됩니다.
