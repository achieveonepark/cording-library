---
title: AbstractFactory
---
# Abstract Factory

서로 관련이 있거나 의존적인 객체들의 집합을 구체적인 클래스를 지정하지 않고 생성할 수 있게 하는 패턴입니다. 즉, 여러 종류의 객체를 생성할 때, 이들을 특정 "제품군"으로 묶어 함께 생성하도록 합니다.

## 구현부
Abstract Factory 패턴은 주로 다음 요소들로 구성됩니다.

### AbstractFactory (추상 팩토리)
- 관련된 제품 객체들을 생성하기 위한 인터페이스를 정의합니다. 각 제품군에 대한 생성 메서드를 포함합니다. (예: `CreateProductA`, `CreateProductB`)

### ConcreteFactory (구체적인 팩토리)
- AbstractFactory 인터페이스를 구현하여 특정 제품군의 객체들을 실제로 생성합니다.

### AbstractProduct (추상 제품)
- 제품 객체에 대한 인터페이스를 정의합니다.

### ConcreteProduct (구체적인 제품)
- AbstractProduct 인터페이스를 구현하여 팩토리가 생성할 구체적인 제품을 정의합니다.

### Client (클라이언트)
- AbstractFactory와 AbstractProduct 인터페이스에만 의존하여 객체를 생성하고 사용합니다.

## 예시

```csharp
using System;

// AbstractProduct A: 의자
public interface IChair
{
    void SitOn();
}

// ConcreteProduct A1: 모던 의자
public class ModernChair : IChair
{
    public void SitOn()
    {
        Console.WriteLine("Sitting on a modern chair.");
    }
}

// ConcreteProduct A2: 빅토리아 시대 의자
public class VictorianChair : IChair
{
    public void SitOn()
    {
        Console.WriteLine("Sitting on a Victorian chair.");
    }
}

// AbstractProduct B: 소파
public interface ISofa
{
    void LieOn();
}

// ConcreteProduct B1: 모던 소파
public class ModernSofa : ISofa
{
    public void LieOn()
    {
        Console.WriteLine("Lying on a modern sofa.");
    }
}

// ConcreteProduct B2: 빅토리아 시대 소파
public class VictorianSofa : ISofa
{
    public void LieOn()
    {
        Console.WriteLine("Lying on a Victorian sofa.");
    }
}

// AbstractFactory
public interface IFurnitureFactory
{
    IChair CreateChair();
    ISofa CreateSofa();
}

// ConcreteFactory 1: 모던 가구 팩토리
public class ModernFurnitureFactory : IFurnitureFactory
{
    public IChair CreateChair()
    {
        return new ModernChair();
    }

    public ISofa CreateSofa()
    {
        return new ModernSofa();
    }
}

// ConcreteFactory 2: 빅토리아 시대 가구 팩토리
public class VictorianFurnitureFactory : IFurnitureFactory
{
    public IChair CreateChair()
    {
        return new VictorianChair();
    }

    public ISofa CreateSofa()
    {
        return new VictorianSofa();
    }
}

// Client
public class FurnitureShop
{
    private readonly IChair _chair;
    private readonly ISofa _sofa;

    public FurnitureShop(IFurnitureFactory factory)
    {
        _chair = factory.CreateChair();
        _sofa = factory.CreateSofa();
    }

    public void DescribeFurniture()
    {
        _chair.SitOn();
        _sofa.LieOn();
    }
}

// 사용 예시
public class AbstractFactoryExample
{
    public static void Run()
    {
        Console.WriteLine("--- Modern Furniture ---");
        FurnitureShop modernShop = new FurnitureShop(new ModernFurnitureFactory());
        modernShop.DescribeFurniture();

        Console.WriteLine("\n--- Victorian Furniture ---");
        FurnitureShop victorianShop = new FurnitureShop(new VictorianFurnitureFactory());
        victorianShop.DescribeFurniture();
    }
}
```