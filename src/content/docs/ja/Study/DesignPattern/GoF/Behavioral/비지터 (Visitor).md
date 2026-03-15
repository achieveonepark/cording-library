---
title: Visitor
---

# Visitor

## パターン一言説明
オブジェクト構造を変更せず、演算を Visitor として分離して拡張するパターンです。

## Unity でよく使う状況
- 複数のユニットタイプへ統計処理や報酬計算を追加したいとき
- 構造は固定で、演算だけが頻繁に増えるとき

## 構成要素（役割）
- Visitor
- Element
- Accept

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
public interface IUnitVisitor
{
    void Visit(PlayerUnit playerUnit);
    void Visit(EnemyUnit enemyUnit);
}

public interface IVisitableUnit
{
    void Accept(IUnitVisitor visitor);
}

public sealed class DamagePreviewVisitor : IUnitVisitor
{
    public int TotalPreviewDamage { get; private set; }

    public void Visit(PlayerUnit playerUnit) => TotalPreviewDamage += 5;
    public void Visit(EnemyUnit enemyUnit) => TotalPreviewDamage += 10;
}
```

## 長所
- 振る舞いを分離できるため、変更の影響範囲を小さくできます。
- ルールの追加や差し替えを比較的安全に行えます。

## 注意点
- オブジェクト数や間接呼び出しが増えると、流れを追いにくくなります。
- 実行順序のバグはテストで固定しておく必要があります。

## 動作ダイアグラム

オブジェクト構造を巡回しながら、演算を Visitor に委譲する流れです。

```d2 title="Visitor の流れ"
direction: right

client: "Client"
structure: "Object Structure"
visit: "Visitor"

nodes: {
  label: "Elements"
  enemy: "Enemy"
  npc: "NPC"
  item: "Item"
}

client -> structure: "iterate"
structure -> enemy: "accept(visitor)"
structure -> npc: "accept(visitor)"
structure -> item: "accept(visitor)"
enemy -> visit: "visitEnemy"
npc -> visit: "visitNpc"
item -> visit: "visitItem"
```
