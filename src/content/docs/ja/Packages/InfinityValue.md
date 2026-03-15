---
title: Infinity Value
---

| [🪄GitHub へ移動](https://github.com/achieveonepark/infinity-value)

## Install

以下のインストール方法のいずれかを選んでください。

> 注: GitHub URL の `#` 以降のバージョンは changelog に記載された最新変更を確認してください。

### Install via Unity Package Manager (UPM)

1. Unity Package Manager を開き、左上の `+` ボタンをクリックします。
2. `Install package from git URL...` を選択します。
3. `https://github.com/achieveonepark/infinity-value.git#1.0.1` を入力して Install をクリックします。

### Manual Addition

Unity プロジェクトの `Packages` フォルダにある `manifest.json` を開きます。  
`dependencies` に次の 1 行を追加します。

```json
"com.achieve.infinity-value": "https://github.com/achieveonepark/infinity-value.git#1.0.1"
```

### Description

- million、billion、trillion のような一般的な単位の代わりに、A、B、C などのカスタム単位を使えるようにし、非常に大きな数をセグメント単位の構造で表現・処理するために最適化されたパッケージです。
- 内部構造を最適化してガベージコレクション（GC）の発生を最小化するよう設計されており、ゲームのような性能に敏感なアプリケーションに適しています。
- プロジェクトに Newtonsoft.Json パッケージが導入されていれば、JsonConverter が自動登録され、追加設定なしでシリアライズできます。
- データは `300F 200E` や `200AE 578AD` のような単位フォーマットで表現され、すべての演算はこの表現構造を基準に直接実行されます。 <br/>`ToString()` を呼ぶとその形式のまま出力されます。
- 基本的な C# プリミティブ型からの移行をサポートし、比較演算子や算術演算子を含む標準 C# 演算子をすべて使用できます。

### 対応している ctor

```csharp
- int
- long
- BigInteger
- string
- float
```

### Quick Start

```csharp
using Achieve.InfinityValue;
using System.Numerics;

public class A
{
    public InfinityValue A;
    public InfinityValue B;
    public InfinityValue C;
    public InfinityValue D;

    public A()
    {
        // 単位名を設定
        InfinityValue.SetUnitNames(new List<string>
        {
            "A", "B", "C" ...
        });
        
        A = 1;                              // int で初期化可能
        B = "300F 200C";                    // フォーマット済み文字列で初期化可能
        C = 3.0f;                           // float 対応
        D = new BigInteger(30000000000000); // BigInteger 対応

        var d = A + B;                      // 基本算術演算: 足し算
        var e = B * C;                      // 基本算術演算: 掛け算
        var f = B / C;                      // 基本算術演算: 割り算

        Debug.Log(D.ToString()); // "30D" 形式で出力
    }
}
~~~~~~~~```
