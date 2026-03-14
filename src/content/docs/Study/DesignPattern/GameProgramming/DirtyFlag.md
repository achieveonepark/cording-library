---
title: Dirty Flag
---

# Dirty Flag

## 패턴 한 줄 설명
값이 바뀐 경우에만 비싼 계산을 다시 수행하도록 표시하는 지연 갱신 패턴입니다.

## Unity에서 쓰는 대표 상황
- 스탯 합산/레이아웃 계산이 무거울 때
- 매 프레임 재계산이 불필요할 때

## 구성 요소 (역할)
- Primary Data: 원본 데이터
- Dirty Flag: 재계산 여부
- Cache: 계산 결과

## Unity 예시 (C#)
```csharp
public sealed class PlayerAttackStat
{
    private int baseAttackPower;
    private int equipmentBonusPower;
    private bool needsRecalculation = true;
    private int cachedAttackPower;

    public void SetBaseAttackPower(int value)
    {
        baseAttackPower = value;
        needsRecalculation = true;
    }

    public void SetEquipmentBonusPower(int value)
    {
        equipmentBonusPower = value;
        needsRecalculation = true;
    }

    public int GetFinalAttackPower()
    {
        if (!needsRecalculation)
        {
            return cachedAttackPower;
        }

        cachedAttackPower = baseAttackPower + equipmentBonusPower;
        needsRecalculation = false;
        return cachedAttackPower;
    }
}
```

## 장점
- Unity 런타임 성능/구조 개선에 바로 연결됩니다.
- 기능 분리로 테스트와 유지보수가 쉬워집니다.

## 주의할 점
- 패턴 남용 시 추상화 비용이 실익보다 커질 수 있습니다.
- 성능/가독성 트레이드오프를 측정으로 확인해야 합니다.

## 같이 보면 좋은 패턴
- Observer
- State
- Data Locality
