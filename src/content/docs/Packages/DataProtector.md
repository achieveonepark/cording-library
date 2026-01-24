---
title: Data Protector
---

| [🪄github 바로가기](https://github.com/achieveonepark/data-protector)

- byte[], string 형태의 데이터를 물리적 저장을 하기 전에 외부에서 데이터를 조회하기 힘들도록 압축 및 암호화를 하는 기능을 제공합니다.<br>
- 암호화를 위해선 사용자가 직접 `16byte`의 `string key` 값을 입력해주어야 합니다.<br>
- 파일의 변경사항이 있는지 `SHA256`을 이용한 `byte[] 또는 string의 Hash값을 추출`하여 비교하는 로직도 제공합니다.<br>

---

## Install

다음 설치 방법 중 하나를 선택하세요.

> 참고: GitHub URL의 `#` 뒤에 있는 버전은 Changelog에 기재된 최신 변경 사항을 기준으로 확인하세요.

### Install via Unity Package Manager (UPM)

1. Unity Package Manager를 열고 좌측 상단의 `+` 버튼을 클릭합니다.
2. `Install package from git URL...`을 선택합니다.
3. `https://github.com/achieveonepark/data-protector.git#1.0.0` 을 입력한 뒤 Install을 클릭합니다.

### Manual Addition

Unity 프로젝트의 `Packages` 폴더에 있는 `manifest.json` 파일을 엽니다.  
`dependencies` 항목 아래에 다음 라인을 추가합니다.

```json
"com.achieve.infinity-value": "https://github.com/achieveonepark/data-protector.git#1.0.0"
```

## Description

### 압축, 암호화?
1. [AES-128](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) 방식을 사용합니다.
2. C#에서 제공하는 [GZipStream](https://learn.microsoft.com/ko-kr/dotnet/api/system.io.compression.gzipstream?view=net-8.0)을 사용하여 압축을 진행합니다.

### API

이 패키지는 아래의 기능을 제공합니다.

    DataProtector.Encrypt        | 압축 후 암호화한 결과 값
    DataProtector.Decrypt        | 복호화 후 압축 해제한 결과 값
    HaskChecker.ComputeHash      | Encrypt 된 데이터의 Hash 값 추출
    HaskChecker.ValidateHash     | 두 Hash값을 비교

---
