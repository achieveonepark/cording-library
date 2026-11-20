> For AI agents: the complete documentation index is available at /data-protector/llms.txt, the full documentation bundle is available at /data-protector/llms-full.txt.

# 시작하기

## 설치

아래 방법 중 하나를 선택합니다.

:::tip
GitHub URL의 `#` 뒤 버전을 확인하세요. Changelog의 최신 변경 사항에 해당하는 버전을 지정할 수 있습니다.
:::

### Unity Package Manager (UPM)

1. UPM을 열고 좌측 상단의 `+` 버튼을 클릭합니다.
2. `Install package from git URL...`를 선택합니다.
3. `https://github.com/achieveonepark/DataProtector.git#1.0.0`을 입력하고 Install을 누릅니다.

### 수동 추가

Unity 프로젝트의 `Packages/manifest.json` 파일을 열고 `dependencies`에 다음 줄을 추가합니다.

```json
"com.achieve.data-protector": "https://github.com/achieveonepark/DataProtector.git#1.0.0"
```

## 기본 사용

16바이트 키로 데이터를 암호화하고 복호화합니다.

```csharp
using Achieve.DataProtector;

string key = "1234567890123456"; // 16바이트 키

var encrypted = DataProtector.Encrypt(originalBytes, key);
var decrypted = DataProtector.Decrypt(encrypted, key);
```

자세한 메서드는 [API](/data-protector/api.md)를 참고하세요.
