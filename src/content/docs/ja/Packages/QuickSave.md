---
title: QuickSave
---

| [🪄GitHub へ移動](https://github.com/achieveonepark/quick-save)

Cysharp の [MemoryPack](https://github.com/cysharp/memorypack) を利用して、Binary ファイルの Serialize / Deserialize によるデータ保存・読込機能を提供します。<br>
[Data Protector](https://github.com/achieveonepark/dataprotector) を導入すると、保存データの圧縮・暗号化・復号化も利用できます。([文書](https://achieveonepark.github.io/cording-library/Documents/DataProtector/DataProtector/))

---

## Install

以下のインストール方法のいずれかを選んでください。

> 注: GitHub URL の `#` 以降のバージョンは changelog に記載された最新変更を確認してください。

### [NuGetForUnity](https://github.com/GlitchEnzo/NuGetForUnity) を使って MemoryPack をインストールする
1. README に従って NuGetForUnity パッケージを導入します。
2. エディタ上部の `NuGet/Manage NuGet Packages` をクリックし、`MemoryPack` をダウンロードします。<br>

### Install via Unity Package Manager (UPM)

1. Unity Package Manager を開き、左上の `+` ボタンをクリックします。
2. `Install package from git URL...` を選択します。
3. `https://github.com/achieveonepark/quick-save.git#1.0.0` を入力して Install をクリックします。

### Manual Addition

Unity プロジェクトの `Packages` フォルダにある `manifest.json` を開きます。  
`dependencies` に次の 1 行を追加します。

```json
"com.achieve.quick-save": "https://github.com/achieveonepark/quick-save.git#1.0.0"
```

## クイックスタート

この設定により、MemoryPack は Unity 内でバイナリのシリアライズとデシリアライズをスムーズに行えるようになります。

### quick-save をインストールする

以下の 2 つの方法のうち 1 つを選んでください。

> GitHub URL の `#` 以降のバージョンは Changelog の最新内容を参照してください。

### UPM から使う
1. UPM を開き、左上の `+` ボタンを押します。
2. `Install package from git URL...` を選択します。
3. パッケージ URL を入力して Install します。

### 手動で追加する
1. `Unity Project/Packages/manifest.json` を開きます。
2. `dependencies` に `"com.achieve.quick-save": "https://github.com/achieveonepark/quick-save.git#1.0.0"` を追加します。

---

## 説明

### API

このパッケージは次の機能を提供します。

    QuickSave.Builder           | QuickSave オブジェクトを生成します。
    QuickSave.SaveData<T>       | T クラスのデータを Binary ファイルとして persistentDataPath に保存します。
    QuickSave.LoadData<T>       | T クラスのデータを persistentDataPath から読み込みます。

### 使用方法

```csharp
[MemoryPackable]
public partial class Monster
{
    public int HP;
    public long Attack;
    public long Defense;
}
```

```csharp
using Achieve.QuickSave

public class DataMng : MonoBehaviour
{
    QuickSave<Monster> data;

    void Start()
    {
        Monster monster = new Monster();
        monster.HP = 10000;
        monster.Attack = 10000;
        monster.Defense = 100000;

        data = new QuickSave<Monster>.Builder()
                                     .UseEncryption("ejrjejrtlq3mgfeq") // Data Protector を追加した場合に使用可能
                                     .UseVersion(55) // データのバージョンを設定
                                     .Build();

        // データを保存します。
        data.SaveData(monster);

        // 物理的に保存されたデータを読み込みます。
        var loadMonster = data.LoadData();
    }
}
```

---

## Dependencies
[Memory Pack](https://github.com/achieveonepark/MemoryPack#1.21.1) (1.21.1)

---

## ChangeLog
[link](https://github.com/achieveonepark/QuickSave/blob/main/CHANGELOG.md)

[git]: https://github.com/achieveonepark/quick-save
