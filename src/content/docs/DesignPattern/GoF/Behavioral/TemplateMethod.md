---
title: TemplateMethod
---
# TemplateMethod

알고리즘의 골격(템플릿)을 정의하고, 일부 단계를 서브클래스에서 구현하도록 위임하는 패턴입니다. 알고리즘의 구조는 그대로 유지하면서, 특정 단계의 구현을 서브클래스에서 다양하게 변경할 수 있도록 합니다.

## 구현부
Template Method 패턴은 주로 다음 요소들로 구성됩니다.

### AbstractClass (추상 클래스)
- 알고리즘의 템플릿 메서드를 정의합니다. 이 메서드는 알고리즘의 각 단계를 호출하는 순서를 결정합니다.
- 일부 단계는 추상 메서드로 선언하여 서브클래스에서 구현하도록 강제합니다.
- 일부 단계는 구체적인 메서드로 구현하여 모든 서브클래스에서 공통적으로 사용하도록 합니다.
- 훅(Hook) 메서드를 정의하여 서브클래스가 선택적으로 알고리즘의 특정 지점에서 동작을 추가하거나 변경할 수 있도록 합니다.

### ConcreteClass (구체적인 클래스)
- AbstractClass에서 정의된 추상 메서드를 구현하여 알고리즘의 특정 단계를 완성합니다.
- 필요한 경우 훅 메서드를 오버라이드하여 추가적인 동작을 제공합니다.

## 예시

```csharp
using System;

// AbstractClass: 음료 제조의 템플릿을 정의
public abstract class BeverageMaker
{
    // 템플릿 메서드: 음료 제조의 전체 알고리즘을 정의
    public void PrepareBeverage()
    {
        BoilWater();
        Brew();
        PourInCup();
        AddCondiments();
    }

    // 공통적으로 구현되는 단계
    private void BoilWater()
    {
        Console.WriteLine("물 끓이는 중...");
    }

    private void PourInCup()
    {
        Console.WriteLine("컵에 따르는 중...");
    }

    // 서브클래스에서 구현해야 하는 추상 단계
    protected abstract void Brew();
    protected abstract void AddCondiments();
}

// ConcreteClass: 커피 제조
public class CoffeeMaker : BeverageMaker
{
    protected override void Brew()
    {
        Console.WriteLine("필터로 커피 내리는 중...");
    }

    protected override void AddCondiments()
    {
        Console.WriteLine("설탕과 우유 추가하는 중...");
    }
}

// ConcreteClass: 차 제조
public class TeaMaker : BeverageMaker
{
    protected override void Brew()
    {
        Console.WriteLine("찻잎 우려내는 중...");
    }

    protected override void AddCondiments()
    {
        Console.WriteLine("레몬 추가하는 중...");
    }
}

// 사용 예시
public class TemplateMethodExample
{
    public static void Run()
    {
        Console.WriteLine("커피 제조 시작:");
        BeverageMaker coffeeMaker = new CoffeeMaker();
        coffeeMaker.PrepareBeverage();

        Console.WriteLine("\n차 제조 시작:");
        BeverageMaker teaMaker = new TeaMaker();
        teaMaker.PrepareBeverage();
    }
}
```