---
title: Async Models
sidebar:
  order: 20
---

### 1. async / await

#### Unity에서의 의미
- C# 표준 비동기 모델
- 코드 가독성이 매우 높음
- 비동기 흐름이 *동기 코드처럼* 보임

#### Unity 개발자에게 중요한 포인트
- `await` 이후 코드는 **언제 실행될지 보장되지 않는다**
- MonoBehaviour / GameObject의 수명과 **전혀 자동으로 연동되지 않는다**
- 대상이 Destroy되어도 Task는 계속 실행된다

#### 예외 전파
- `await` 지점에서만 관측 가능
- `async void` 또는 Forget 패턴 사용 시 → 예외는 사실상 유실

#### 취소
- CancellationToken을 **명시적으로 설계하지 않으면 존재하지 않는다**
- 취소는 선택 사항이 아니라, Unity에서는 거의 필수

#### Unity에서 흔한 사고
- 씬 이동 후 await 이후 GameObject 접근
- 이미 닫힌 UI에 결과 반영
- 파괴된 객체가 예외 원인이 됨

#### 예시

❌ 흔한 문제: Destroy 이후 접근
```csharp
async void LoadAndApply()
{
    await Task.Delay(1000);
    // 이 시점에 GameObject가 이미 Destroy됐을 수 있음
    gameObject.SetActive(true);
}
```
<br/>


✅ 기본적인 안전 패턴 (Cancellation 포함)
```csharp
CancellationTokenSource _cts;

void Awake()
{
    _cts = new CancellationTokenSource();
}

async UniTask LoadAndApplyAsync()
{
    await UniTask.Delay(1000, cancellationToken: _cts.Token);

    if (this == null) return; // Unity 특유의 null 체크
    gameObject.SetActive(true);
}

void OnDestroy()
{
    _cts.Cancel();
}
```

#### 포인트
- await 이후 코드는 “미래의 코드”
- CancellationToken은 Unity에선 거의 필수