---
title: Adapter
---
# Adapter

호환되지 않는 인터페이스를 가진 클래스들을 함께 동작할 수 있도록, 하나의 인터페이스를 다른 인터페이스로 변환해주는 패턴입니다. 기존 코드를 변경하지 않고 새로운 클래스를 시스템에 통합하고자 할 때 유용합니다.

## 구현부
Adapter 패턴은 주로 다음 요소들로 구성됩니다.

### Target (타겟)
- 클라이언트가 사용하고자 하는 인터페이스입니다.

### Adaptee (어댑티)
- 클라이언트가 직접 사용하기에는 인터페이스가 호환되지 않는 기존 클래스입니다.

### Adapter (어댑터)
- Adaptee의 인터페이스를 Target 인터페이스에 맞게 변환합니다.
- 클라이언트는 Target 인터페이스를 통해 어댑터를 사용하고, 어댑터는 내부적으로 Adaptee의 메서드를 호출하여 실제 작업을 수행합니다.

## 예시

```csharp
using System;

// Target 인터페이스: 클라이언트가 기대하는 인터페이스
public interface IEuPlug
{
    void Connect();
}

// Adaptee: 기존에 존재하지만 호환되지 않는 클래스 (미국 플러그)
public class UsPlug
{
    public void ConnectToUsSocket()
    {
        Console.WriteLine("Connected to US socket.");
    }
}

// Adapter: UsPlug를 IEuPlug 인터페이스에 맞게 변환
public class UsToEuAdapter : IEuPlug
{
    private readonly UsPlug _usPlug;

    public UsToEuAdapter(UsPlug usPlug)
    {
        _usPlug = usPlug;
    }

    public void Connect()
    {
        Console.WriteLine("Adapter: Converting US plug to EU plug...");
        _usPlug.ConnectToUsSocket();
    }
}

// Client: 유럽 소켓에 플러그를 연결
public class EuSocket
{
    public void PlugIn(IEuPlug plug)
    {
        plug.Connect();
    }
}

// 사용 예시
public class AdapterExample
{
    public static void Run()
    {
        // 클라이언트는 유럽 소켓을 사용
        EuSocket euSocket = new EuSocket();

        // 미국 플러그 객체 생성
        UsPlug usPlug = new UsPlug();

        // 미국 플러그를 직접 유럽 소켓에 연결할 수 없음
        // euSocket.PlugIn(usPlug); // 컴파일 에러

        // 어댑터를 사용하여 미국 플러그를 유럽 소켓에 연결
        IEuPlug adapter = new UsToEuAdapter(usPlug);
        Console.WriteLine("Plugging US plug into EU socket using an adapter:");
        euSocket.PlugIn(adapter);
    }
}
```