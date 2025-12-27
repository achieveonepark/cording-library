---
title: Data Locality
---

### 데이터 지역성 원리

데이터 지역성은 디자인 패턴이라기보다는, CPU 캐시의 효율을 극대화하기 위해 데이터를 메모리에 구성하는 방법에 대한 하드웨어 수준의 최적화 원리입니다. 핵심은 **"다음에 사용될 데이터는 지금 사용 중인 데이터와 가까운 곳에 있어야 한다"** 입니다.

### 왜 중요한가?

CPU는 메인 메모리(RAM)보다 훨씬 빠른 캐시(Cache) 메모리를 가지고 있습니다. CPU가 RAM에서 데이터를 읽는 속도는 캐시에서 읽는 속도보다 수십~수백 배 느립니다.

CPU는 RAM에서 특정 데이터를 읽을 때, 그 데이터 하나만 가져오는 것이 아니라 그 주변의 데이터 덩어리(이를 '캐시 라인'이라 부름, 보통 64바이트)를 통째로 캐시로 가져옵니다.

따라서 우리가 처리해야 할 데이터들이 메모리상에 연속적으로 모여있다면, 첫 데이터를 읽을 때 나머지 데이터들도 캐시에 함께 올라올 확률이 높습니다. 그 결과, 대부분의 데이터 접근이 매우 빠른 '캐시 히트(Cache Hit)'가 되어 프로그램의 처리 속도가 극적으로 향상됩니다.

### 데이터 지역성이 낮은 경우 (Bad Locality)

일반적인 컴포넌트 패턴은 각 `GameObject`가 필요한 컴포넌트들을 참조(포인터)로 들고 있습니다.

```csharp
// 각 GameObject가 자신의 컴포넌트를 소유
// 메모리 상에서 각 TransformComponent는 서로 멀리 떨어져 있을 수 있음
GameObject[] gameObjects = new GameObject[1000]; 
// gameObjects[0].transform, gameObjects[1].transform ...

// 모든 객체의 위치를 업데이트하려면?
foreach (var go in gameObjects)
{
    // 매번 다른 메모리 주소로 점프해야 함 -> 캐시 미스(Cache Miss) 발생 확률 높음
    go.transform.position += go.velocity * deltaTime; 
}
```

### 데이터 지역성이 높은 경우 (Good Locality)

데이터 자체를 중심으로 데이터를 구성합니다. 이는 **ECS(Entity Component System)** 아키텍처의 핵심 아이디어입니다.

```csharp
// 데이터 종류별로 배열을 관리
// 같은 종류의 데이터는 메모리상에 연속적으로 위치함
PositionComponent[] positions = new PositionComponent[1000];
VelocityComponent[] velocities = new VelocityComponent[1000];

// 모든 객체의 위치를 업데이트하려면?
for (int i = 0; i < 1000; i++)
{
    // 메모리를 순차적으로 접근 -> 캐시 히트(Cache Hit) 발생 확률 매우 높음
    positions[i].value += velocities[i].value * deltaTime;
}
```

### 결론

데이터 지역성을 고려한다는 것은 객체지향의 '개념적 묶음' 대신, 실제 데이터가 메모리에서 어떻게 배치되는지를 우선으로 생각하여 데이터 구조를 설계하는 것을 의미합니다. 대규모 데이터를 처리해야 하는 게임이나 고성능 컴퓨팅 환경에서 이는 선택이 아닌 필수적인 최적화 기법입니다.
