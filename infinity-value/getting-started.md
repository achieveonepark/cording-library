> For AI agents: the complete documentation index is available at /infinity-value/llms.txt, the full documentation bundle is available at /infinity-value/llms-full.txt.

# 시작하기

## 설치

Unity Package Manager로 패키지를 추가합니다.

```text
https://github.com/achieveonepark/infinity-value.git
```

또는 `Packages/manifest.json`에 추가합니다.

```json
{
  "dependencies": {
    "com.achieve.infinity-value": "https://github.com/achieveonepark/infinity-value.git"
  }
}
```

## 값 생성

```csharp
using Achieve.InfinityValue;

InfinityValue a = 1000;
InfinityValue b = new InfinityValue(1_500_000L);
InfinityValue c = new InfinityValue(1.5e12);
InfinityValue d = new InfinityValue("300B 200A");
```

## 콘텐츠별 단위 이름 사용

시스템마다 다른 접미사가 필요할 때 `InfinityValueUnitNames`를 사용합니다.

```csharp
var currencyUnits = new InfinityValueUnitNames(new[]
{
    "", "K", "M", "B", "T", "Qa", "Qi"
});

var damageUnits = new InfinityValueUnitNames(new[]
{
    "", "a", "b", "c", "d", "e", "f"
});

InfinityValue gold = new InfinityValue("12K", currencyUnits);
InfinityValue damage = new InfinityValue("12a", damageUnits);
```

각 `InfinityValue`는 전달받은 단위 이름 인스턴스를 그대로 가집니다. 산술 연산은 왼쪽 값의 단위 이름을 유지합니다.

```csharp
InfinityValue totalGold = gold + new InfinityValue(5000, currencyUnits);
Debug.Log(totalGold); // 17.00K
```

## 안전한 파싱

```csharp
if (!InfinityValue.TryParse("5B", currencyUnits, out var parsed))
    parsed = InfinityValue.Zero.WithUnitNames(currencyUnits);
```

## 저장과 로드

가장 간단한 영속화 방식은 표시 문자열을 저장하고, 로드 시 같은 단위 이름 세트로 파싱하는 것입니다.

```csharp
PlayerPrefs.SetString("gold", gold.ToString());

string raw = PlayerPrefs.GetString("gold", "0");
InfinityValue.TryParse(raw, currencyUnits, out gold);
```
