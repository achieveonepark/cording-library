---
title: Composite
---

# Composite

## One-line pattern summary
A tree-structure pattern that treats individual objects and composed objects through the same interface.

## Typical Unity use cases
- When building quest objectives as a tree.
- When handling node and group node objects in the same way.

## Parts (roles)
- Component
- Leaf
- Composite

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
using System.Collections.Generic;

public interface IQuestCondition
{
    bool IsCompleted();
}

public sealed class KillMonsterCondition : IQuestCondition
{
    public bool IsCompleted() => false;
}

public sealed class AllConditionsGroup : IQuestCondition
{
    private readonly List<IQuestCondition> childConditions = new();

    public void Add(IQuestCondition childCondition)
    {
        childConditions.Add(childCondition);
    }

    public bool IsCompleted()
    {
        foreach (IQuestCondition childCondition in childConditions)
        {
            if (!childCondition.IsCompleted())
            {
                return false;
            }
        }

        return true;
    }
}
```

## Advantages
- It clarifies module boundaries and reduces coupling.
- Features can be extended or integrated without modifying existing code.

## Things to watch out for
- If wrapper layers become too deep, debugging gets harder.
- Interfaces should stay small so responsibility boundaries do not blur.

## Interaction diagram

This shows the recursive flow where both single objects and composites are handled through the same interface.

```d2 title="Composite Flow"
direction: down

client: "Client"
root: "UIRoot (Composite)"
panel: "Panel (Composite)"
button: "Button (Leaf)"
text_label: "Label (Leaf)"
render: "Render()"

client -> root: "render()"
root -> panel: "render child"
panel -> button: "render child"
panel -> text_label: "render child"
button -> render
text_label -> render
```
