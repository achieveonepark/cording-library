> For AI agents: the complete documentation index is available at /AchReactive/en/llms.txt, the full documentation bundle is available at /AchReactive/en/llms-full.txt.

# AchReactive

**AchReactive** is a Unity framework that builds all game content — skills, monsters, items, maps, quests, and more —
from data composition following the **trigger → condition → effect** pattern.

## Core idea

> Domains are infinite, but behaviors (primitives) are finite.

Building a new system for every domain means filling in the `domain × behavior` matrix each time.
AchReactive makes the behavior pool **shared by all domains**, turning this multiplication into addition.
From the second domain onward, it's almost free.

```
        damage  heal  add_modifier  spawn
Skill     ✓      ✓        ✓
Monster                    ✓          ✓     ← reuse the same effect
Item               ✓       ✓
```

## Features

- **Domain-agnostic** — a single `DataBase<T>` handles Skill/Monster/Item/… all of them
- **Source-agnostic** — load from anywhere: JSON, CSV, remote, etc. (implement `IDataLoader<T>` for a new source)
- **Automatic behavior registration** — collects `[Effect]`/`[Condition]`/`[Trigger]` methods via reflection, zero wiring
- **UIToolkit authoring tools** — create types and data in the editor (no hand-written JSON)
- **Minimal dependencies** — just Newtonsoft.Json

## At a glance

```csharp
// 1) Auto-collect the behavior pool (includes default effects/conditions/triggers)
EffectRegistry.AutoRegister();
ConditionRegistry.AutoRegister();
TriggerRegistry.AutoRegister();

// 2) Load data (any source)
var skills = new DataBase<SkillData>();
skills.Load(new JsonDataLoader<SkillData>(() => json));

// 3) Run — identical even across domains
engine.Run("on_use", skills.Get("fire_slash"), ctx);
```

## Next steps

- [Getting started](/AchReactive/en/getting-started.md) — from installation to running your first reaction
- [Concepts](/AchReactive/en/usage/concepts.md) — triggers/conditions/effects and the domain model
- [Extending](/AchReactive/en/usage/extending.md) — adding new behaviors and new domains
