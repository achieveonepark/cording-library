---
title: Flyweight
---
# Flyweight

많은 수의 객체를 효율적으로 지원하기 위해 객체를 공유하여 사용하는 패턴입니다. 객체의 상태를 모든 객체가 공유하는 '내재적 상태(Intrinsic State)'와 각 객체마다 고유한 '외재적 상태(Extrinsic State)'로 분리하여, 내재적 상태를 공유함으로써 메모리 사용량을 줄입니다.

## 구현부
Flyweight 패턴은 주로 다음 요소들로 구성됩니다.

### Flyweight (플라이웨이트)
- 공유될 객체에 대한 인터페이스를 정의합니다.
- 외재적 상태를 매개변수로 받아 동작하는 메서드를 포함합니다.

### ConcreteFlyweight (구체적인 플라이웨이트)
- Flyweight 인터페이스를 구현하며, 내재적 상태를 저장합니다.
- 이 객체는 공유되어야 하므로, 여러 컨텍스트에서 동시에 사용될 수 있어야 합니다.

### UnsharedConcreteFlyweight (공유되지 않는 플라이웨이트)
- Flyweight 인터페이스를 구현하지만, 공유되지 않는 객체입니다. (선택적)

### FlyweightFactory (플라이웨이트 팩토리)
- 플라이웨이트 객체를 생성하고 관리합니다.
- 클라이언트로부터 요청이 오면, 이미 생성된 플라이웨이트가 있는지 확인하고, 있으면 기존 객체를 반환하고 없으면 새로 생성하여 반환합니다.

### Client (클라이언트)
- 플라이웨이트 객체를 사용하며, 외재적 상태를 계산하거나 저장하여 플라이웨이트 메서드에 전달합니다.

## 예시

```csharp
using System;
using System.Collections.Generic;

// Flyweight 인터페이스
public interface ICharacter
{
    void Display(int x, int y); // 외재적 상태 (좌표)
}

// ConcreteFlyweight: 특정 문자
public class Character : ICharacter
{
    // 내재적 상태 (공유됨)
    private readonly char _symbol;
    private readonly string _font;
    private readonly int _size;

    public Character(char symbol, string font, int size)
    {
        _symbol = symbol;
        _font = font;
        _size = size;
        Console.WriteLine($"Creating new character: {_symbol} ({_font}, {_size}pt)");
    }

    public void Display(int x, int y)
    {
        Console.WriteLine($"  - Drawing '{_symbol}' at ({x}, {y})");
    }
}

// FlyweightFactory
public class CharacterFactory
{
    private Dictionary<char, ICharacter> _characters = new Dictionary<char, ICharacter>();

    public ICharacter GetCharacter(char key)
    {
        if (!_characters.ContainsKey(key))
        {
            // 간단한 예시를 위해 폰트와 크기는 고정
            _characters[key] = new Character(key, "Arial", 12);
        }
        return _characters[key];
    }
}

// 사용 예시
public class FlyweightExample
{
    public static void Run()
    {
        string document = "ABBCBCBA";
        char[] chars = document.ToCharArray();

        CharacterFactory factory = new CharacterFactory();

        int x = 0;
        int y = 0;

        foreach (char c in chars)
        {
            // 동일한 문자에 대해서는 객체를 공유
            ICharacter character = factory.GetCharacter(c);
            character.Display(x++, y);
        }
    }
}
```