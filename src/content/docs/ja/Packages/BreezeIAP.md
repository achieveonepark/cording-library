---
title: BreezeIAP
---

| [🪄GitHub へ移動](https://github.com/achieveonepark/breeze-iap)

[Unity IAP](https://docs.unity3d.com/kr/2022.1/Manual/UnityIAP.html) をラップし、より扱いやすいインターフェースを提供するパッケージです。 <br/>
ただし、レシート検証ロジックは別途実装する必要があります。

## クイックスタート
以下の 2 つの方法のうち 1 つを選んでください。

> GitHub URL の `#` 以降のバージョンは Changelog の最新内容を参照してください。

### UPM から使う
1. UPM を開き、左上の `+` ボタンを押します。
2. `Install package from git URL...` を選択します。
3. `https://github.com/achieveonepark/BreezeIAP.git#1.0.0` を入力してインストールします。

### 手動で追加する
1. `Unity Project/Packages/manifest.json` を開きます。
2. `dependencies` に `"com.achieve.iap": "https://github.com/achieveonepark/BreezeIAP.git#1.0.0"` を追加します。

---

## 説明

### API

このパッケージは次の機能を提供します。

    BreezeIAP.Initialize      | Unity IAP の初期化
    BreezeIAP.Purchase        | 購入を試行
    BreezeIAP.Confirm         | 購入成功後の完了処理
    BreezeIAP.GetPendingList  | まだ完了処理されていない商品一覧を取得
    BreezeIAP.GetRestoreList  | Android / iOS ごとの復元対象商品一覧を取得

### Initialize

Unity IAP の初期化処理を非同期で実装し、完了タイミングを把握できるようにしています。<br>
初期化前に、ストアへ登録された ProductId がランタイムで取得できるか確認してください。

```csharp
using Achieve.IAP;

private async void Start()
{
    // Array, List のどちらでも可能
    List<InitializeDto> dtoList = new List<InitializeDto>();

    // ストアに登録された Product の Id と商品タイプを DTO に設定して追加します。
    dtoList.Add(new InitializeDto
    {
        ProductId = "Consumable",
        ProductType = ProductType.Consumable
    });

    await BreezeIAP.InitializeAsync(dtoList);
}
```

### Purchase, Confirm

購入の試行から成功・失敗までを明確に判断できるよう、インターフェースとエラーメッセージを提供します。

```csharp
public async void PurchaseAsync(string productId)
{
    PurchaseResult result = await BreezeIAP.PurchaseAsync(productId);

    // 成功時
    if(result.IsSuccess)
    {
        // サーバー経由でレシート検証を行うならこのタイミングで追加します。

        // PurchaseResult, Product のどちらでも可能
        BreezeIAP.Confirm(result);

        // アイテム付与

        return;
    }

    Debug.Log($"[{result.Product.definition.id}] 商品の購入に失敗しました。理由: {result.ErrorMessage}");
}
```

---

## Dependencies
[In App Purchasing](https://docs.unity3d.com/Packages/com.unity.purchasing@4.12/manual/index.html) (4.12.0)

---

## ChangeLog
[link](https://github.com/achieveonepark/BreezeIAP/blob/main/CHANGELOG.md)

[def]: https://github.com/achieveonepark/BreezeIAP
