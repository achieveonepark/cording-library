---
title: Facebook SDK Build Issue (iOS)
date: 2024-11-16
tags:
  - iOS
  - Facebook SDK
  - Troubleshooting
---

# Facebook SDK Build Issue (iOS)

`Xcode 15.3 未満`のバージョンで `Facebook SDK 17.0.1` を導入すると、ビルド自体は成功しますが実行時にクラッシュが発生します。<br>
原因としては、Xcode 15.3 以降で利用できる標準ライブラリ `libswiftXPC` が追加され、Facebook SDK 17.0.1 がそれを使用しているためではないかと考えています。

実際に Unity プロジェクトへ `Facebook SDK 17.0.1` を導入し、`Xcode 16.1` でビルドして実行したところ、初期化は問題なく完了しました。

<br><br><br><br><br>Updated on: 2024-11-16
