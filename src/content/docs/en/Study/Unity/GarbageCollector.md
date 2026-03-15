---
title: GarbageCollector
---

## Garbage Collector?
- A system that finds objects that are no longer used and releases them from memory.
- Similar in concept to C++ `delete` and `free()`, but C# performs it automatically.
- It exists in heap memory and manages memory there.
- It is mainly invoked when memory becomes insufficient after allocating new objects.

## GC Alloc ...
- Means a new heap allocation has occurred.
- Equivalent to `GC Alloc` in the Unity Profiler.
- Think of it like a potential risk warning.
- It does not mean GC has already happened, only that the possibility has been created.
```csharp
void Update()
{
    // Allocated on the heap every frame.
    var list = new List<int>();
    list.Add(1);
}
```
- The ideal state is when GC Alloc remains 0, which is often called a `GC-free frame`.

## Unity developers should ...
- Proper memory management means minimizing heap allocations so that GC does not occur.
- Minimizing heap allocations means not creating unnecessary objects.
- Because GC runs on the main thread, logic stops while it runs, so frame drops are unavoidable.

## Common cases where this can happen

### String concatenation
```csharp
string profile = "Level " + player.Level + " " + player.Nickname;
```
- When the `+` operator is used on strings like this, new instances are repeatedly created because strings are immutable, which causes GC.
- Conclusion: use `StringBuilder` or string interpolation.

### LINQ
- Often called a black box of heap allocations.
- If performance is sensitive, iterating with `for` or `foreach` is usually preferred over LINQ.
```csharp
var result = list.Where(x => x.IsActive);
```
- Because it includes a lambda, a delegate object is created on the heap.
- GC Alloc occurs every time it is called.
- LINQ methods such as `ToList`, `Select`, and `OrderBy` create new collections, which also allocates on the heap.
- It uses `IEnumerator<T>`, and boxing can happen when value types are involved.
```csharp
List<int> numbers = new ();
numbers.Where(x => x > 0;) // int -> object
```
- Conclusion: use it appropriately for one-time execution, compile-time work, or loading-time work.

### foreach
```csharp
foreach (Transform trf in transforms)
{
    //
}
```
- When using struct-based custom enumerators such as Unity's Transform component, the `foreach` statement may cause boxing because it internally casts to the `IEnumerator` interface.
- More generally, when iterating structs with `foreach`, boxing can occur during the conversion to the `IEnumerator` interface.
- Conclusion: it is safe for iterating reference-type classes, small collections, structurally clear loops, or generic collections.

### Lambda expressions and anonymous methods
```csharp
button.onClick.AddListener(() => Debug.Log("Clicked"));
```
- If a lambda captures variables, an object is created on the heap.
- Even without captures, creating the delegate itself can still cause GC Alloc.
- Conclusion: define the function in advance and pass a reference to it.

### Instantiate / Destroy
- As expected, creating and destroying directly also causes GC Alloc.
- `Destroy` happens after the frame ends, and memory cleanup is delayed as well. If used continuously, GC pressure builds up and can cause severe frame drops.
- Conclusion: use pooling.
