---
title: Object Pool
---

오브젝트 풀은 재사용이 잦은 객체들을 미리 정해진 개수만큼 만들어 풀(Pool)에 저장해두고, 필요할 때마다 빌려 쓰고 사용이 끝나면 반납하는 방식의 디자인 패턴입니다.

### 왜 사용하는가?

게임에서는 총알, 이펙트, 몬스터처럼 짧은 시간 동안 대량으로 생성되고 파괴되는 객체들이 많습니다. 이러한 객체들을 필요할 때마다 `new` 키워드로 생성(Instantiate)하고 파괴(Destroy)하면 다음과 같은 문제가 발생합니다.

- **메모리 할당/해제 비용:** 객체를 생성하고 파괴하는 과정은 CPU에 상당한 부담을 줍니다.
- **가비지 컬렉션(GC) 부하:** 파괴된 객체들은 가비지(쓰레기)가 되어 GC의 대상이 됩니다. GC가 동작하는 순간 게임이 일시적으로 멈추는 현상(Frame Drop)이 발생할 수 있습니다.

오브젝트 풀은 이러한 문제를 해결하여 게임의 전반적인 성능과 안정성을 높여줍니다.

### 간단한 구현 예제

아래는 오브젝트 풀의 개념을 보여주는 C# 코드입니다. `PooledObject`는 풀에서 관리될 게임 객체를 나타냅니다.

```csharp
// 풀에서 관리될 객체의 기본 클래스
public class PooledObject
{
    public bool IsActive { get; set; }

    public void Use()
    {
        IsActive = true;
        // ... 객체 활성화 로직
        Console.WriteLine("Object has been activated.");
    }

    public void Free()
    {
        IsActive = false;
        // ... 객체 비활성화 로직
        Console.WriteLine("Object has been returned to the pool.");
    }
}

// 오브젝트 풀 클래스
public class ObjectPool
{
    private List<PooledObject> pool;
    private int poolSize;

    public ObjectPool(int size)
    {
        poolSize = size;
        pool = new List<PooledObject>(poolSize);

        for (int i = 0; i < poolSize; i++)
        {
            pool.Add(new PooledObject());
        }
    }

    public PooledObject GetObject()
    {
        foreach (var obj in pool)
        {
            if (!obj.IsActive)
            {
                obj.Use();
                return obj;
            }
        }

        // 모든 객체가 사용 중일 경우 null 또는 예외 처리
        // 혹은 풀 크기를 동적으로 늘리는 로직을 추가할 수 있습니다.
        Console.WriteLine("No available object in the pool.");
        return null;
    }

    public void ReturnObject(PooledObject obj)
    {
        obj.Free();
    }
}

// 사용 예시
public class Game
{
    public void Start()
    {
        ObjectPool bulletPool = new ObjectPool(10); // 총알 10개를 미리 생성

        // 총알 발사
        PooledObject bullet1 = bulletPool.GetObject();
        PooledObject bullet2 = bulletPool.GetObject();

        // 총알이 사라짐 (파괴 대신 반납)
        if (bullet1 != null)
        {
            bulletPool.ReturnObject(bullet1);
        }
    }
}
```

### Unity에서의 사용: `UnityEngine.Pool`

위 예제는 오브젝트 풀의 개념을 설명하기 위한 것입니다. **실제 Unity 프로젝트에서는 직접 풀을 구현하기보다 Unity가 공식적으로 제공하는 `UnityEngine.Pool` 네임스페이스의 클래스들을 사용하는 것이 좋습니다.**

- **`ObjectPool<T>`:** Unity에서 제공하는 제네릭 오브젝트 풀 클래스입니다.
- **사용 이유:**
    - **표준 API:** Unity 엔진에 최적화되어 있으며, 모든 Unity 개발자가 이해할 수 있는 표준적인 방법을 제공합니다.
    - **편의 기능:** 객체를 생성/파괴할 때, 풀에서 가져오거나 반납할 때 실행할 액션(Action)을 델리게이트(delegate)로 쉽게 지정할 수 있습니다.
    - **안정성:** 직접 구현할 때 발생할 수 있는 여러 엣지 케이스들을 Unity 엔진 차원에서 안정적으로 처리해줍니다.

따라서 Unity 환경이라면, 개념 이해를 위해 위 코드를 참고하되 실제 개발에서는 `UnityEngine.Pool.ObjectPool<T>`를 사용하는 것을 강력히 권장합니다.
