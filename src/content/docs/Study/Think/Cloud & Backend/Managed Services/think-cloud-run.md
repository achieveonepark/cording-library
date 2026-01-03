---
title: Cloud Run
sidebar:
  order: 35
---

이 섹션의 핵심은 **“서버리스 함수(FaaS)보다 한 단계 위”**의 개념이다.

- **함수(FaaS)**: “짧은 코드 조각” 중심
- **Managed Services(Cloud Run, ECS/Fargate)**:  
  👉 **“항상 떠 있을 수 있는 컨테이너 기반 서버”를  
  👉 인프라 운영 부담 없이 관리형으로 제공**

Unity 개발자 관점에서는
> “**서버는 필요하지만, VM이나 쿠버네티스는 직접 운영하고 싶지 않을 때**”  
선택하는 영역이다.

---

## 1) Cloud Run (Google Cloud) — 서버리스 컨테이너

### 개념 한 줄 요약
**“HTTP로 호출되는 컨테이너를 서버리스처럼 운영한다”**

- 컨테이너(Docker 이미지)를 올리면
- 요청이 있을 때만 자동 실행/확장
- 요청이 없으면 0까지 축소 가능

👉 **FaaS와 CaaS의 중간 형태**

---

### Cloud Run의 핵심 특징

- **컨테이너 기반**
  - .NET / ASP.NET Core / Node / Go 등 자유로운 런타임
- **HTTP 중심**
  - 기본 인터페이스는 HTTPS
- **자동 스케일**
  - 트래픽에 따라 인스턴스 수 자동 조절
- **Scale to Zero**
  - 트래픽 없으면 비용 거의 0
- **상태는 Stateless 권장**
  - 컨테이너는 언제든 재시작/폐기 가능

---

### Unity + C#에서 Cloud Run을 쓰는 이유

#### 1️⃣ “함수로는 부족한 API 서버”
- 서버리스 함수는
  - 실행 시간 제한
  - 콜드 스타트
  - 파일/메모리 제약이 큼
- Cloud Run은
  - **ASP.NET Core API 서버 그대로 가능**
  - 미들웨어, 필터, DI, 라우팅 전부 사용 가능

👉 Unity에서 **일반 Web API 서버처럼 호출** 가능

---

#### 2️⃣ Firebase/Firestore와 궁합이 좋음
- Firebase Auth ID Token 검증
- Firestore Admin SDK 사용
- Firebase Functions로는 복잡한 경우 대체 가능

---

#### 3️⃣ Unity 실무 사용 예시

- 로그인 이후 **권한 검증 API**
- 리더보드 집계 서버
- 운영툴/관리자 API
- 배치성 처리 + HTTP 트리거
- 서버에서만 보관해야 하는 시크릿 키 처리

---

### Unity ↔ Cloud Run 통신 흐름

1. Unity에서 로그인 (Firebase Auth 등)
2. ID Token 획득
3. Unity → Cloud Run HTTPS 요청
4. Cloud Run
  - 토큰 검증
  - DB/외부 API 처리
5. JSON 응답 반환

---

### Cloud Run 주의사항 (Unity 기준)

- **Cold Start 존재**
  - 함수보단 덜하지만 최초 요청 지연 있음
  - 중요 API는 `min instances` 설정 고려
- **상태 저장 금지**
  - 메모리/로컬 파일에 데이터 저장하면 안 됨
- **장시간 작업**
  - 가능하지만, HTTP 타임아웃/구조 설계 필요
- **실시간 게임 서버 용도는 부적합**
  - WebSocket/UDP 기반 서버는 맞지 않음

### 한 문장 요약

- **Cloud Run**
  > “서버리스 감성의 컨테이너 API 서버”
