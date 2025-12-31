---
title: Job Queue
sidebar:
  order: 26
---

## 개요
Job Queue는 **지금 처리하지 않을 작업을 쌓아두고,  
정해진 타이밍에 순서대로 처리**하는 구조다.

## Unity에서의 역할
- 동시성 문제를 **순서 문제로 변환**
- 메인 스레드 안전 처리 패턴의 핵심

## Unity에서 자주 쓰이는 상황
- 네트워크 응답 처리
- Addressables 로드 결과 반영
- 이벤트 / 로그 / 메시지 처리

## 장점
- Lock 없이 안전한 구조
- 처리 순서가 명확
- 디버깅 용이

## 주의할 점
- Queue만 쌓이고 소비되지 않으면 메모리 증가
- 한 프레임에 과도한 처리 → 프레임 드랍

## 설계 포인트
- 누가 enqueue 하는가
- 누가 dequeue 하는가
- 한 프레임에 몇 개를 처리하는가

## 한 줄 요약
> Job Queue는 **락 대신 순서를 선택하는 구조**다.


### 예시

```csharp
Queue<Action> _jobQueue = new Queue<Action>();

public void Enqueue(Action job)
{
    _jobQueue.Enqueue(job);
}
```

```csharp
void Update()
{
    while (_jobQueue.Count > 0)
    {
        _jobQueue.Dequeue().Invoke();
    }
}
```

사용 예
```csharp
async UniTask LoadDataAsync()
{
    var data = await LoadFromServerAsync();

    Enqueue(() =>
    {
        // 메인 스레드 안전 처리
        ApplyData(data);
    });
}
```

- 포인트
  - 동시성 → 순서 문제로 변환
  - Lock 불필요