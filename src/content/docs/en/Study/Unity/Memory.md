---
title: Memory
---

## Virtual Memory

- Arranged from lower addresses to higher addresses.
- Areas above the heap are more directly related to runtime behavior and developer decisions.

```
+---------------------+  ← High address
|     Stack           |  (Function calls and local variables)
+---------------------+
|     Heap            |  (Dynamic memory: new / malloc)
+---------------------+
|     BSS Segment     |  (Uninitialized global/static variables)
+---------------------+
|     Data Segment    |  (Initialized global/static variables)
+---------------------+
|     Text Segment    |  (Program executable code)
+---------------------+  ← Low address
```

### Stack
- The space where local variables are stored when functions are called.
- Very fast. Its size is limited, but it is released automatically when the function ends.

### Heap
- The space where objects created with the `new` keyword are stored.
- Since it is managed by GC, the lifetime is not deterministic.
- When you create a GameObject in Unity, it is placed on the heap.
