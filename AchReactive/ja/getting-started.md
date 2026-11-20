> For AI agents: the complete documentation index is available at /AchReactive/ja/llms.txt, the full documentation bundle is available at /AchReactive/ja/llms-full.txt.

# はじめに

## インストール

Unity Package Manager で **Add package from git URL** を選択し、次のアドレスを入力します。

```
https://github.com/achieveonepark/AchReactive.git
```

または `Packages/manifest.json` に直接追加します。

```json
{
  "dependencies": {
    "com.achieve.reactive": "https://github.com/achieveonepark/AchReactive.git"
  }
}
```

要件は **Unity 2021.3 以上** です。依存性は `com.unity.nuget.newtonsoft-json` 一つで、
自動的に一緒にインストールされます。

## 1. 統合境界の実装

AchReactive はあなたのゲーム構造を強制しません。2つのインターフェイスを実装するだけです。

- `IEntity` — リアクションの主体/対象（キャラクター、モンスターなど）
- `IWorld` — スポーン/範囲クエリなどのワールド境界

```csharp
using AchReactive;
using UnityEngine;

public sealed class Character : MonoBehaviour, IEntity
{
    public StatSheet Stats { get; } = new StatSheet();   // パッケージ提供、そのまま使用
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

## 2. データの作成

スキルを `reactions` 形式の JSON で定義します。（直接書かずに [Data Editor](/AchReactive/ja/usage/authoring-tools.md) で作成しても構いません。）

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

## 3. 組み立てと実行

```csharp
using AchReactive;

var skills = new DataBase<SkillData>();
var engine = new ReactionEngine();

void Start()
{
    // 動作プールの自動収集（基本の damage/heal/… を含む）
    EffectRegistry.AutoRegister();
    ConditionRegistry.AutoRegister();
    TriggerRegistry.AutoRegister();

    // データの読み込み — ソースは自由
    skills.Load(new JsonDataLoader<SkillData>(() => skillsJson.text));
}

void UseSkill(IEntity caster, IEntity target)
{
    var ctx = new ReactionContext { Source = caster, Target = target };
    engine.Run("on_use", skills.Get("fire_slash"), ctx);
}
```

`damage`、`heal`、`add_modifier` のような基本 effect はパッケージが提供するため、別途のコードは不要です。
`Samples` の **Basic** 例で、動作するシーンをすぐに確認できます。

## 次のステップ

- [概念](/AchReactive/ja/usage/concepts.md) — なぜこの構造なのか
- [基本動作プール](/AchReactive/ja/usage/reactions.md) — 提供される effect/condition の一覧
- [拡張する](/AchReactive/ja/usage/extending.md) — 新しい動作と新しいドメイン
