---
title: IaaS vs CaaS vs PaaS vs FaaS
sidebar:
  order: 31
---

## 1) IaaS vs CaaS vs PaaS vs FaaS — Unity 개발자가 체감하는 차이

### IaaS (Infrastructure as a Service) — VM 직접 운영
**예:** AWS EC2, GCP Compute Engine, Azure VM

- **내가 관리하는 것**
  - OS 패치, 방화벽/네트워크, 런타임 설치(.NET, Nginx), 배포, 스케일링, 모니터링
- **장점**
  - 자유도가 최상(네트워크/OS/스택 마음대로)
  - 장기 고정 비용으로 안정적 운영 가능
- **단점**
  - 운영 부담이 큼(“서버 관리”가 진짜로 생김)
- **Unity 관점**
  - **실시간 게임 서버(룸/매치/전투)**처럼 “지속 실행”이 필요하거나
  - 특정 미들웨어/네트워크 튜닝이 필요하면 IaaS가 여전히 강함

---

### CaaS (Containers as a Service) — 컨테이너 단위로 운영
**예:** GKE/Kubernetes, ECS/EKS, Cloud Run(=서버리스 컨테이너 느낌도 있음), Azure Container Apps

- **내가 관리하는 것**
  - 앱을 컨테이너(Docker)로 패키징
  - 배포/스케일 정책, 환경변수/시크릿, 관측(로그/메트릭)
  - (K8s라면) 클러스터 구성/운영까지 일부 필요
- **장점**
  - 실행 환경이 일정(“내 PC에서 되는데 서버에서 안됨”이 줄어듦)
  - 확장/롤백/버전관리 편함
- **단점**
  - 컨테이너/네트워크/스케일링 이해가 필요
- **Unity 관점**
  - **HTTP API 서버**를 .NET으로 만들고 컨테이너로 올리면 표준적인 운영이 됨
  - 서버리스 함수보다 “장시간 처리/의존성 많은 서비스”에 유리

---

### PaaS (Platform as a Service) — 앱 서비스 형태로 배포
**예:** Azure App Service, GCP App Engine, AWS Elastic Beanstalk

- **내가 관리하는 것**
  - 코드(혹은 빌드 산출물) 배포, 스케일/인스턴스 설정 정도
- **장점**
  - VM/컨테이너보다 운영 부담이 훨씬 적음
  - 배포 파이프라인 단순
- **단점**
  - 런타임/네트워크/파일시스템 제약이 있을 수 있음
- **Unity 관점**
  - **전형적인 웹 API + 관리자 페이지** 운영에 편함
  - “서버는 필요하지만, 쿠버네티스까지는 싫다”면 좋은 중간지점

---

### FaaS (Function as a Service) — 서버리스 함수
**예:** AWS Lambda, Google Cloud Functions, Firebase Functions

- **내가 관리하는 것**
  - “함수 코드” + 트리거(HTTP, 스케줄, DB 이벤트 등)
  - 권한/시크릿/환경변수
- **장점**
  - 인프라 운영감이 거의 없음
  - 트래픽이 없으면 비용이 거의 0에 가까울 수 있음(요청 기반 과금)
  - 이벤트 기반(푸시/DB 변화/스토리지 업로드)에 강함
- **단점**
  - **Cold Start**(처음 호출 시 지연), 실행시간 제한, 상태 저장 어려움(Stateless)
  - 로컬 디버깅/관측이 서비스마다 다소 까다로움
- **Unity 관점**
  - Unity 클라이언트는 **“함수 호출자”**가 되고,
  - 서버리스는 **권한 검증 + 결제 검증 + 이벤트 처리 + 데이터 조작** 같은 “백엔드 조각”에 최적


