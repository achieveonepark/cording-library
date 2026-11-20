> For AI agents: the complete documentation index is available at /quick-save/ko/llms.txt, the full documentation bundle is available at /quick-save/ko/llms-full.txt.

# Builder

`QuickSave<T>.Builder`는 `QuickSave<T>` 인스턴스를 생성하기 위한 빌더 클래스입니다.

```csharp
var save = new QuickSave<T>.Builder()
    /* 옵션 메서드 */
    .Build();
```

***

## 메서드

### Build()

```csharp
public QuickSave<T> Build()
```

설정을 적용하여 `QuickSave<T>` 인스턴스를 반환합니다. 이 시점에 저장 디렉토리가 없으면 자동 생성됩니다.

***

### UseEncryption(string encryptionKey)

```csharp
public Builder UseEncryption(string encryptionKey)
```

> `USE_ENCRYPT` 심볼이 정의되어 있을 때만 사용 가능합니다 (DataProtector 설치 필요).

저장 시 암호화, 로드 시 복호화를 활성화합니다.

| 파라미터            | 타입       | 설명           |
| --------------- | -------- | ------------ |
| `encryptionKey` | `string` | 암/복호화에 사용할 키 |

```csharp
new QuickSave<PlayerData>.Builder()
    .UseEncryption("your-secret-key")
    .Build();
```

***

### UseVersion(int version)

```csharp
public Builder UseVersion(int version)
```

> `USE_ENCRYPT` 심볼이 정의되어 있을 때만 사용 가능합니다.

저장 파일 이름에 버전 번호를 포함시킵니다. 기본값은 `0`입니다.

| 파라미터      | 타입    | 설명              |
| --------- | ----- | --------------- |
| `version` | `int` | 파일 이름에 붙을 버전 번호 |

```csharp
new QuickSave<PlayerData>.Builder()
    .UseEncryption("your-secret-key")
    .UseVersion(2)
    .Build();
// → PlayerData_2.acqs
```
