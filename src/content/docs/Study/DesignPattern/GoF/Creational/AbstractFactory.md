---
title: AbstractFactory
---

# Abstract Factory

## 패턴 한 줄 설명
연관된 객체 묶음을 구체 타입 의존 없이 생성하는 패턴입니다.

## Unity에서 쓰는 대표 상황
- 플랫폼별 서비스 묶음을 통째로 교체할 때
- 테스트용 제품군을 분리할 때

## 구성 요소 (역할)
- Abstract Factory
- Concrete Factory
- Abstract Product

## Unity 예시 (C#)
```csharp
public interface IPlatformServiceFactory
{
    ILoginService CreateLoginService();
    IStoreService CreateStoreService();
}

public sealed class MobilePlatformServiceFactory : IPlatformServiceFactory
{
    public ILoginService CreateLoginService() => new MobileLoginService();
    public IStoreService CreateStoreService() => new MobileStoreService();
}

public sealed class PcPlatformServiceFactory : IPlatformServiceFactory
{
    public ILoginService CreateLoginService() => new PcLoginService();
    public IStoreService CreateStoreService() => new PcStoreService();
}
```

## 장점
- 객체 생성 책임을 정리해 의존성 관리가 쉬워집니다.
- 환경별/상황별 생성 정책을 유연하게 바꿀 수 있습니다.

## 주의할 점
- 간단한 문제에 과한 생성 추상화를 넣지 않아야 합니다.
- 생성 규칙이 많아질수록 문서와 테스트 동기화가 중요합니다.

## 같이 보면 좋은 패턴
- Factory Method
- Builder
- Service Locator
