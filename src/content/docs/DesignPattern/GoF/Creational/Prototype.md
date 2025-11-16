---
title: Prototype
---
# Prototype

기존 객체를 복사하여 새로운 객체를 생성하는 패턴입니다. 객체 생성 비용이 높거나, 클래스로부터 직접 객체를 생성하는 것이 복잡할 때 유용합니다.

## 구현부
Prototype 패턴은 주로 다음 요소들로 구성됩니다.

### Prototype (프로토타입)
- 자신을 복제하는 데 필요한 인터페이스를 정의합니다. 일반적으로 `Clone` 메서드를 포함합니다.

### ConcretePrototype (구체적인 프로토타입)
- Prototype 인터페이스를 구현하여 자신을 복제하는 `Clone` 메서드를 실제로 구현합니다.

### Client (클라이언트)
- 기존 객체의 `Clone` 메서드를 호출하여 새로운 객체를 생성합니다.

## 예시

```csharp
using System;

// Prototype 추상 클래스
public abstract class Shape
{
    public string Id { get; set; }
    public string Type { get; protected set; }

    public abstract Shape Clone();

    public void ShowInfo()
    {
        Console.WriteLine($"Shape: {Type}, Id: {Id}");
    }
}

// ConcretePrototype: 원
public class Circle : Shape
{
    public double Radius { get; set; }

    public Circle()
    {
        Type = "Circle";
    }

    public override Shape Clone()
    {
        // MemberwiseClone을 사용한 얕은 복사
        return this.MemberwiseClone() as Circle;
    }
}

// ConcretePrototype: 사각형
public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }

    public Rectangle()
    {
        Type = "Rectangle";
    }

    public override Shape Clone()
    {
        // MemberwiseClone을 사용한 얕은 복사
        return this.MemberwiseClone() as Rectangle;
    }
}

// 사용 예시
public class PrototypeExample
{
    public static void Run()
    {
        // 원본 객체 생성
        Circle originalCircle = new Circle
        {
            Id = "Circle1",
            Radius = 10.5
        };

        Rectangle originalRectangle = new Rectangle
        {
            Id = "Rectangle1",
            Width = 20,
            Height = 10
        };

        // 원본 객체 복제
        Circle clonedCircle = originalCircle.Clone() as Circle;
        clonedCircle.Id = "Circle2"; // 복제된 객체의 속성 변경

        Rectangle clonedRectangle = originalRectangle.Clone() as Rectangle;
        clonedRectangle.Id = "Rectangle2"; // 복제된 객체의 속성 변경

        // 정보 출력
        Console.WriteLine("Original Objects:");
        originalCircle.ShowInfo();
        originalRectangle.ShowInfo();

        Console.WriteLine("\nCloned Objects:");
        clonedCircle.ShowInfo();
        clonedRectangle.ShowInfo();
    }
}
```