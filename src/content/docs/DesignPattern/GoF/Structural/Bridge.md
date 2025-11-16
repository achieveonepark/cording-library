---
title: Bridge
---
# Bridge

구현부에서 추상부를 분리하여, 이 둘이 독립적으로 확장될 수 있도록 하는 패턴입니다. 즉, '기능의 계층'과 '구현의 계층'을 분리하여 각각을 독립적으로 발전시킬 수 있습니다.

## 구현부
Bridge 패턴은 주로 다음 요소들로 구성됩니다.

### Abstraction (추상부)
- 기능 계층의 최상위 클래스로, 구현부(Implementor)에 대한 참조를 가집니다.
- 클라이언트가 사용할 메서드를 정의하고, 이 메서드는 구현부의 메서드를 호출하여 실제 작업을 위임합니다.

### RefinedAbstraction (정제된 추상부)
- Abstraction을 상속받아 기능을 확장합니다.

### Implementor (구현부)
- 구현 계층의 최상위 인터페이스로, Abstraction이 사용할 메서드를 정의합니다.

### ConcreteImplementor (구체적인 구현부)
- Implementor 인터페이스를 구현하여 실제 기능을 구체적으로 구현합니다.

## 예시

```csharp
using System;

// Implementor: 메시지 전송 구현부 인터페이스
public interface IMessageSender
{
    void SendMessage(string subject, string body);
}

// ConcreteImplementor A: 이메일 전송
public class EmailSender : IMessageSender
{
    public void SendMessage(string subject, string body)
    {
        Console.WriteLine($"Email Sent:\n  Subject: {subject}\n  Body: {body}");
    }
}

// ConcreteImplementor B: SMS 전송
public class SmsSender : IMessageSender
{
    public void SendMessage(string subject, string body)
    {
        Console.WriteLine($"SMS Sent:\n  Message: {subject} - {body}");
    }
}

// Abstraction: 메시지 기능 추상부
public abstract class Message
{
    protected IMessageSender _messageSender;

    protected Message(IMessageSender messageSender)
    {
        _messageSender = messageSender;
    }

    public abstract void Send();
}

// RefinedAbstraction: 간단한 메시지
public class SimpleMessage : Message
{
    public string Subject { get; set; }
    public string Body { get; set; }

    public SimpleMessage(IMessageSender messageSender, string subject, string body) : base(messageSender)
    {
        Subject = subject;
        Body = body;
    }

    public override void Send()
    {
        _messageSender.SendMessage(Subject, Body);
    }
}

// RefinedAbstraction: 암호화된 메시지
public class EncryptedMessage : Message
{
    public string Subject { get; set; }
    public string Body { get; set; }

    public EncryptedMessage(IMessageSender messageSender, string subject, string body) : base(messageSender)
    {
        Subject = subject;
        Body = body;
    }

    public override void Send()
    {
        string encryptedBody = $"[Encrypted] {Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(Body))} [Encrypted]";
        _messageSender.SendMessage(Subject, encryptedBody);
    }
}

// 사용 예시
public class BridgeExample
{
    public static void Run()
    {
        // 이메일로 간단한 메시지 보내기
        Message emailMessage = new SimpleMessage(new EmailSender(), "Hello", "This is a simple email.");
        emailMessage.Send();

        Console.WriteLine();

        // SMS로 간단한 메시지 보내기
        Message smsMessage = new SimpleMessage(new SmsSender(), "Hi", "This is a simple SMS.");
        smsMessage.Send();

        Console.WriteLine();

        // 이메일로 암호화된 메시지 보내기
        Message encryptedEmail = new EncryptedMessage(new EmailSender(), "Secret", "This is a secret message.");
        encryptedEmail.Send();
    }
}
```