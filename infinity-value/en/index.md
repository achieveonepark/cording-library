> For AI agents: the complete documentation index is available at /infinity-value/en/llms.txt, the full documentation bundle is available at /infinity-value/en/llms-full.txt.

# Introduction

Infinity Value is a Unity package for idle and incremental games that need numbers far beyond `long`.

Values are stored as compact `(unitIndex, value)` pairs, so common arithmetic and comparison work without allocating managed garbage. Display and parsing can use the built-in `A, B, C ... CZ` unit names, or a custom `InfinityValueUnitNames` instance per content type.

```csharp
using Achieve.InfinityValue;

var goldUnits = new InfinityValueUnitNames(new[]
{
    "", "K", "M", "B", "T", "Qa", "Qi"
});

InfinityValue gold = new InfinityValue(5_300_000_000L, goldUnits);
InfinityValue reward = new InfinityValue("12K", goldUnits);

gold += reward;

Debug.Log(gold.ToString()); // 5.30B
```

## Highlights

- Struct-based large number type for Unity runtime code.
- Arithmetic: `+`, `-`, `*`, `/`.
- Comparison: `==`, `!=`, `<`, `>`, `<=`, `>=`.
- Instance unit names through `InfinityValueUnitNames`.
- String parsing with `TryParse`.
- Optional Newtonsoft.Json converter when Unity's Newtonsoft package is installed.
- Importable Unity samples under `Samples~`.

## Next Steps

- [Getting Started](/infinity-value/en/getting-started.md)
- [API Reference](/infinity-value/en/api.md)
- [Unit Names](/infinity-value/en/api/unit-names.md)
- [Samples](/infinity-value/en/usage.md)
