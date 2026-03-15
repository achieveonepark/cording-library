---
title: Iterator
---

# Iterator

## One-line pattern summary
A pattern that hides the internal structure of a collection and only exposes a way to traverse it.

## Typical Unity use cases
- When inventory or quest lists should be traversed consistently.
- When you want collection implementation changes to have less impact.

## Parts (roles)
- Aggregate
- Iterator
- Client

## Unity example (C#)
The code below is a simplified Unity example based on the scenario described above.

```csharp
using System.Collections;
using System.Collections.Generic;

public sealed class InventoryCollection : IEnumerable<InventoryItem>
{
    private readonly List<InventoryItem> items = new();

    public void Add(InventoryItem item)
    {
        items.Add(item);
    }

    public IEnumerator<InventoryItem> GetEnumerator()
    {
        foreach (InventoryItem item in items)
        {
            yield return item;
        }
    }

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}
```

## Advantages
- Behavior is separated into smaller units, which reduces the impact of changes.
- Adding or swapping rules is relatively safe.

## Things to watch out for
- As the number of objects and indirect calls increases, the flow can become harder to follow.
- Ordering bugs should be pinned down with tests.

## Interaction diagram

This shows the flow where sequential access is provided without exposing the internal representation.

```d2 title="Iterator Flow"
direction: right

client: "Client"
aggregate: "Inventory"
iterator: "InventoryIterator"
check: "HasNext?"
next: "Next()"
value: "Current Item"

client -> aggregate: "CreateIterator()"
aggregate -> iterator
client -> check
check -> next: "true"
next -> value
value -> client
next -> check: "loop"
check -> client: "false"
```
