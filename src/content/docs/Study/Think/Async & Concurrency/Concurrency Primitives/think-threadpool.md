---
title: ThreadPool
sidebar:
  order: 25
---

## 개요
ThreadPool은 런타임(.NET / OS)이 관리하는 **공용 워커 스레드 집합**이다.  
Unity에서는 `Task.Run`, `async/await` 뒤에서 **암묵적으로 사용**된다.

## Unity에서의 역할
- 메인 스레드를 막지 않기 위한 **순수 계산 전용 공간**
- 파싱, 암호화, 압축, 경로 계산 등 CPU 연산 처리

## Unity에서 중요한 제약
- Unity API 호출 ❌
- GameObject / MonoBehaviour 접근 ❌
- 실행 순서 보장 ❌

## 왜 Unity 개발자가 알아야 하는가
- `async/await`를 쓰는 순간 이미 사용 중
- “백그라운드에서 돈다”는 말의 실제 정체
- 스레드 포화 시 전체 성능 저하 원인

## 자주 발생하는 문제
- ThreadPool에서 Unity 객체 접근 → 크래시 / undefined behavior
- 과도한 Task 생성 → 워커 스레드 고갈

## 한 줄 요약
> ThreadPool은 **Unity 바깥에서 계산만 하는 공간**이다.


### 예시

```csharp
async UniTask<int> CalculateScoreAsync()
{
    return await Task.Run(() =>
    {
        // 순수 계산만
        int score = 0;
        for (int i = 0; i < 1_000_000; i++)
            score += i;
        return score;
    });
}
```