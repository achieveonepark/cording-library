---
title: MVC / MVP / MVVM
sidebar:
  order: 16
---

## 목적
UI 코드에서 다음 책임을 분리하기 위함이다.
- 화면 표시
- 사용자 입력
- 상태와 로직

## MVC (Model View Controller)
- Model: 데이터
- View: 화면
- Controller: 입력 처리

특징:
- 구조가 단순하다
- View와 Controller 경계가 흐려지기 쉽다

## MVP (Model View Presenter)
- View: 화면과 인터페이스
- Presenter: 로직 담당
- Model: 데이터

특징:
- View가 수동적이다
- 테스트가 용이하다
- Unity에서 많이 사용된다

## MVVM (Model View ViewModel)
- ViewModel이 상태와 로직을 담당한다
- View는 바인딩만 수행한다

특징:
- 상태 관리에 강하다
- 데이터 바인딩 의존도가 높다

## 비교 요약
- MVC: 단순하지만 확장에 취약
- MVP: 테스트 친화적
- MVVM: 복잡하지만 상태 관리에 강함

## 정리
MVC, MVP, MVVM은 아키텍처가 아니라
표현 계층(UI)을 위한 패턴이다.
