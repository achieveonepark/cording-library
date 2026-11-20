> For AI agents: the complete documentation index is available at /data-protector/ja/llms.txt, the full documentation bundle is available at /data-protector/ja/llms-full.txt.

# 概要

Data Protector は、`byte[]` と `string` データを保存する前に圧縮・暗号化し、外部から容易にアクセスできないように保護するパッケージです。

## 主な機能

- `byte[]` と `string` データの圧縮および暗号化
- 暗号化にはユーザーが指定する 16 バイトの文字列キーを使用
- `SHA256` ベースのハッシュ値を生成・比較してファイルの変更を検出

## 仕組み

- データのセキュリティには `AES-128` 暗号化を使用します。
- 圧縮は C# の `GZipStream` で処理し、保存領域を効率的に使用します。

## 次のステップ

- [はじめに](/data-protector/ja/getting-started.md) — インストールと基本的な使い方
- [API](/data-protector/ja/api.md) — API リファレンス全体
