---
title: Proxy
---
# Proxy

다른 객체에 대한 접근을 제어하기 위해 대리인(Proxy)을 제공하는 패턴입니다. 프록시는 실제 객체와 동일한 인터페이스를 가지며, 클라이언트는 실제 객체 대신 프록시 객체를 통해 간접적으로 실제 객체에 접근합니다. 이를 통해 접근 제어, 비용이 큰 객체의 지연 로딩, 원격 객체 접근 등 다양한 기능을 추가할 수 있습니다.

## 구현부
Proxy 패턴은 주로 다음 요소들로 구성됩니다.

### Subject (주체)
- RealSubject와 Proxy가 공통으로 구현하는 인터페이스입니다. 클라이언트는 이 인터페이스를 통해 RealSubject와 Proxy를 동일하게 다룰 수 있습니다.

### RealSubject (실제 주체)
- 프록시가 제어하려는 실제 객체입니다.

### Proxy (프록시)
- RealSubject와 동일한 인터페이스를 가지며, RealSubject에 대한 참조를 유지합니다.
- 클라이언트의 요청을 중간에서 가로채, 추가적인 로직(접근 제어, 캐싱 등)을 수행한 후 RealSubject에게 요청을 전달하거나 직접 처리합니다.

## 예시

### 가상 프록시 (Virtual Proxy)
- 생성 비용이 큰 객체의 생성을 필요한 시점까지 지연시키는 예시입니다.

```csharp
using System;

// Subject 인터페이스
public interface IImage
{
    void Display();
}

// RealSubject: 실제 이미지 객체 (생성 비용이 크다고 가정)
public class RealImage : IImage
{
    private string _fileName;

    public RealImage(string fileName)
    {
        _fileName = fileName;
        LoadFromDisk(fileName);
    }

    private void LoadFromDisk(string fileName)
    {
        Console.WriteLine($"Loading image: {fileName}");
        // 디스크에서 이미지를 로드하는 복잡한 작업 시뮬레이션
        System.Threading.Thread.Sleep(2000);
    }

    public void Display()
    {
        Console.WriteLine($"Displaying image: {_fileName}");
    }
}

// Proxy: 이미지 로딩을 지연시키는 프록시
public class ProxyImage : IImage
{
    private RealImage _realImage;
    private string _fileName;

    public ProxyImage(string fileName)
    {
        _fileName = fileName;
    }

    public void Display()
    {
        if (_realImage == null)
        {
            // 실제 이미지가 필요한 시점에 생성
            _realImage = new RealImage(_fileName);
        }
        _realImage.Display();
    }
}

// 사용 예시
public class ProxyExample
{
    public static void Run()
    {
        // 프록시를 통해 이미지 객체 생성 (이때는 로딩되지 않음)
        IImage image1 = new ProxyImage("image1.jpg");
        IImage image2 = new ProxyImage("image2.png");

        Console.WriteLine("--- First Display Call ---");
        // Display 메서드가 처음 호출될 때 실제 이미지가 로딩됨
        image1.Display();

        Console.WriteLine("\n--- Second Display Call (Cached) ---");
        // 이미 로딩되었으므로 바로 표시됨
        image1.Display();

        Console.WriteLine("\n--- Displaying another image ---");
        image2.Display();
    }
}
```