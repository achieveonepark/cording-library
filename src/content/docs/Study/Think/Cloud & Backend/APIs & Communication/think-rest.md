---
title: ECS & Fargate
sidebar:
  order: 37
---

REST(Representational State Transfer)는  
HTTP를 기반으로 리소스를 다루는 가장 보편적인 API 통신 방식이다.

Unity에서 서버 통신을 한다고 하면  
가장 먼저, 그리고 가장 많이 접하게 되는 방식이 REST다.

---

## 1. REST의 핵심 개념

### 리소스 중심 설계
- URL은 동작이 아니라 리소스(명사)를 표현한다
- 실제 동작은 HTTP Method로 구분한다

예시:
GET /users/123  
POST /scores  
PUT /profile  
DELETE /mailbox/45

---

### HTTP Method 의미

- GET: 조회
- POST: 생성 또는 요청
- PUT: 전체 수정
- PATCH: 부분 수정
- DELETE: 삭제

---

### Stateless
- 서버는 요청 간 상태를 기억하지 않는다
- 인증 정보는 매 요청마다 포함된다

Unity 클라이언트는  
"이 요청 하나만으로 처리 가능하게" 설계해야 한다.

---

## 2. Unity에서 REST를 쓰는 전형적인 구조

Unity Client  
→ HTTP(JSON)  
→ REST API Server  
→ Database / External API

- 데이터 포맷: JSON
- 인증 방식: Bearer Token, Firebase Auth Token 등

---

## 3. Unity + C#에서 REST의 장단점

### 장점
- 이해하기 쉽다
- 디버깅이 쉽다 (Postman, curl)
- UnityWebRequest, HttpClient 모두 사용 가능
- 서버리스, 컨테이너, VM 어디서나 사용 가능

### 단점
- 필요한 데이터보다 많이 받거나 적게 받는 문제
- 엔드포인트 수가 증가하기 쉬움
- 빈번한 요청에서 네트워크 오버헤드 증가

---

## 4. Unity 실무 사용 예시

- 로그인 / 인증
- 랭킹 조회 및 등록
- 인앱 결제 검증
- 출석 체크
- 관리자/운영 API

모바일 게임 백엔드의 기본 선택지다.

---

## 5. Unity 기준 설계 시 주의점

- 요청 실패는 정상 케이스로 처리
- 타임아웃 / 재시도 기본 구현
- Idempotency 고려 (중복 요청 방지)
- API 버전 관리 (/v1, /v2 등)

---

## 6. 한 줄 요약

REST는  
Unity 클라이언트에서 가장 안정적이고 범용적인 통신 방식이다.
