---
title: Dirty Flag
---

더티 플래그(Dirty Flag)는 특정 데이터가 변경되어 후속 처리(계산, 렌더링 등)가 필요함을 알리는 간단한 상태 플래그(보통 boolean)입니다. 데이터가 '더러워졌다(dirty)'고 표시해두고, 필요한 시점에 이 플래그를 확인하여 비싼 연산을 수행할지 말지를 결정하는 최적화 기법입니다.

### 왜 사용하는가?

매 프레임마다 수행하기에는 비용이 너무 큰 연산들이 있습니다. 예를 들어,

- 복잡한 UI 요소들의 최종 레이아웃을 계산하는 작업
- 부모-자식 관계로 얽힌 수많은 객체들의 최종 월드(World) 변환 행렬을 계산하는 작업
- 현재 게임 상태를 네트워크로 전송하기 위해 직렬화하는 작업

이런 작업들은 관련 데이터가 변경되지 않았음에도 매번 실행하는 것은 심각한 성능 낭비입니다. 더티 플래그를 사용하면 데이터에 변화가 있을 때만 연산을 수행하도록 강제하여 불필요한 부하를 줄일 수 있습니다.

### 간단한 구현 예제

계층 구조를 가진 `Transform` 컴포넌트를 예로 들어보겠습니다. 자식의 최종 월드 위치는 부모의 위치에 영향을 받으며, 이 계산은 비쌀 수 있습니다.

```csharp
public class Transform
{
    private bool isDirty = true; // 더티 플래그

    private Vector2 localPosition;
    public Vector2 LocalPosition
    {
        get => localPosition;
        set
        {
            localPosition = value;
            isDirty = true; // 데이터가 변경되었으므로 dirty 플래그를 true로 설정
        }
    }

    private Matrix4x4 worldMatrix;
    public Matrix4x4 WorldMatrix
    {
        get
        {
            // 월드 행렬을 요청받았을 때, dirty 플래그를 확인
            if (isDirty)
            {
                // 플래그가 true일 때만 비싼 계산을 수행
                Console.WriteLine("Recalculating world matrix...");
                worldMatrix = CalculateWorldMatrix();
                isDirty = false; // 계산을 완료했으므로 플래그를 false로 초기화
            }

            return worldMatrix;
        }
    }

    public Transform Parent { get; set; }

    private Matrix4x4 CalculateWorldMatrix()
    {
        // 부모가 있다면 부모의 월드 행렬과 자신의 로컬 행렬을 곱하는 등
        // 복잡하고 비싼 계산을 시뮬레이션
        if (Parent == null)
        {
            // return Matrix4x4.CreateTranslation(LocalPosition.X, LocalPosition.Y, 0);
        }
        // return Parent.WorldMatrix * Matrix4x4.CreateTranslation(LocalPosition.X, LocalPosition.Y, 0);
        return new Matrix4x4(); // 예제이므로 간단히 반환
    }
}

// 사용 예시
public class Game
{
    public void Run()
    {
        Transform transform = new Transform();

        // 1. 처음 요청: isDirty가 true이므로 행렬 계산 실행
        var matrix1 = transform.WorldMatrix; 

        // 2. 두 번째 요청: isDirty가 false이므로 이전 계산 결과 즉시 반환 (계산 안 함)
        var matrix2 = transform.WorldMatrix; 

        // 3. 위치 변경: isDirty가 true로 설정됨
        transform.LocalPosition = new Vector2(10, 5);

        // 4. 세 번째 요청: isDirty가 true이므로 행렬 계산 다시 실행
        var matrix3 = transform.WorldMatrix;
    }
}
```

이처럼 더티 플래그는 "계산을 나중으로 미루되(lazy), 필요할 때 한 번만 수행하도록" 만드는 간단하고 강력한 도구입니다.

### 주의사항: 사용을 권장하지 않는 이유

더티 플래그는 명확한 성능상 이점을 제공하지만, 코드의 복잡도를 높이고 버그를 유발할 수 있어 신중하게 사용해야 합니다.

- **복잡도 증가:** 데이터가 변경되는 모든 경로에서 플래그를 `true`로 설정해주는 코드를 잊지 않고 추가해야 합니다. 로직이 복잡해질수록 이를 추적하고 관리하기가 매우 어려워집니다.
- **버그 발생 가능성:** 플래그를 설정하는 코드를 하나라도 빠뜨리면, 데이터가 변경되었음에도 연산이 수행되지 않는 치명적인 버그로 이어집니다. 이런 종류의 버그는 원인을 찾기가 매우 힘듭니다.
- **유지보수의 어려움:** 코드를 리팩토링하거나 새로운 기능을 추가할 때, 숨어있는 더티 플래그 로직을 항상 고려해야 하므로 유지보수가 어려워집니다.

따라서, 이 패턴은 **성능 최적화가 반드시 필요한 병목 지점**에만 제한적으로 사용하는 것이 좋으며, 대부분의 경우에는 더티 플래그 없이 더 명확하고 단순한 코드를 작성하는 것이 장기적으로 더 나은 선택일 수 있습니다.
