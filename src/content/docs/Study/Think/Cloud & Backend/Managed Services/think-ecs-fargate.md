---
title: Rest
sidebar:
  order: 38
---

### ECS vs Fargate 관계

- **ECS on EC2**
  - EC2를 직접 관리
  - 비용 최적화 가능
  - 운영 부담 큼
- **ECS + Fargate**
  - 서버 개념 없음
  - 컨테이너 단위 과금
  - 운영 부담 최소

Unity 관점에서는 **대부분 Fargate 선택**

---

### ECS / Fargate의 핵심 특징

- **컨테이너 기반**
  - Docker 이미지 필수
- **항상 실행되는 서비스 가능**
  - HTTP API 서버
  - 백그라운드 워커
- **상태ful 서비스도 가능**
  - 서버 인스턴스 개념이 존재
- **네트워크 제어 강력**
  - VPC, 보안 그룹, 내부 통신 설계 가능

---

### Unity + C#에서 ECS/Fargate를 쓰는 이유

#### 1️⃣ “항상 떠 있는 API 서버”
- Cloud Run/FaaS는 Scale to Zero
- ECS/Fargate는 **항상 실행 유지 가능**

👉 **지연 없는 API**가 필요할 때 유리

---

#### 2️⃣ 서버 구조가 복잡한 경우
- Web API + 워커 + 큐 소비자
- 외부 TCP 서비스 연동
- 장시간 작업 처리

---

#### 3️⃣ Unity 실무 사용 예시

- 게임 백엔드 API 서버
- 매치메이킹 보조 서버
- 비동기 워커(큐 처리, 통계 집계)
- 관리자 웹 서버

---

### Unity ↔ ECS/Fargate 통신 흐름

1. Unity → ALB(Application Load Balancer)
2. ALB → ECS Service(Task)
3. 컨테이너(.NET API) 처리
4. DB/Redis/SQS 등 연동
5. 응답 반환

---

### ECS/Fargate 주의사항 (Unity 기준)

- **Scale to Zero 불가**
  - 최소 실행 비용 존재
- **배포/롤백 구조 설계 필요**
  - Task Definition, Service 업데이트
- **로그/모니터링 설정 필수**
  - CloudWatch 로그/메트릭
- **운영 개념 이해 필요**
  - 네트워크, IAM, 로드밸런서 개념 필수

---

## 3) Cloud Run vs ECS/Fargate — Unity 개발자 비교

| 항목 | Cloud Run | ECS / Fargate |
|---|---|---|
| 실행 단위 | 컨테이너 | 컨테이너 |
| 서버 관리 | 없음 | 없음(Fargate) |
| Scale to Zero | 가능 | 불가 |
| Cold Start | 있음 | 없음 |
| 항상 실행 | ❌ | ✅ |
| HTTP API | 매우 적합 | 매우 적합 |
| 상태ful 서비스 | 부적합 | 가능 |
| 운영 난이도 | 낮음 | 중간 |
| 실시간 서버 | ❌ | ⚠️(가능은 하나 적합도 중간) |

---

## 4) Unity 기준 선택 가이드

### Cloud Run이 잘 맞는 경우
- 서버 운영 부담을 최소화하고 싶다
- HTTP API 위주
- 요청이 들쭉날쭉하다
- Firebase/Firestore 중심 프로젝트
- 관리자 API, 검증 서버

---

### ECS / Fargate가 잘 맞는 경우
- 항상 떠 있는 서버가 필요하다
- 지연 없는 응답이 중요하다
- API + 워커 + 큐 구조가 필요하다
- AWS 생태계를 이미 쓰고 있다

---

## 5) 실무에서 자주 쓰는 하이브리드 구성

- **Unity 클라이언트**
- **Cloud Run**
  - 인증/검증/관리 API
- **ECS/Fargate**
  - 상시 실행 API 서버
  - 워커/집계/매치 보조
- **FaaS**
  - 이벤트 후처리
  - 배치/정산/트리거

👉 “**하나로 통일하지 않는다**”가 현실적인 답

---

## 6) 한 문장 요약

- **ECS / Fargate**
  > “서버 없이 운영하는 항상 실행되는 컨테이너 서버”