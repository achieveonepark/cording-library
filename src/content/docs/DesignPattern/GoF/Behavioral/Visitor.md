---
title: Visitor
---

객체 구조를 변경하지 않고 새로운 연산을 추가할 수 있게 하는 패턴입니다. 연산을 수행할 객체(Visitor)와 연산을 적용받을 객체(Element)를 분리하여, 새로운 연산을 추가할 때마다 Element 클래스를 수정할 필요 없이 Visitor 클래스만 추가하면 됩니다.

## 구현부
Visitor 패턴은 주로 다음 요소들로 구성됩니다.

### Visitor (방문자)
- Element 객체에 적용될 연산을 선언하는 인터페이스 또는 추상 클래스입니다.
- 각 ConcreteElement 타입에 대한 `Visit` 메서드를 오버로드하여 정의합니다.

### ConcreteVisitor (구체적인 방문자)
- Visitor 인터페이스를 구현하여 각 ConcreteElement에 대한 특정 연산을 실제로 구현합니다.

### Element (요소)
- Visitor를 받아들이는 `Accept` 메서드를 선언하는 인터페이스 또는 추상 클래스입니다.

### ConcreteElement (구체적인 요소)
- Element 인터페이스를 구현하며, `Accept` 메서드 내에서 자신을 방문하는 Visitor의 `Visit` 메서드를 호출합니다.

## 예시

```csharp
using System;
using System.Collections.Generic;

// Element 인터페이스
public interface ICarPart
{
    void Accept(ICarPartVisitor visitor);
}

// ConcreteElement: Engine
public class Engine : ICarPart
{
    public void Accept(ICarPartVisitor visitor)
    {
        visitor.Visit(this);
    }

    public void CheckEngine()
    {
        Console.WriteLine("Checking engine.");
    }
}

// ConcreteElement: Wheel
public class Wheel : ICarPart
{
    public string Name { get; private set; }

    public Wheel(string name)
    {
        Name = name;
    }

    public void Accept(ICarPartVisitor visitor)
    {
        visitor.Visit(this);
    }

    public void InflateTire()
    {
        Console.WriteLine($"Inflating {Name} wheel.");
    }
}

// ConcreteElement: Body
public class Body : ICarPart
{
    public void Accept(ICarPartVisitor visitor)
    {
        visitor.Visit(this);
    }

    public void PolishBody()
    {
        Console.WriteLine("Polishing car body.");
    }
}

// ObjectStructure: Car (여러 Element를 포함)
public class Car
{
    List<ICarPart> parts = new List<ICarPart>();

    public Car()
    {
        parts.Add(new Engine());
        parts.Add(new Body());
        parts.Add(new Wheel("front left"));
        parts.Add(new Wheel("front right"));
        parts.Add(new Wheel("back left"));
        parts.Add(new Wheel("back right"));
    }

    public void Accept(ICarPartVisitor visitor)
    {
        foreach (ICarPart part in parts)
        {
            part.Accept(visitor);
        }
    }
}

// Visitor 인터페이스
public interface ICarPartVisitor
{
    void Visit(Engine engine);
    void Visit(Wheel wheel);
    void Visit(Body body);
}

// ConcreteVisitor: CarPartMaintenanceVisitor
public class CarPartMaintenanceVisitor : ICarPartVisitor
{
    public void Visit(Engine engine)
    {
        engine.CheckEngine();
    }

    public void Visit(Wheel wheel)
    {
        wheel.InflateTire();
    }

    public void Visit(Body body)
    {
        body.PolishBody();
    }
}

// ConcreteVisitor: CarPartDisplayVisitor (다른 연산 추가)
public class CarPartDisplayVisitor : ICarPartVisitor
{
    public void Visit(Engine engine)
    {
        Console.WriteLine("Displaying Engine.");
    }

    public void Visit(Wheel wheel)
    {
        Console.WriteLine($"Displaying {wheel.Name} Wheel.");
    }

    public void Visit(Body body)
    {
        Console.WriteLine("Displaying Car Body.");
    }
}

// 사용 예시
public class VisitorExample
{
    public static void Run()
    {
        Car car = new Car();

        // 유지보수 작업을 수행하는 방문자
        ICarPartVisitor maintenanceVisitor = new CarPartMaintenanceVisitor();
        car.Accept(maintenanceVisitor);

        Console.WriteLine("\n--- Another Operation ---");

        // 부품 정보를 표시하는 방문자
        ICarPartVisitor displayVisitor = new CarPartDisplayVisitor();
        car.Accept(displayVisitor);
    }
}
```