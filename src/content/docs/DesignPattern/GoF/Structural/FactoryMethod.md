---
title: FactoryMethod
---
# Factory Method

객체를 생성하기 위한 인터페이스를 정의하되, 어떤 클래스의 인스턴스를 생성할지에 대한 결정은 서브클래스가 내리도록 하는 패턴입니다. 즉, 객체 생성 과정을 서브클래스에 위임합니다.

## 구현부
Factory Method 패턴은 주로 다음 요소들로 구성됩니다.

### Product (제품)
- 팩토리 메서드가 생성할 객체의 공통 인터페이스입니다.

### ConcreteProduct (구체적인 제품)
- Product 인터페이스를 구현하는 구체적인 클래스입니다.

### Creator (생성자)
- Product 객체를 생성하는 팩토리 메서드(`FactoryMethod`)를 선언하는 추상 클래스입니다.
- 팩토리 메서드는 기본 구현을 가질 수도 있습니다.

### ConcreteCreator (구체적인 생성자)
- Creator 클래스를 상속받아, 팩토리 메서드를 오버라이드하여 특정 ConcreteProduct를 생성합니다.

## 예시

```csharp
using System;

// Product 인터페이스
public interface ITransport
{
    void Deliver();
}

// ConcreteProduct A: 트럭
public class Truck : ITransport
{
    public void Deliver()
    {
        Console.WriteLine("Delivering by land in a truck.");
    }
}

// ConcreteProduct B: 배
public class Ship : ITransport
{
    public void Deliver()
    {
        Console.WriteLine("Delivering by sea in a ship.");
    }
}

// Creator 추상 클래스
public abstract class Logistics
{
    // 팩토리 메서드
    public abstract ITransport CreateTransport();

    public void PlanDelivery()
    {
        // 팩토리 메서드를 호출하여 제품 객체를 생성
        ITransport transport = CreateTransport();
        Console.WriteLine("Planning delivery...");
        transport.Deliver();
    }
}

// ConcreteCreator A: 도로 운송
public class RoadLogistics : Logistics
{
    public override ITransport CreateTransport()
    {
        return new Truck();
    }
}

// ConcreteCreator B: 해상 운송
public class SeaLogistics : Logistics
{
    public override ITransport CreateTransport()
    {
        return new Ship();
    }
}

// 사용 예시
public class FactoryMethodExample
{
    public static void Run()
    {
        Logistics roadLogistics = new RoadLogistics();
        roadLogistics.PlanDelivery();

        Console.WriteLine();

        Logistics seaLogistics = new SeaLogistics();
        seaLogistics.PlanDelivery();
    }
}
```