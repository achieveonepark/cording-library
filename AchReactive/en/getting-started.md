> For AI agents: the complete documentation index is available at /AchReactive/en/llms.txt, the full documentation bundle is available at /AchReactive/en/llms-full.txt.

# Getting started

## Installation

In the Unity Package Manager, choose **Add package from git URL** and enter the following address.

```
https://github.com/achieveonepark/AchReactive.git
```

Or add it directly to `Packages/manifest.json`.

```json
{
  "dependencies": {
    "com.achieve.reactive": "https://github.com/achieveonepark/AchReactive.git"
  }
}
```

The requirement is **Unity 2021.3 or later**. The only dependency is `com.unity.nuget.newtonsoft-json`,
which is installed automatically.

## 1. Implement the integration boundary

AchReactive does not impose a structure on your game. You only need to implement two interfaces.

- `IEntity` — the subject/target of a reaction (characters, monsters, etc.)
- `IWorld` — the world boundary for spawning, range queries, etc.

```csharp
using AchReactive;
using UnityEngine;

public sealed class Character : MonoBehaviour, IEntity
{
    public StatSheet Stats { get; } = new StatSheet();   // provided by the package, use as is
    public string Id => name;
    public Vector3 Position { get => transform.position; set => transform.position = value; }
    public bool IsAlive => Stats.GetBase(StatKeys.Hp) > 0f;

    void Awake()
    {
        Stats.SetBase(StatKeys.Hp, 100f);
        Stats.SetBase(StatKeys.HpMax, 100f);
        Stats.SetBase(StatKeys.Atk, 10f);
        Stats.SetBase(StatKeys.Def, 2f);
    }
}
```

## 2. Author the data

Define skills as JSON in the `reactions` format. (You can also build them with the [Data Editor](/AchReactive/en/usage/authoring-tools.md) instead of writing them by hand.)

```json
[
  {
    "id": "fire_slash",
    "cooldown": 5.0,
    "reactions": [
      {
        "trigger": "on_use",
        "conditions": [{ "type": "alive" }],
        "effects": [
          { "type": "damage", "params": { "power": 1.8 } },
          { "type": "log", "params": { "message": "fire_slash 명중!" } }
        ]
      }
    ]
  }
]
```

## 3. Assemble and run

```csharp
using AchReactive;

var skills = new DataBase<SkillData>();
var engine = new ReactionEngine();

void Start()
{
    // Auto-collect the behavior pool (includes default damage/heal/…)
    EffectRegistry.AutoRegister();
    ConditionRegistry.AutoRegister();
    TriggerRegistry.AutoRegister();

    // Load data — any source you like
    skills.Load(new JsonDataLoader<SkillData>(() => skillsJson.text));
}

void UseSkill(IEntity caster, IEntity target)
{
    var ctx = new ReactionContext { Source = caster, Target = target };
    engine.Run("on_use", skills.Get("fire_slash"), ctx);
}
```

Default effects like `damage`, `heal`, and `add_modifier` are provided by the package, so no extra code is required.
You can immediately see a working scene in the **Basic** example under `Samples`.

## Next steps

- [Concepts](/AchReactive/en/usage/concepts.md) — why the structure is this way
- [Default behavior pool](/AchReactive/en/usage/reactions.md) — the list of provided effects/conditions
- [Extending](/AchReactive/en/usage/extending.md) — new behaviors and new domains
