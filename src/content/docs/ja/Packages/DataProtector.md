---
title: Data Protector
---

| [🪄GitHub へ移動](https://github.com/achieveonepark/data-protector)

- `byte[]` や `string` 形式のデータを物理保存する前に圧縮・暗号化し、外部から内容を直接確認しにくくする機能を提供します。<br>
- 暗号化には、ユーザーが `16byte` の `string key` を直接入力する必要があります。<br>
- `SHA256` を用いて `byte[]` または `string` のハッシュ値を抽出し、ファイルの変更有無を比較するロジックも提供します。<br>

---

## Install

以下のインストール方法のいずれかを選んでください。

> 注: GitHub URL の `#` 以降のバージョンは changelog に記載された最新変更を確認してください。

### Install via Unity Package Manager (UPM)

1. Unity Package Manager を開き、左上の `+` ボタンをクリックします。
2. `Install package from git URL...` を選択します。
3. `https://github.com/achieveonepark/data-protector.git#1.0.0` を入力して Install をクリックします。

### Manual Addition

Unity プロジェクトの `Packages` フォルダにある `manifest.json` を開きます。  
`dependencies` に次の 1 行を追加します。

```json
"com.achieve.infinity-value": "https://github.com/achieveonepark/data-protector.git#1.0.0"
```

## Description

### 圧縮、暗号化？
1. [AES-128](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) 方式を使用します。
2. C# が提供する [GZipStream](https://learn.microsoft.com/ko-kr/dotnet/api/system.io.compression.gzipstream?view=net-8.0) を使って圧縮します。

### API

このパッケージは次の機能を提供します。

    DataProtector.Encrypt        | 圧縮後に暗号化した結果値
    DataProtector.Decrypt        | 復号後に展開した結果値
    HaskChecker.ComputeHash      | 暗号化されたデータのハッシュ値を抽出
    HaskChecker.ValidateHash     | 2 つのハッシュ値を比較

---
