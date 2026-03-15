---
title: Facebook SDK Build Issue (iOS)
date: 2024-11-16
tags:
  - iOS
  - Facebook SDK
  - Troubleshooting
---

# Facebook SDK Build Issue (iOS)

When `Facebook SDK 17.0.1` is installed on versions earlier than `Xcode 15.3`, the project builds successfully but crashes at runtime.<br>
I suspect this happens because the standard library `libswiftXPC`, which is available starting from Xcode 15.3, was added, and Facebook SDK 17.0.1 appears to rely on it.

After installing `Facebook SDK 17.0.1` in a Unity project and building with `Xcode 16.1`, initialization completed successfully at runtime without any issues.

<br><br><br><br><br>Updated on: 2024-11-16
