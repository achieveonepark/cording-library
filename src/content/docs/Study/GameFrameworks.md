---
title: GameFrameworks
---
# Framework 구상하기

## 사용하고자 하는 패키지
### 데이터
- ### VContainer
- ### LiteDB (Local Save)
- ### Cloud Firestore (Cloud Save)

### 리소스
- ### Unity Addressables

### UI 및 시스템
- ### UniTask
- ### R3
- ### Breeze IAP
- ### Google Sign in
- ### Apple Sign in
- ### Unity Ads

## 데이터 흐름
### SP : VContainer LifetimeScope에서 데이터 주입
1. Addressables로 데이터 최신 확인 및 다운로드
2. LiteDB로 정적 데이터 주입
3. 이후 데이터 사용

## 코드 사용 흐름
- R3를 통해 UI 처리는 Reactive하게 동작
- GC를 발생시키는 Coroutine 대신 비동기식인 UniTask를 이용한 다양한 기능