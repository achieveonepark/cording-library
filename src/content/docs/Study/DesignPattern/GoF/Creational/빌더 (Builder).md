---
title: Builder
---
# Builder

복잡한 객체를 생성하는 과정과 표현을 분리하여, 동일한 생성 절차에서 서로 다른 표현 결과를 만들 수 있게 하는 패턴입니다.

## 구현부
Builder 패턴은 주로 다음 요소들로 구성됩니다.

### Builder (빌더)
- 최종 객체를 생성하기 위한 각 단계를 정의하는 인터페이스 또는 추상 클래스입니다.
- 일반적으로 각 단계를 수행하는 메서드(예: `BuildPartA`, `BuildPartB`)와 최종 결과를 반환하는 메서드(예: `GetResult`)를 가집니다.

### ConcreteBuilder (구체적인 빌더)
- Builder 인터페이스를 구현하여 객체의 각 부분을 실제로 생성하고 조립합니다.
- 생성된 객체의 표현을 관리합니다.

### Director (감독)
- Builder 인터페이스를 사용하여 객체를 생성합니다.
- 클라이언트로부터 요청을 받아, Builder의 메서드를 순서대로 호출하여 복잡한 객체를 생성하는 과정을 제어합니다.

### Product (제품)
- 빌더에 의해 생성되는 복잡한 객체입니다.

## 예시

```csharp
using System;
using System.Collections.Generic;

// Product: 생성될 복잡한 객체 (컴퓨터)
public class Computer
{
    private List<string> _parts = new List<string>();

    public void AddPart(string part)
    {
        _parts.Add(part);
    }

    public void Show()
    {
        Console.WriteLine("Computer Parts:");
        foreach (string part in _parts)
        {
            Console.WriteLine($"- {part}");
        }
    }
}

// Builder 인터페이스
public interface IComputerBuilder
{
    void BuildCPU();
    void BuildRAM();
    void BuildStorage();
    Computer GetComputer();
}

// ConcreteBuilder: 고사양 컴퓨터 빌더
public class HighSpecComputerBuilder : IComputerBuilder
{
    private Computer _computer = new Computer();

    public void BuildCPU()
    {
        _computer.AddPart("High-end CPU");
    }

    public void BuildRAM()
    {
        _computer.AddPart("32GB RAM");
    }

    public void BuildStorage()
    {
        _computer.AddPart("1TB NVMe SSD");
    }

    public Computer GetComputer()
    {
        return _computer;
    }
}

// ConcreteBuilder: 저사양 컴퓨터 빌더
public class LowSpecComputerBuilder : IComputerBuilder
{
    private Computer _computer = new Computer();

    public void BuildCPU()
    {
        _computer.AddPart("Low-end CPU");
    }

    public void BuildRAM()
    {
        _computer.AddPart("8GB RAM");
    }

    public void BuildStorage()
    {
        _computer.AddPart("512GB SATA SSD");
    }

    public Computer GetComputer()
    {
        return _computer;
    }
}

// Director
public class ComputerDirector
{
    public void Construct(IComputerBuilder builder)
    {
        builder.BuildCPU();
        builder.BuildRAM();
        builder.BuildStorage();
    }
}

// 사용 예시
public class BuilderExample
{
    public static void Run()
    {
        ComputerDirector director = new ComputerDirector();

        // 고사양 컴퓨터 생성
        IComputerBuilder highSpecBuilder = new HighSpecComputerBuilder();
        director.Construct(highSpecBuilder);
        Computer highSpecComputer = highSpecBuilder.GetComputer();
        Console.WriteLine("High-Spec Computer built:");
        highSpecComputer.Show();

        Console.WriteLine();

        // 저사양 컴퓨터 생성
        IComputerBuilder lowSpecBuilder = new LowSpecComputerBuilder();
        director.Construct(lowSpecBuilder);
        Computer lowSpecComputer = lowSpecBuilder.GetComputer();
        Console.WriteLine("Low-Spec Computer built:");
        lowSpecComputer.Show();
    }
}
```