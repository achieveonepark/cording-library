---
title: Singleton
---
# Singleton

클래스의 인스턴스가 오직 하나만 생성되도록 보장하고, 그 인스턴스에 대한 전역적인 접근점을 제공하는 패턴입니다.

## 구현부
Singleton 패턴은 일반적으로 다음 요소들을 포함합니다.

- **비공개(private) 생성자**: 외부에서 `new` 키워드로 인스턴스를 생성하는 것을 막습니다.
- **정적(static) 인스턴스 변수**: 클래스 내부에서 유일한 인스턴스를 저장합니다.
- **정적(static) 접근 메서드**: 유일한 인스턴스를 반환하는 공개(public) 메서드(예: `GetInstance`)를 제공합니다. 이 메서드는 인스턴스가 아직 생성되지 않았을 경우에만 새로 생성합니다.

## 예시

### 기본적인 싱글톤 구현

```csharp
using System;

public class Singleton
{
    // 유일한 인스턴스를 저장할 정적 변수
    private static Singleton _instance;

    // 외부에서 인스턴스 생성을 막기 위한 비공개 생성자
    private Singleton()
    {
        Console.WriteLine("Singleton instance created.");
    }

    // 인스턴스에 접근하기 위한 정적 메서드
    public static Singleton GetInstance()
    {
        if (_instance == null)
        {
            _instance = new Singleton();
        }
        return _instance;
    }

    public void DoSomething()
    {
        Console.WriteLine("Doing something...");
    }
}

// 사용 예시
public class SingletonExample
{
    public static void Run()
    {
        Singleton s1 = Singleton.GetInstance();
        Singleton s2 = Singleton.GetInstance();

        if (s1 == s2)
        {
            Console.WriteLine("s1 and s2 are the same instance.");
        }

        s1.DoSomething();
    }
}
```

### 스레드 안전한 싱글톤 구현 (Thread-Safe)

멀티스레드 환경에서는 여러 스레드가 동시에 `GetInstance` 메서드를 호출하여 여러 인스턴스가 생성될 수 있습니다. 이를 방지하기 위해 `lock`을 사용합니다.

```csharp
using System;

public class ThreadSafeSingleton
{
    private static ThreadSafeSingleton _instance;
    private static readonly object _lock = new object();

    private ThreadSafeSingleton()
    {
        Console.WriteLine("Thread-safe Singleton instance created.");
    }

    public static ThreadSafeSingleton GetInstance()
    {
        // Double-Checked Locking
        if (_instance == null)
        {
            lock (_lock)
            {
                if (_instance == null)
                {
                    _instance = new ThreadSafeSingleton();
                }
            }
        }
        return _instance;
    }
}
```