---
title: LiteDB
---

| [🪄github 바로가기][git]

---

## 빠른 시작
아래 두 가지 방법 중 하나를 선택합니다.

>github URL의 # 뒷버전은 Changelog의 최신 사항을 참고해주세요.

### UPM에서 사용하기
1. UPM을 연 후 좌측 상단의 + 버튼을 누릅니다.
2. `Install package from git URL...`을 선택합니다.
3. `https://github.com/achieveonepark/lite-db.git#1.0.0`를 입력 후 Install합니다.

### 직접 추가하기
1. `Unity Project/Packages/manifest.json` 파일을 실행합니다.
2. `Dependencies`에 `"com.achieve.lite-db": "https://github.com/achieveonepark/lite-db.git#1.0.0"` 내용을 추가합니다.

---

## 설명

### CSV 파일을 db 안에 포함하기
1. Editor 상단의 `GameFramework > Data > CsvImporter`를 클릭합니다.
2. csv 파일과 db 파일을 캐싱한 후 insert!를 클릭하여 db에 포함합니다.


### API

```csharp
LiteDB.Initialize($"{Application.dataPath}/Resources/data.db"); // Path

var a = LiteDB.Get<Quest>(1);
if (LiteDB.TryGetValue<Quest, int>("Quest", 1, out var quest))
{
    var reward = quest.reward;
}
```


## Dependencies



---

## ChangeLog
[link](https://github.com/achieveonepark/lite-db/blob/main/CHANGELOG.md)

[git]: https://github.com/achieveonepark/lite-db