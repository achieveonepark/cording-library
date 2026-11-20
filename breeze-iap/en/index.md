> For AI agents: the complete documentation index is available at https://docs.somiri.dev/breeze-iap/en/llms.txt, the full documentation bundle is available at https://docs.somiri.dev/breeze-iap/en/llms-full.txt.

# Introduction

**Unity IAP, done with async/await.**
A lightweight purchasing wrapper based on Unity IAP v5.3.0+. Handle initialization and purchases with a single line of `await`, no callbacks.

## Features

- ⚡ **Simple async/await API** — One `InitializeAsync`, one `PurchaseAsync`. Write your purchase flow without implementing `IStoreListener` or chaining callbacks.
- 🔄 **Automatic pending-purchase handling** — Purchases left unconfirmed due to app crashes and the like are collected automatically at initialization. Handle them all at once with `GetPendingList()`.
- ⏱️ **Built-in timeouts** — A 10-second timeout per initialization step and a 60-second purchase timeout are built in, so your app won't hang even when the store is unresponsive.
- 🍎 **iOS restore support**

## Quick links

- [Getting Started](https://docs.somiri.dev/breeze-iap/en/getting-started.md)
- [API Reference](https://docs.somiri.dev/breeze-iap/en/api/initialize.md)
- [GitHub](https://github.com/achieveonepark/breeze-iap)
