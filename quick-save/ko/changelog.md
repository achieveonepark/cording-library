> For AI agents: the complete documentation index is available at /quick-save/ko/llms.txt, the full documentation bundle is available at /quick-save/ko/llms-full.txt.

# 변경 내역

## \[1.0.3] `최신` — 2026-05-23

### 추가

- **`SaveDataAsync(T data)`** — 비동기 저장 메서드. `File.WriteAllBytesAsync` 기반으로 메인 스레드를 블로킹하지 않습니다.
- **`LoadDataAsync()`** — 비동기 로드 메서드. 대용량 저장 파일이나 느린 스토리지 환경(모바일)에서 프레임 드랍을 방지합니다.
- **`HasSaveData()`** — 로드 시도 전에 저장 파일 존재 여부를 확인할 수 있는 메서드. 기존에는 `LoadData()` 반환값이 `null`인지 확인해야 했습니다.

### 버그 수정

- **`Builder.UseVersion()` 무시 버그** — `UseVersion(n)` 호출 시 설정한 버전 값이 내부에서 항상 `0`으로 고정되던 문제를 수정했습니다. 암호화 + 버전 관리를 함께 사용하는 경우 저장 파일 경로가 의도와 다르게 생성되고 있었습니다.
- **`SaveData<T>` 타입 파라미터 섀도잉** — `QuickSave<T>` 클래스의 제네릭 `T`와 다른 타입을 직렬화할 수 있던 구조적 버그를 수정했습니다. 예를 들어 `QuickSave<MyData>` 인스턴스에 `string`을 전달해도 컴파일이 통과했습니다.
- **`LoadData()` 에러 구분 개선** — 기존에는 파일이 없을 때와 파일이 손상됐을 때 모두 처리가 불명확했습니다. 이제 파일 없음은 `null` 반환, 역직렬화 실패는 `InvalidDataException`을 던져 두 케이스를 명확히 구분할 수 있습니다.

### 성능

- **저장 디렉토리 생성 최적화** — `SaveData`, `LoadData`, `DeleteData` 호출마다 `Directory.Exists`를 실행하던 구조를 개선했습니다. 이제 `Build()` 시점에 딱 한 번만 디렉토리를 확인하고 생성하며, 이후 파일 경로는 `_filePath`에 캐싱됩니다.

***

## \[1.0.2] — 2026-05-16

### 추가

- **`DeleteData()`** — 저장 파일(`.acqs`)을 런타임에서 직접 삭제하는 메서드. 파일이 없는 경우에도 예외를 발생시키지 않습니다.
- **Editor 메뉴 `Achieve > Delete Save`** — Unity 에디터에서 `quicksave/` 디렉토리 내 모든 `.acqs` 파일을 일괄 삭제하는 유틸리티. 삭제 전 파일 수와 경로를 보여주는 확인 다이얼로그가 표시됩니다.

***

## \[1.0.0] — 2024-01-01

### 추가

- 패키지 최초 릴리즈
- **`SaveData(T data)`** — MemoryPack 기반 바이너리 직렬화 저장
- **`LoadData()`** — 바이너리 파일 역직렬화 로드
- `Application.persistentDataPath/quicksave/` 경로에 `.acqs` 확장자로 저장
- **암호화 옵션** — `USE_ENCRYPT` define과 DataProtector 패키지 연동으로 AES 암호화 지원
- **버전 관리** — `UseVersion(int)` 으로 파일 이름에 버전 번호를 붙여 다중 버전 저장 파일 운용 가능
- **Builder 패턴** — `QuickSave<T>.Builder`로 플루언트하게 인스턴스 구성
