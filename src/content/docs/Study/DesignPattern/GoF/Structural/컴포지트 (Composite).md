---
title: Composite
---
# Composite

객체들을 트리 구조로 구성하여, 개별 객체(Leaf)와 복합 객체(Composite)를 동일한 방식으로 다룰 수 있게 하는 패턴입니다. 이를 통해 클라이언트는 객체가 단일 객체인지 복합 객체인지 신경 쓰지 않고 일관된 인터페이스로 작업을 처리할 수 있습니다.

## 구현부
Composite 패턴은 주로 다음 요소들로 구성됩니다.

### Component (컴포넌트)
- 개별 객체(Leaf)와 복합 객체(Composite)가 공통으로 구현하는 인터페이스입니다.
- 트리 구조의 모든 객체에 대한 공통 연산을 선언합니다. (예: `Operation`)
- 자식 객체를 관리하는 메서드(예: `Add`, `Remove`, `GetChild`)를 포함할 수 있습니다.

### Leaf (리프)
- Component 인터페이스를 구현하는 개별 객체입니다.
- 자식을 가지지 않으므로, 자식 관리 메서드는 비워두거나 예외를 발생시킬 수 있습니다.

### Composite (컴포지트)
- Component 인터페이스를 구현하는 복합 객체입니다.
- 자식 객체(Leaf 또는 다른 Composite)들을 저장하고 관리합니다.
- `Operation` 메서드를 구현할 때, 자신의 자식들의 `Operation` 메서드를 재귀적으로 호출합니다.

## 예시

```csharp
using System;
using System.Collections.Generic;

// Component 인터페이스
public interface IFileSystemItem
{
    string Name { get; set; }
    void Display(int depth);
}

// Leaf: 파일
public class File : IFileSystemItem
{
    public string Name { get; set; }

    public File(string name)
    {
        Name = name;
    }

    public void Display(int depth)
    {
        Console.WriteLine(new string('-', depth) + " " + Name);
    }
}

// Composite: 폴더
public class Folder : IFileSystemItem
{
    public string Name { get; set; }
    private List<IFileSystemItem> _children = new List<IFileSystemItem>();

    public Folder(string name)
    {
        Name = name;
    }

    public void Add(IFileSystemItem item)
    {
        _children.Add(item);
    }

    public void Remove(IFileSystemItem item)
    {
        _children.Remove(item);
    }

    public void Display(int depth)
    {
        Console.WriteLine(new string('-', depth) + "+ " + Name);

        foreach (var child in _children)
        {
            child.Display(depth + 2);
        }
    }
}

// 사용 예시
public class CompositeExample
{
    public static void Run()
    {
        // 파일 시스템 트리 구조 생성
        Folder root = new Folder("root");
        Folder home = new Folder("home");
        Folder user = new Folder("user");

        File file1 = new File("profile.txt");
        File file2 = new File("document.docx");
        File file3 = new File("archive.zip");

        root.Add(home);
        root.Add(file3);
        home.Add(user);
        user.Add(file1);
        user.Add(file2);

        // 전체 파일 시스템 구조 출력
        root.Display(0);
    }
}
```