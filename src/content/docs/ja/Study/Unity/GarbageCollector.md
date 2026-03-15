---
title: GarbageCollector
---

## GarbageCollector とは？
- もう使われていないオブジェクトを見つけて、メモリから解放してくれる仕組みです。
- C++ の `delete` や `free()` に近い概念ですが、C# では自動で実行されます。
- ヒープメモリ上に存在し、そのメモリを管理します。
- 主に `new` で新しいオブジェクトを割り当てた結果、メモリ不足になりそうなときに呼ばれます。

## GC Alloc ...
- ヒープメモリに新しい割り当てが発生したことを意味します。
- Unity Profiler の `GC Alloc` と同じ概念です。
- 潜在的な危険を知らせる警告のようなものです。
- GC がすでに起きたという意味ではなく、起きる可能性が生まれたという意味です。
```csharp
void Update()
{
    // 毎フレーム、ヒープに生成される
    var list = new List<int>();
    list.Add(1);
}
```
- GC Alloc が 0 の状態がもっとも理想的で、`GC-free frame` と呼ばれます。

## Unity 開発者は ...
- ヒープ割り当てを最小化して GC を発生させないことが正しいメモリ管理です。
- ヒープ割り当てを最小化する = 無駄なオブジェクトを大量に生成しないことです。
- GC はメインスレッドで動くため、実行中はロジックが止まり、フレームドロップは避けられません。

## 発生しやすい代表例

### 文字列連結
```csharp
string profile = "Level " + player.Level + " " + player.Nickname;
```
- このように string の `+` 演算子を使うと、文字列の不変性によって新しいインスタンスが繰り返し作られ、GC の原因になります。
- 結論: `StringBuilder` または文字列補間を使いましょう。

### LINQ
- ヒープ割り当てのブラックボックスと呼ばれます。
- パフォーマンスに敏感なら、LINQ より `for` や `foreach` で回すのが基本です。
```csharp
var result = list.Where(x => x.IsActive);
```
- ラムダ式が含まれるため、ヒープ上に delegate オブジェクトが生成されます。
- 呼ぶたびに GC Alloc が発生します。
- `ToList`、`Select`、`OrderBy` などの LINQ メソッドは新しいコレクションを生成するため、追加のヒープ割り当ても発生します。
- `IEnumerator<T>` を使うため、値型を扱うと boxing が起きることがあります。
```csharp
List<int> numbers = new ();
numbers.Where(x => x > 0;) // int -> object
```
- 結論: 一度だけ実行して終わる処理や、コンパイル時・ロード時の処理に向いています。

### foreach
```csharp
foreach (Transform trf in transforms)
{
    //
}
```
- Unity の Transform コンポーネントのように struct ベースのカスタム Enumerator を使う場合、`foreach` が内部で `IEnumerator` へキャストする過程で boxing が起こることがあります。
- 一般的にも、構造体を `foreach` で走査すると `IEnumerator` への変換で boxing が発生する場合があります。
- 結論: 参照型クラス、小さなコレクション、構造が明確なケース、ジェネリックコレクションの走査では比較的安全に使えます。

### ラムダ式と無名メソッド
```csharp
button.onClick.AddListener(() => Debug.Log("Clicked"));
```
- ラムダ内部にキャプチャがあるとヒープにオブジェクトが生成されます。
- キャプチャがなくても Delegate オブジェクト生成で GC Alloc が発生します。
- 結論: 先に関数を定義して、その参照を渡しましょう。

### Instantiate / Destroy
- 当然ですが、生成や削除を直接行う場合も GC Alloc が発生します。
- `Destroy` は実際の破壊がフレーム後に行われ、メモリ整理も遅れて進むため、連続利用すると GC が集中して大きなフレーム落ちを起こします。
- 結論: Pooling を使いましょう。
