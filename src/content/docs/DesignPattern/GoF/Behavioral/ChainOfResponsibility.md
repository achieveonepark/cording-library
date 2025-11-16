---
title: ChainOfResponsibility
---
# ChainOfResponsibility

요청을 처리할 수 있는 객체들을 체인(사슬) 형태로 연결하여, 요청이 처리될 때까지 체인을 따라 객체들에게 차례대로 기회를 주는 패턴입니다. 이를 통해 요청을 보내는 객체와 요청을 처리하는 객체 간의 결합도를 낮출 수 있습니다.

## 구현부
Chain of Responsibility 패턴은 주로 다음 요소들로 구성됩니다.

### Handler (처리자)
- 요청을 처리하는 인터페이스 또는 추상 클래스입니다.
- 다음 처리자를 가리키는 참조를 가집니다.
- 요청을 처리하는 `HandleRequest`와 같은 메서드를 정의합니다.

### ConcreteHandler (구체적인 처리자)
- Handler 인터페이스를 구현하며, 자신이 처리할 수 있는 요청인지 확인하고, 처리할 수 있다면 요청을 처리합니다.
- 처리할 수 없다면, 다음 처리자에게 요청을 전달합니다.

### Client (클라이언트)
- 체인의 첫 번째 처리자에게 요청을 보냅니다.

## 예시

```csharp
using System;

// Handler 추상 클래스
public abstract class Approver
{
    protected Approver _nextApprover;

    public void SetNextApprover(Approver nextApprover)
    {
        _nextApprover = nextApprover;
    }

    public abstract void ProcessRequest(Purchase purchase);
}

// ConcreteHandler: 팀장
public class TeamLeader : Approver
{
    public override void ProcessRequest(Purchase purchase)
    {
        if (purchase.Amount < 1000)
        {
            Console.WriteLine($"팀장: {purchase.Purpose} 구매 승인 (금액: {purchase.Amount})");
        }
        else if (_nextApprover != null)
        {
            _nextApprover.ProcessRequest(purchase);
        }
    }
}

// ConcreteHandler: 부서장
public class DepartmentManager : Approver
{
    public override void ProcessRequest(Purchase purchase)
    {
        if (purchase.Amount < 5000)
        {
            Console.WriteLine($"부서장: {purchase.Purpose} 구매 승인 (금액: {purchase.Amount})");
        }
        else if (_nextApprover != null)
        {
            _nextApprover.ProcessRequest(purchase);
        }
    }
}

// ConcreteHandler: 사장
public class President : Approver
{
    public override void ProcessRequest(Purchase purchase)
    {
        if (purchase.Amount < 10000)
        {
            Console.WriteLine($"사장: {purchase.Purpose} 구매 승인 (금액: {purchase.Amount})");
        }
        else
        {
            Console.WriteLine($"사장: {purchase.Purpose} 구매 거절 (금액: {purchase.Amount}) - 승인 한도 초과");
        }
    }
}

// 요청 객체
public class Purchase
{
    public string Purpose { get; set; }
    public double Amount { get; set; }

    public Purchase(string purpose, double amount)
    {
        Purpose = purpose;
        Amount = amount;
    }
}

// 사용 예시
public class ChainOfResponsibilityExample
{
    public static void Run()
    {
        // 체인 설정
        Approver teamLeader = new TeamLeader();
        Approver manager = new DepartmentManager();
        Approver president = new President();

        teamLeader.SetNextApprover(manager);
        manager.SetNextApprover(president);

        // 요청 생성 및 처리
        Purchase purchase1 = new Purchase("사무용품", 500);
        teamLeader.ProcessRequest(purchase1);

        Purchase purchase2 = new Purchase("노트북", 2500);
        teamLeader.ProcessRequest(purchase2);

        Purchase purchase3 = new Purchase("서버 장비", 8000);
        teamLeader.ProcessRequest(purchase3);

        Purchase purchase4 = new Purchase("회사 차량", 15000);
        teamLeader.ProcessRequest(purchase4);
    }
}
```