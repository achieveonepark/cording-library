---
title: FacebookSDK
---

# Facebook SDK Build Issue (iOS)

`xcode 15.3 미만`의 버전에서 `Facebook SDK 17.0.1`을 설치했을 때 빌드는 동작하나 Crash 이슈가 발생합니다.<br>
그 이유는 15.3 버전 이상에서 사용할 수 있는 `libswiftXPC`라는 표준 라이브러리가 추가되었고, Facebook SDK 17.0.1 버전에서 해당 라이브러리를 사용하는 이유인 것으로 추측됩니다.

하여, xcode 16.1 버전에서 유니티 프로젝트에 `Facebook SDK 17.0.1`을 설치한 후 빌드 후 런타임 실행했을 때에는 문제 없이 잘 Initialize 되었습니다.


<br><br><br><br><br>Updated on: 2024-11-16