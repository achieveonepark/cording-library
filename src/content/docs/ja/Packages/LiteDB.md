---
title: LiteDB
---

| [🪄GitHub へ移動](https://github.com/achieveonepark/lite-db)

ゲームで使うテーブルデータを SQLite で管理し、内部では QUERY の `WHERE` 句を利用してデータを返します。

## Install

以下のインストール方法のいずれかを選んでください。

> 注: GitHub URL の `#` 以降のバージョンは changelog に記載された最新変更を確認してください。

### Install via Unity Package Manager (UPM)

1. Unity Package Manager を開き、左上の `+` ボタンをクリックします。
2. `Install package from git URL...` を選択します。
3. `https://github.com/achieveonepark/lite-db.git#1.0.1` を入力して Install をクリックします。

### Manual Addition

Unity プロジェクトの `Packages` フォルダにある `manifest.json` を開きます。  
`dependencies` に次の 1 行を追加します。

```json
"com.achieve.lite-db": "https://github.com/achieveonepark/lite-db.git#1.0.1"
```

## Setting
1. [DB Browser](https://sqlitebrowser.org/) をインストールします。<br>![New Database](../../Packages/Images/lite-db-1.png)
2. 新しいデータベースを作成します。
3. Create Table をクリックしてテーブルと変数を追加します。変数追加の詳細は下を参照してください。
4. 作成したテーブルへデータを追加します。

### Create SQLite Table

- Type

| SQLite Type | C# Type            |
|-------------|--------------------|
| INTEGER     | int, long          |
| REAL        | double, float      |
| TEXT        | string, enum, bool |
| BLOB        | byte[]             |

- **PK**: Primary Key。このパッケージでは `Id` を主キーとして使います。
- **NN**: Not Null。`bool` のように NULL を許可しない値に設定します。
- **AI**: Auto Increment。整数列で使われ、新しい行が追加されるたびに値が自動で 1 ずつ増えます。<br>通常は主キーと一緒に使います。
- **U**: Unsigned。数値データ型で使われ、負の値を許可しない 0 以上の値を意味します。

### Create Table Data Class

> CsvImporter は Code Generator をサポートしているので、ワンクリックでテーブルデータクラスを作ることもできます。

上のように値を設定したら、Unity 側で受け取って使うクラスも作成する必要があります。

```csharp
using Achieve.Database;
using Unity.VisualScripting.Dependencies.Sqlite;

[Table("TowerData")]
public class UnitData : IDataBase
{
    // Id で Query するため、この Attribute と PK 設定は必須
    [PrimaryKey, AutoIncrement]
    public int Id { get; set; }
    public string Name { get; set; }
    public double Attack { get; set; }
    public double Defense { get; set; }
    public double HP { get; set; }
}
```

## Quick Start

```csharp
LiteDB.Initialize($"{Application.persistentDataPath}/secure/data.db"); // Path

var data = LiteDB.Get<Quest>(1);

if (LiteDB.TryGetValue<Quest, int>("Quest", 1, out var quest))
{
    var reward = quest.reward;
}

// 存在すれば Id が 1〜10 の値を List として読み込み
var list = LiteDB.GetList<Quest>(1, 10);

if(LiteDB.Exist<Quest>(1))
{
    // 存在する！
}
```
