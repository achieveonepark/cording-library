> For AI agents: the complete documentation index is available at /AchUtils/en/llms.txt, the full documentation bundle is available at /AchUtils/en/llms-full.txt.

# Introduction

**AchUtils** is a collection of reusable systems for the repetitive parts of Unity game development.

Tutorials, condition graphs, stat modifiers, and the other systems are designed to work independently, so you can install the package once and use only the pieces your game needs.

## Highlights

- **Independent instances** - Most runtime systems are pure C# instances; components are kept only where coroutines, Transform access, or Instantiate/Destroy are needed.
- **ScriptableObject-first data** - Data and runtime logic are separated so designers can adjust assets without code changes.
- **`[SerializeReference]` polymorphism** - Nodes, effects, and steps can be composed as inspector-editable data.
- **Less repeated code** - Runtime systems ship alongside collection, Unity object, UI, and string extension helpers.

## Assembly

| Item                  | Value                                               |
| --------------------- | --------------------------------------------------- |
| Package name          | `com.achieve.utils`                                 |
| Assembly              | `AchUtils.Runtime`, `AchUtils.Extensions`           |
| Root namespace        | `AchUtils`                                          |
| Minimum Unity version | **2021.3 LTS**                                      |
| Package dependencies  | `com.unity.ugui`, `com.unity.nuget.newtonsoft-json` |

## Next Steps

- [Installation](/AchUtils/en/getting-started.md)
- [Extension Methods](/AchUtils/en/usage/extensions.md)
- [First system: Tutorial](/AchUtils/en/usage/tutorial.md)
