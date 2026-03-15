---
title: Composite
---

# Composite

## パターン一言説明
個別オブジェクトと複合オブジェクトを同じインターフェースで扱うツリー構造パターンです。

## Unity でよく使う状況
- クエスト目標をツリー構造で組みたいとき
- ノードとグループノードを同じ方法で処理したいとき

## 構成要素（役割）
- Component
- Leaf
- Composite

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

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

## 長所
- モジュール境界が明確になり、結合度を下げられます。
- 既存コードを変更せずに機能拡張や統合がしやすくなります。

## 注意点
- ラッパー層が深くなりすぎるとデバッグが難しくなります。
- 責務境界が曖昧にならないよう、インターフェースは小さく保つべきです。

## 動作ダイアグラム

個別オブジェクトと複合オブジェクトを同じインターフェースで再帰的に扱う流れです。

```d2 title="Composite の流れ"
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
