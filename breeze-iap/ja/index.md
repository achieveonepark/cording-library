> For AI agents: the complete documentation index is available at https://docs.somiri.dev/breeze-iap/ja/llms.txt, the full documentation bundle is available at https://docs.somiri.dev/breeze-iap/ja/llms-full.txt.

# 概要

**Unity IAP を async/await で。**
Unity IAP v5.3.0+ ベースの軽量な課金ラッパー。コールバックなしで、1 行の `await` で初期化・購入を処理します。

## 特徴

- ⚡ **シンプルな async/await API** — `InitializeAsync` 一回、`PurchaseAsync` 一回。`IStoreListener` の実装やコールバックチェーンなしで課金フローを記述できます。
- 🔄 **未確定購入の自動処理** — アプリのクラッシュなどで確定されなかった購入を、初期化時に自動的に収集します。`GetPendingList()` で一括処理できます。
- ⏱️ **組み込みタイムアウト** — 初期化の各ステップに 10 秒、購入に 60 秒のタイムアウトが組み込まれており、ストアが無応答でもアプリが固まりません。
- 🍎 **iOS の復元に対応**

## クイックリンク

- [はじめに](https://docs.somiri.dev/breeze-iap/ja/getting-started.md)
- [API リファレンス](https://docs.somiri.dev/breeze-iap/ja/api/initialize.md)
- [GitHub](https://github.com/achieveonepark/breeze-iap)
