> For AI agents: the complete documentation index is available at /quick-save/ja/llms.txt, the full documentation bundle is available at /quick-save/ja/llms-full.txt.

# 変更履歴

## \[1.0.3] `最新` — 2026-05-23

### 追加

- **`SaveDataAsync(T data)`** — 非同期の保存メソッド。`File.WriteAllBytesAsync` ベースでメインスレッドをブロックしません。
- **`LoadDataAsync()`** — 非同期の読み込みメソッド。大容量の保存ファイルや遅いストレージ環境（モバイル）でフレームドロップを防ぎます。
- **`HasSaveData()`** — 読み込み前に保存ファイルの有無を確認できるメソッド。従来は `LoadData()` の戻り値が `null` かどうかを確認する必要がありました。

### バグ修正

- **`Builder.UseVersion()` 無視バグ** — `UseVersion(n)` 呼び出し時に設定したバージョン値が内部で常に `0` に固定される問題を修正しました。暗号化 + バージョン管理を併用する場合、保存ファイルのパスが意図と異なって生成されていました。
- **`SaveData<T>` 型パラメーターのシャドーイング** — `QuickSave<T>` クラスのジェネリック `T` と異なる型をシリアライズできてしまう構造的バグを修正しました。
- **`LoadData()` のエラー区別を改善** — ファイルなしは `null` を返し、デシリアライズ失敗は `InvalidDataException` を投げて、2 つのケースを明確に区別できるようにしました。

### パフォーマンス

- **保存ディレクトリ生成の最適化** — 呼び出しごとに `Directory.Exists` を実行する構造を改善しました。`Build()` 時に一度だけディレクトリを確認・作成し、以降はファイルパスをキャッシュします。

## \[1.0.2] — 2026-05-16

### 追加

- **`DeleteData()`** — 保存ファイル（`.acqs`）をランタイムで直接削除するメソッド。ファイルがない場合も例外を発生させません。
- **Editor メニュー `Achieve > Delete Save`** — `quicksave/` ディレクトリ内のすべての `.acqs` ファイルを一括削除するユーティリティ。削除前に確認ダイアログを表示します。

## \[1.0.0] — 2024-01-01

### 追加

- パッケージ初回リリース
- **`SaveData(T data)`** — MemoryPack ベースのバイナリシリアライズ保存
- **`LoadData()`** — バイナリファイルのデシリアライズ読み込み
- `Application.persistentDataPath/quicksave/` に `.acqs` 拡張子で保存
- **暗号化オプション** — `USE_ENCRYPT` define と DataProtector 連携で AES 暗号化に対応
- **バージョン管理** — `UseVersion(int)` でファイル名にバージョンを付与
- **Builder パターン** — `QuickSave<T>.Builder` でインスタンスを構成
