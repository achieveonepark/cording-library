---
title: Type Object
---

# Type Object

## 패턴 한 줄 설명
객체 타입을 클래스가 아닌 데이터로 모델링해 확장을 데이터 추가로 처리하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 무기/몬스터 타입을 코드 수정 없이 늘릴 때
- 밸런싱 값을 기획 데이터로 관리할 때

## 구성 요소 (역할)
- Type Data: ScriptableObject/테이블
- Runtime Instance: 타입 참조 객체
- Registry: 타입 조회

## Unity 예시 (C#)
```csharp
using UnityEngine;

[CreateAssetMenu(menuName = "Game/Weapon Type Data")]
public sealed class WeaponTypeData : ScriptableObject
{
    public string weaponId;
    public int attackPower;
    public float cooldownSeconds;
}

public sealed class WeaponRuntime
{
    private readonly WeaponTypeData weaponTypeData;

    public WeaponRuntime(WeaponTypeData weaponTypeData)
    {
        this.weaponTypeData = weaponTypeData;
    }

    public int AttackPower => weaponTypeData.attackPower;
}
```

## 장점
- Unity 런타임 성능/구조 개선에 바로 연결됩니다.
- 기능 분리로 테스트와 유지보수가 쉬워집니다.

## 주의할 점
- 패턴 남용 시 추상화 비용이 실익보다 커질 수 있습니다.
- 성능/가독성 트레이드오프를 측정으로 확인해야 합니다.

## 같이 보면 좋은 패턴
- Prototype
- Factory Method
- Component
