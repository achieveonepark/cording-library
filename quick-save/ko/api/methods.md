> For AI agents: the complete documentation index is available at /quick-save/ko/llms.txt, the full documentation bundle is available at /quick-save/ko/llms-full.txt.

# QuickSave<T> 메서드

`QuickSave<T>`의 공개 메서드 레퍼런스입니다.

> 제네릭 제약: `where T : class`

***

## SaveData

```csharp
public void SaveData(T data)
```

`data`를 MemoryPack으로 직렬화하여 파일에 저장합니다. 암호화가 활성화된 경우 직렬화 후 암호화합니다.

| 파라미터   | 타입  | 설명     |
| ------ | --- | ------ |
| `data` | `T` | 저장할 객체 |

```csharp
save.SaveData(player);
```

***

## SaveDataAsync

```csharp
public Task SaveDataAsync(T data)
```

`SaveData`의 비동기 버전입니다. 메인 스레드를 블로킹하지 않습니다.

```csharp
await save.SaveDataAsync(player);
```

***

## LoadData

```csharp
public T LoadData()
```

저장 파일을 읽어 역직렬화한 객체를 반환합니다.

| 반환값                       | 조건               |
| ------------------------- | ---------------- |
| `T` 인스턴스                  | 정상 로드            |
| `null`                    | 파일 없음            |
| `InvalidDataException` 발생 | 파일 존재하지만 역직렬화 실패 |

```csharp
try
{
    var data = save.LoadData();
    if (data == null) { /* 파일 없음 */ }
}
catch (InvalidDataException e)
{
    Debug.LogError(e.Message); // 파일 손상
}
```

***

## LoadDataAsync

```csharp
public Task<T> LoadDataAsync()
```

`LoadData`의 비동기 버전입니다.

```csharp
var data = await save.LoadDataAsync();
```

***

## HasSaveData

```csharp
public bool HasSaveData()
```

저장 파일이 존재하면 `true`, 없으면 `false`를 반환합니다. `LoadData` 전에 파일 유무를 확인할 때 사용합니다.

```csharp
if (save.HasSaveData())
{
    var data = save.LoadData();
}
```

***

## DeleteData

```csharp
public void DeleteData()
```

저장 파일을 삭제합니다. 파일이 없으면 아무 동작도 하지 않습니다.

```csharp
save.DeleteData();
```
