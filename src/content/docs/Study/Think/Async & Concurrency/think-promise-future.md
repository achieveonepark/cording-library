---
title: Promise & Future
sidebar:
  order: 21
---

#### Unity에서의 의미
- 비동기 결과를 “값”으로 다룸
- 체이닝 기반의 흐름 구성

#### Unity 개발자에게 중요한 포인트
- 결과 소비 지점이 분산되기 쉽다
- 누가 최종 책임자인지 흐려지기 쉽다

#### 예외 전파
- 체인 어디선가 처리되지 않으면 묻힘
- 로그만 남고 상태는 조용히 깨질 수 있음

#### 취소
- 기본 개념에 포함되지 않는 경우가 많음
- 취소를 별도 규약으로 설계해야 함

#### Unity에서 흔한 사고
- 오래된 Promise 결과가 최신 상태를 덮어씀
- 씬/오브젝트 수명 종료 후 결과 적용


#### 예시

❌ 오래된 결과가 최신 상태를 덮는 경우
```csharp
Promise<Texture> LoadIcon(string url)
{
    return WebLoader.LoadTexture(url);
}

void ShowIcon(string url)
{
    LoadIcon(url).Then(texture =>
    {
        iconImage.texture = texture;
    });
}
```
<br/>

✅ 요청 ID로 결과 유효성 보장
```csharp
int _requestId;

void ShowIcon(string url)
{
    int id = ++_requestId;

    LoadIcon(url).Then(texture =>
    {
        if (id != _requestId) return;
        iconImage.texture = texture;
    });
}
```

#### 포인트
- Promise는 “값” 중심
- Unity에서는 결과가 아직 유효한지를 항상 확인해야 함