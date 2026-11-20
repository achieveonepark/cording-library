> For AI agents: the complete documentation index is available at /lite-db/ja/llms.txt, the full documentation bundle is available at /lite-db/ja/llms-full.txt.

# 概要

LiteDB は、Unity プロジェクトで SQLite データベースを読み取り専用のテーブルデータストアとして扱うための軽量パッケージです。ゲームバランスデータ、クエスト、アイテム、ローカライズテキストのように、ビルドに含まれる静的データを C# モデルにマッピングして取得できます。

このパッケージは sqlite-net や SQLite Asset パッケージをラップしません。`SQLiteConnection`、`[Table]`、`[PrimaryKey]` のような馴染みのあるインターフェースを提供しつつ、内部ではネイティブの SQLite C API を直接呼び出します。

## 機能

- StreamingAssets に含まれる DB ファイルをランタイムストレージにコピーして初期化
- 主キーによる単一レコードの取得
- Id 範囲のクエリ、存在チェック、安全な取得
- Editor の CSV Importer による CSV テーブルの挿入
- CSV ヘッダーに基づくデータモデルのコード生成
- ローカライズヘルパー

## 次のステップ

- [はじめに](/lite-db/ja/getting-started.md) — インストールから最初のクエリまで
- [使い方](/lite-db/ja/usage.md) — データモデル、CSV Importer、ローカライズ
- [API](/lite-db/ja/api.md) — ランタイム API リファレンス
