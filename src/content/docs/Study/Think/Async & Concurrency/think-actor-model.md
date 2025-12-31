---
title: Actor Model
sidebar:
  order: 24
---

#### Unity에서의 의미
- 상태와 실행을 하나의 주체로 묶음
- 메시지 기반 처리

#### Unity 개발자에게 중요한 포인트
- Race Condition을 구조적으로 차단
- 상태 접근이 명확

#### 예외 전파
- Actor 내부에서만 처리되는 경우가 많음
- 외부에서 실패를 인지하기 위한 설계 필요

#### 취소
- 메시지 큐 단위로 제어 가능
- 구조적으로는 가장 안정적

#### Unity에서의 현실
- 구조 복잡도 증가
- 작은 프로젝트에는 과도할 수 있음

#### 예시

❌ 동시 접근으로 한 프레임에 여러 번 호출 시 상태 꼬임
```csharp
int _gold;

async UniTask AddGoldAsync(int value)
{
    int current = _gold;
    await UniTask.Delay(100);
    _gold = current + value;
}
```


✅ 메시지 큐 기반 Actor

```csharp
class GoldActor
{
    int _gold;
    Queue<Action> _queue = new();

    public void Post(Action action)
    {
        _queue.Enqueue(action);
    }

    public void Update()
    {
        while (_queue.Count > 0)
        {
            _queue.Dequeue().Invoke();
        }
    }

    public void AddGold(int value)
    {
        _gold += value;
    }
}

goldActor.Post(() => goldActor.AddGold(10));
```