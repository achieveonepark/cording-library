---
title: Object Pool
---

# Object Pool

## 패턴 한 줄 설명
자주 생성/파괴되는 객체를 재사용해 할당 비용과 GC 스파이크를 줄이는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 총알/이펙트를 많이 만들고 지울 때
- 모바일에서 GC 튐을 줄여야 할 때

## 구성 요소 (역할)
- Pool: 재사용 저장소
- Get: 대여
- Release: 반납

## Unity 예시 (C#)
```csharp
using UnityEngine;
using UnityEngine.Pool;

public sealed class ProjectilePoolController : MonoBehaviour
{
    [SerializeField] private GameObject projectilePrefab;

    private ObjectPool<GameObject> projectilePool;

    private void Awake()
    {
        projectilePool = new ObjectPool<GameObject>(
            createFunc: () => Instantiate(projectilePrefab),
            actionOnGet: projectile => projectile.SetActive(true),
            actionOnRelease: projectile => projectile.SetActive(false),
            actionOnDestroy: projectile => Destroy(projectile),
            collectionCheck: false,
            defaultCapacity: 32,
            maxSize: 256
        );
    }

    public GameObject SpawnProjectile(Vector3 spawnPosition)
    {
        GameObject projectile = projectilePool.Get();
        projectile.transform.position = spawnPosition;
        return projectile;
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
- Flyweight
- Factory Method
- Data Locality
