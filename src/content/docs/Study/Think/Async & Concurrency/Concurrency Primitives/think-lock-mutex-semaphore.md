---
title: Lock / Mutex / Semaphore
sidebar:
  order: 28
---

## 개요
Lock 계열은 **동시에 접근하지 못하게 막는 도구**다.  
가장 직관적이지만, 가장 위험한 동시성 수단이다.

## Unity에서의 현실
- 메인 스레드에서 Lock → 프레임 정지
- Deadlock 발생 시 원인 추적 극악

## Unity 개발자가 알아야 하는 이유
- 외부 SDK / 네이티브 코드에서 사용 중
- “가끔 멈추는 현상”의 주범

## 대표적인 문제
- Deadlock
- Priority Inversion
- 디버깅 불가능한 프리징

## Unity에서의 권장 원칙
- 가능하면 사용하지 않는다
- 정말 필요할 때만
- 짧고 명확한 임계 구역에서만 사용

## 대안
- Queue
- Message passing
- Actor-like 구조

## 한 줄 요약
> Lock은 **마지막 수단**이다.

### 예시

❌ Unity에서 위험한 패턴
```csharp
object _lock = new object();

void Update()
{
    lock (_lock)
    {
        // ❌ 여기서 다른 스레드 대기하면 프레임 정지
        DoSomethingHeavy();
    }
}
```
<br/>

⚠️ 최소한의 사용 예 (백그라운드 전용)

```csharp
object _lock = new object();
int _sharedValue;

void BackgroundWork()
{
    Task.Run(() =>
    {
        lock (_lock)
        {
            _sharedValue++;
        }
    });
}
```

- 권장
  - 메인 스레드에서 lock ❌
  - 가능한 Queue 구조로 대체