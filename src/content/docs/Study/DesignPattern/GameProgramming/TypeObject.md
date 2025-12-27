---
title: Type Object
---

타입 오브젝트 패턴은 객체의 '종류(Type)' 자체를 또 다른 객체로 모델링하는 디자인 패턴입니다. 이를 통해 새로운 종류의 객체를 만들고 싶을 때, 새로운 클래스를 작성하는 대신 데이터(타입 오브젝트)를 추가하는 것만으로 대응할 수 있게 됩니다.

이는 데이터 주도 설계(Data-Driven Design)의 핵심적인 구현 방법 중 하나입니다.

### 왜 사용하는가?

게임에는 수많은 종류의 몬스터, 아이템, 스킬이 등장합니다. 예를 들어 '슬라임', '빨간 슬라임', '왕 슬라임'은 모두 '슬라임'이라는 기본 행동을 공유하지만, 체력, 공격력, 색깔, 크기 같은 속성만 다릅니다.

이들을 각각 `Slime`, `RedSlime`, `KingSlime`처럼 별도의 클래스로 만들면 다음과 같은 문제가 생깁니다.
- **클래스의 폭발적 증가:** 속성 조합만큼 클래스가 늘어나 관리가 어려워집니다.
- **유연성 부족:** 새로운 종류의 몬스터를 추가하려면 프로그래머가 코드를 작성하고 컴파일해야 합니다. 게임 디자이너가 직접 데이터를 수정하여 새로운 종류를 만들 수 없습니다.

타입 오브젝트 패턴을 사용하면, `Monster`라는 단일 클래스와 그 속성을 정의하는 `MonsterType`이라는 데이터 클래스를 분리하여 이러한 문제를 해결할 수 있습니다.

### 간단한 구현 예제

몬스터의 '종류'를 정의하는 `Breed` 클래스(타입 오브젝트)와, 게임 세계에 실제 존재하는 `Monster` 인스턴스를 분리한 예제입니다.

```csharp
// 1. 타입 오브젝트 클래스: 몬스터의 '종류'를 정의.
// 이 데이터는 모든 같은 종류의 몬스터가 공유한다.
public class Breed
{
    public string Name { get; }
    public int BaseHealth { get; }
    public string Attack { get; }

    public Breed(string name, int baseHealth, string attack)
    {
        Name = name;
        BaseHealth = baseHealth;
        Attack = attack;
    }
}

// 2. 인스턴스 클래스: 게임 세계에 실제로 존재하는 몬스터.
public class Monster
{
    // 자신의 '종류'를 타입 오브젝트로 참조
    public Breed Breed { get; }
    
    // 이 몬스터 인스턴스만의 고유한 상태
    public int CurrentHealth { get; private set; }

    public Monster(Breed breed)
    {
        Breed = breed;
        CurrentHealth = breed.BaseHealth; // 체력은 타입 오브젝트의 데이터를 기반으로 초기화
    }

    public string GetAttackMessage()
    {
        // 공격 방식은 타입 오브젝트에 정의된 것을 사용
        return $"{Breed.Name} attacks with {Breed.Attack}!";
    }
}

// 3. 몬스터를 생성하는 팩토리
public class MonsterFactory
{
    private Dictionary<string, Breed> breeds = new Dictionary<string, Breed>();

    public MonsterFactory()
    {
        // 실제로는 이 부분을 JSON이나 XML 파일에서 읽어와서 자동화
        breeds["goblin"] = new Breed("Goblin", 50, "a rusty sword");
        breeds["orc"] = new Breed("Orc", 120, "a huge club");
        breeds["slime"] = new Breed("Slime", 30, "a sticky goo");
    }

    public Monster CreateMonster(string breedName)
    {
        if (breeds.TryGetValue(breedName, out Breed breed))
        {
            return new Monster(breed);
        }
        throw new Exception($"Unknown breed: {breedName}");
    }
}

// 사용 예시
public class Game
{
    public void Start()
    {
        MonsterFactory factory = new MonsterFactory();

        // 코드 변경 없이 데이터에 정의된 대로 몬스터 생성
        Monster goblin = factory.CreateMonster("goblin");
        Monster orc = factory.CreateMonster("orc");

        Console.WriteLine(goblin.GetAttackMessage()); // "Goblin attacks with a rusty sword!"
        Console.WriteLine(orc.GetAttackMessage());   // "Orc attacks with a huge club!"
    }
}
```
이제 게임 디자이너가 `breeds` 데이터 파일에 "dragon"을 추가하기만 하면, 프로그래머의 코드 수정 없이도 게임에 드래곤을 등장시킬 수 있습니다.
