---
title: Decorator
---
# Decorator

객체에 동적으로 새로운 책임(기능)을 추가할 수 있게 하는 패턴입니다. 상속을 통해 기능을 확장하는 대신, 데코레이터(Decorator) 객체로 기존 객체를 감싸서 기능을 확장합니다.

## 구현부
Decorator 패턴은 주로 다음 요소들로 구성됩니다.

### Component (컴포넌트)
- 실제 객체(ConcreteComponent)와 데코레이터(Decorator)가 공통으로 구현하는 인터페이스입니다.

### ConcreteComponent (구체적인 컴포넌트)
- 동적으로 기능을 추가할 실제 객체입니다.

### Decorator (데코레이터)
- Component 인터페이스를 구현하며, 내부에 Component 객체에 대한 참조를 가집니다.
- 클라이언트의 요청을 자신이 감싸고 있는 Component 객체에게 전달하고, 그 전후에 추가적인 작업을 수행합니다.

### ConcreteDecorator (구체적인 데코레이터)
- Decorator를 상속받아 실제로 추가할 기능을 구현합니다.

## 예시

```csharp
using System;

// Component 인터페이스: 커피
public interface ICoffee
{
    string GetDescription();
    double GetCost();
}

// ConcreteComponent: 기본 커피
public class SimpleCoffee : ICoffee
{
    public string GetDescription()
    {
        return "Simple Coffee";
    }

    public double GetCost()
    {
        return 2.0;
    }
}

// Decorator 추상 클래스
public abstract class CoffeeDecorator : ICoffee
{
    protected ICoffee _decoratedCoffee;

    public CoffeeDecorator(ICoffee coffee)
    {
        _decoratedCoffee = coffee;
    }

    public virtual string GetDescription()
    {
        return _decoratedCoffee.GetDescription();
    }

    public virtual double GetCost()
    {
        return _decoratedCoffee.GetCost();
    }
}

// ConcreteDecorator A: 우유 추가
public class MilkDecorator : CoffeeDecorator
{
    public MilkDecorator(ICoffee coffee) : base(coffee) { }

    public override string GetDescription()
    {
        return base.GetDescription() + ", with Milk";
    }

    public override double GetCost()
    {
        return base.GetCost() + 0.5;
    }
}

// ConcreteDecorator B: 설탕 추가
public class SugarDecorator : CoffeeDecorator
{
    public SugarDecorator(ICoffee coffee) : base(coffee) { }

    public override string GetDescription()
    {
        return base.GetDescription() + ", with Sugar";
    }

    public override double GetCost()
    {
        return base.GetCost() + 0.2;
    }
}

// 사용 예시
public class DecoratorExample
{
    public static void Run()
    {
        // 기본 커피
        ICoffee coffee = new SimpleCoffee();
        Console.WriteLine($"Description: {coffee.GetDescription()}, Cost: ${coffee.GetCost()}");

        // 우유 추가
        coffee = new MilkDecorator(coffee);
        Console.WriteLine($"Description: {coffee.GetDescription()}, Cost: ${coffee.GetCost()}");

        // 설탕 추가
        coffee = new SugarDecorator(coffee);
        Console.WriteLine($"Description: {coffee.GetDescription()}, Cost: ${coffee.GetCost()}");

        // 다른 조합: 우유와 설탕을 추가한 커피
        ICoffee sweetMilkyCoffee = new SugarDecorator(new MilkDecorator(new SimpleCoffee()));
        Console.WriteLine($"\nDescription: {sweetMilkyCoffee.GetDescription()}, Cost: ${sweetMilkyCoffee.GetCost()}");
    }
}
```