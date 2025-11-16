---
title: Infinity Value
---

| [🪄github 바로가기][def]

## 빠른 시작
아래 두 가지 방법 중 하나를 선택합니다.

>github URL의 # 뒷버전은 Changelog의 최신 사항을 참고해주세요.

### UPM에서 사용하기
1. UPM을 연 후 좌측 상단의 + 버튼을 누릅니다.
2. `Install package from git URL...`을 선택합니다.
3. `https://github.com/achieveonepark/infinity-value.git#1.0.0`를 입력 후 Install합니다.

### 직접 추가하기
1. `Unity Project/Packages/manifest.json` 파일을 실행합니다.
2. `Dependencies`에 `"com.achieve.infinity-value": "https://github.com/achieveonepark/infinity-value.git#1.0.0"` 내용을 추가합니다.

---

## 설명

### Infinity Value..?
- 게임 개발할 때 `만, 억, 경, 해` 같은 실물의 단위가 아닌 허위의 `A, B, C`의 단위로 책정하여 천문학적인 숫자도 단위별로 쪼개어 사용할 수 있도록 기능을 제공하는 패키지입니다.<br>
- [Newtonsoft Json](https://www.newtonsoft.com/json) 패키지가 설치되어 있는 경우, Serialize할 수 있도록 `JsonConverter`를 자동으로 등록합니다.<br>
- 데이터는 `300F 200E`, `200AE 578AD`와 같은 형태이며 이 형태에서 연산이 일어납니다. ToString을 호출했을 때에도 같은 형태로 출력됩니다.<br>
- 기존에 사용하던 원시 자료형에서 Migration할 수 있습니다.<br>
- C#에서 기본으로 지원하는 `Operator`를 모두 지원합니다. (비교, 계산)<br>
- 아래 `Constructor`를 지원합니다.<br>
```
- int
- long
- BigInteger
- string
- float
```

### 사용법
```
using Achieve.InfinityValue;
using System.Numerics;

public class A
{
    public InfinityValue A;
    public InfinityValue B;
    public InfinityValue C;
    public InfinityValue D;

    public A()
    {
        A = 1;                              // int형 선언 가능
        B = "300F 200C";                    // string형 형식에 맞게 선언 가능
        C = 3.0f;                           // float형 선언 가능
        D = new BigInteger(30000000000000); // BigInteger형 선언 가능 

        var d = A + B;
        var e = B * C;
        var f = B / C;

        Debug.Log(D.ToString()); // "30D"로 출력
    }
}
```

---

## ChangeLog
[link](https://github.com/achieveonepark/InfinityValue/blob/main/CHANGELOG.md)

[def]: https://github.com/achieveonepark/infinity-value