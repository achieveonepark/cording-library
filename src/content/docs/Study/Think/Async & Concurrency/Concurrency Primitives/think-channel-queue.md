---
title: Channel Queue
sidebar:
  order: 27
---

## 개요
Channel / Queue는 **생산자와 소비자를 분리**하는 데이터 전달 구조다.  
스레드 경계를 넘는 공식적인 통로 역할을 한다.

## Unity에서의 역할
- 백그라운드 스레드 → 메인 스레드 데이터 전달
- 네트워크 / 파일 IO 결과 수신

## Unity에서 중요한 이유
- 스레드 간 직접 접근을 피할 수 있음
- Lock 없이 안전한 데이터 이동 가능

## 대표 구조
- Producer: ThreadPool, 네트워크 스레드
- Consumer: Update(), 메인 스레드

## 주의할 점
- Consumer가 멈추면 데이터가 계속 쌓임
- 무한 대기 상태(dead wait) 설계 주의

## 설계 포인트
- 큐의 최대 크기
- 소비 타이밍
- 소비 실패 시 처리 전략

## 한 줄 요약
> Channel은 **스레드 경계를 넘는 안전한 통로**다.

### 예시

#### 1.  가장 흔한 형태: ConcurrentQueue<T> + Update()
   - Producer: Task.Run, 네트워크 콜백, 파일 IO, SDK callback 
   - Consumer: Update()에서 TryDequeue로 처리

```csharp
private readonly ConcurrentQueue<System.Action> _queue = new();

void Start()
{
    // Producer (background)
    Task.Run(() =>
    {
        var text = HeavyParseJson(); // 순수 계산/파싱만
        _queue.Enqueue(() => ApplyToUI(text)); // Unity 반영은 action으로 넘김
    });
}

void Update()
{
    // Consumer (main thread)
    while (_queue.TryDequeue(out var action))
        action.Invoke();
}

string HeavyParseJson() => "done";

void ApplyToUI(string text)
{
    Debug.Log(text); // Unity API OK
}
```

- 이 패턴이 좋은 이유
  - lock을 거의 안 써도 됨
  - “Unity API는 무조건 Update에서”라는 규칙을 강제할 수 있음<br/>

#### 2. “요청-응답” 스타일: 결과 데이터 큐 + 상태 머신
네트워크/Addressables 같은 비동기 결과를 프레임 단위로 안전하게 적용할 때 많이 씀.
   - Producer: 결과를 큐에 넣음
   - Consumer: 한 프레임에 N개만 처리(프레임 드랍 방지)

```csharp
private readonly ConcurrentQueue<int> _results = new();
public int maxPerFrame = 5;

void Update()
{
    for (int i = 0; i < maxPerFrame; i++)
    {
        if (!_results.TryDequeue(out var value)) break;
        Apply(value);
    }
}
```

#### 3. 진짜 “Channel” (System.Threading.Channels)을 쓰는 경우
“백그라운드에서 계속 생산되는 스트림”을 다룰 때 유용 (로그 수집, 텔레메트리, 이벤트 버스) <br/>
Unity에서는 보통 ConcurrentQueue로 충분해서, Channel은 좀 고급 선택지임.

