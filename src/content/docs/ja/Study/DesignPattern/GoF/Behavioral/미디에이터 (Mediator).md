---
title: Mediator
---

# Mediator

## パターン一言説明
複数オブジェクト間の相互作用を仲介オブジェクトへ集め、直接依存を減らすパターンです。

## Unity でよく使う状況
- インベントリ、装備、ショップ UI の連携を中央制御したいとき
- 相互参照が複雑になってきたとき

## 構成要素（役割）
- Mediator
- Concrete Mediator
- Colleague

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
public interface IUiMediator
{
    void Notify(object sender, string eventId);
}

public sealed class LobbyUiMediator : IUiMediator
{
    public InventoryPanel InventoryPanel { get; set; }
    public EquipmentPanel EquipmentPanel { get; set; }

    public void Notify(object sender, string eventId)
    {
        if (sender == InventoryPanel && eventId == "ItemSelected")
        {
            EquipmentPanel.PreviewSelectedItem();
        }
    }
}
```

## 長所
- 振る舞いを分離できるため、変更の影響範囲を小さくできます。
- ルールの追加や差し替えを比較的安全に行えます。

## 注意点
- オブジェクト数や間接呼び出しが増えると、流れを追いにくくなります。
- 実行順序のバグはテストで固定しておく必要があります。

## 動作ダイアグラム

コンポーネント同士の直接通信ではなく、仲介者がルーティングする流れです。

```d2 title="Mediator の流れ"
direction: right

components: {
  label: "Components"
  ui: "UI"
  audio: "Audio"
  quest: "Quest"
}

mediator: "GameMediator"

ui -> mediator: "event"
audio -> mediator: "event"
quest -> mediator: "event"
mediator -> ui: "notify"
mediator -> audio: "notify"
mediator -> quest: "notify"
```
