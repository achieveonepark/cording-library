> For AI agents: the complete documentation index is available at /AchEngine/en/llms.txt, the full documentation bundle is available at /AchEngine/en/llms-full.txt.

# Localization — Overview

AchEngine Localization loads JSON locale files, resolves keys at runtime, and can generate type-safe key constants.

## Core components

| Type                   | Role                                             |
| ---------------------- | ------------------------------------------------ |
| `LocalizationManager`  | Static runtime API for lookup and locale changes |
| `LocalizationSettings` | Default/fallback locale and database settings    |
| `LocaleDatabase`       | Maps locales to JSON `TextAsset` files           |
| `LocalizedString`      | Inspector-friendly key field                     |
| `LocalizedText`        | Refreshes `Text` or `TMP_Text` automatically     |

## Basic usage

```csharp
string title = LocalizationManager.Get("menu.title");
string welcome = LocalizationManager.Get("dialog.welcome", "Player1", 5);

LocalizationManager.LocaleChanged += OnLocaleChanged;
LocalizationManager.SetLocale("ja");
```

## JSON format

```json
{
  "menu.title": "Settings",
  "dialog.welcome": "Welcome, {0}!"
}
```

Nested keys are supported when the code-generation option is enabled:

```json
{
  "menu": {
    "start": "Start",
    "quit": "Quit"
  }
}
```

## Automatic TMP refresh

Add `LocalizedText` to a `Text` or `TMP_Text`, choose a key, and it will refresh when `LocalizationManager.LocaleChanged` fires.


> **TMP support**
> 
> TMP support requires the `ACHENGINE_LOCALIZATION_TMP` scripting symbol. It is automatically defined when `com.unity.textmeshpro` is installed.
> 


## FontAsset Maker

Use **AchEngine › Localization › FontAsset Maker** to collect the characters used by the locale files and create a separate TMP FontAsset for each language.

## Next steps

- [Settings & database](/AchEngine/en/usage/localization/setup.md)
- [Key constant code generation](/AchEngine/en/usage/localization/codegen.md)
