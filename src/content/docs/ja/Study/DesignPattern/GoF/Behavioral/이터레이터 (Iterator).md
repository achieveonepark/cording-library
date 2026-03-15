---
title: Iterator
---

# Iterator

## パターン一言説明
コレクション内部構造を隠し、走査方法だけを外部へ公開するパターンです。

## Unity でよく使う状況
- インベントリやクエスト一覧を一貫した方法で走査したいとき
- コレクション実装変更の影響を減らしたいとき

## 構成要素（役割）
- Aggregate
- Iterator
- Client

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
using System.Collections;
using System.Collections.Generic;

public sealed class InventoryCollection : IEnumerable<InventoryItem>
{
    private readonly List<InventoryItem> items = new();

    public void Add(InventoryItem item)
    {
        items.Add(item);
    }

    public IEnumerator<InventoryItem> GetEnumerator()
    {
        foreach (InventoryItem item in items)
        {
            yield return item;
        }
    }

    IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
}
```

## 長所
- 振る舞いを分離できるため、変更の影響範囲を小さくできます。
- ルールの追加や差し替えを比較的安全に行えます。

## 注意点
- オブジェクト数や間接呼び出しが増えると、流れを追いにくくなります。
- 実行順序のバグはテストで固定しておく必要があります。

## 動作ダイアグラム

内部表現を露出せずに順次アクセスする流れです。

```d2 title="Iterator の流れ"
direction: right

client: "Client"
aggregate: "Inventory"
iterator: "InventoryIterator"
check: "HasNext?"
next: "Next()"
value: "Current Item"

client -> aggregate: "CreateIterator()"
aggregate -> iterator
client -> check
check -> next: "true"
next -> value
value -> client
next -> check: "loop"
check -> client: "false"
```
