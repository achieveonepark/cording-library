---
title: Overview
sidebar:
  order: 0
---

:::note

이 폴더의 게시글들은 필자가 공부하기 위해 ChatGPT에게 질문하여 나온 결과들을 적재해둔 내용입니다.

:::

## 1. Languages & Runtimes

> 언어 자체보다 **런타임 모델을 이해하고 있느냐**가 대화의 깊이를 결정한다.

### Languages

#### [C# / .NET](./languages/think-csharp/)

* 게임 클라이언트(Unity), 툴링, 서버까지 폭넓게 사용됨
* 주요 대화 포인트

  * GC 압박이 언제 발생하는가
  * async/await가 Task를 어떻게 스케줄링하는가
  * IL2CPP / AOT 환경에서 무엇이 달라지는가
* **"왜 이 코드는 allocation이 많죠?"** 같은 질문에 답할 수 있어야 신뢰가 생김

#### [TypeScript](./languages/think-type-script/)

* JS 생태계에서 **협업을 가능하게 만드는 언어**
* 주요 대화 포인트

  * 타입은 설계를 문서화하는 수단이다
  * any를 쓰는 순간 무슨 비용이 발생하는가
  * API 변경이 컴파일 타임에 어떻게 감지되는가

#### [JavaScript](./languages/think-java-script/)

* 모든 웹 기술의 기반
* 주요 대화 포인트

  * 이벤트 루프 / 마이크로태스크 / 매크로태스크
  * Promise 체이닝 vs async/await
  * 싱글 스레드인데 왜 병렬처럼 보이는가

#### [Python](./languages/think-python/)

* 빠른 검증과 자동화의 언어
* 주요 대화 포인트

  * GIL의 의미와 한계
  * 왜 서버는 Python으로 시작했다가 다른 언어로 옮기는가

#### [Go](./languages/think-go/)

* 단순함을 무기로 한 서버·CLI 언어
* 주요 대화 포인트

  * goroutine은 스레드가 아니다
  * 채널 기반 설계의 장단점
  * 왜 DevOps 도구는 Go가 많은가

#### [Bash / PowerShell](./languages/think-bash-powershell/)

* 인프라 감각의 바로미터
* 주요 대화 포인트

  * 사람이 아니라 **CI가 실행한다**는 관점
  * 실패를 감지하는 스크립트 vs 성공만 가정하는 스크립트

---

### Runtime Concepts

* [**CLR / JIT / AOT**](./runtime-concepts/think-clr-jit-aot)<br/>
  → 빌드 시간 vs 실행 시간 vs 메모리 사용량의 트레이드오프

* [**Garbage Collection**](./runtime-concepts/think-gc)<br/>
  → 언제 튀는가, 왜 튀는가, 어떻게 피하는가

* [**Thread / Task / Async Runtime**](./runtime-concepts/think-thread-task)<br/>
  → CPU-bound / IO-bound 구분이 되는가

* [**Event Loop (Node.js)**](./runtime-concepts/think-eventloop)<br/>
  → 비동기 코드 순서를 그림으로 설명할 수 있는가

* [**Native Interop (P/Invoke, JNI)**](./runtime-concepts/think-native-interop)<br/>
  → 엔진/플랫폼 이야기로 넘어갈 때 필수

* **그 외 Model들**<br/>
  → [Execution Model](./runtime-concepts/think-execution-model)<br/>
  → [Memory Model](./runtime-concepts/think-memory-model)<br/>
  → [Concurrency Model](./runtime-concepts/think-concurrency-model)

---

## 2. Architecture & Design

> 아키텍처는 정답이 아니라 **의사결정 기록**이다.

### Architectural Styles

* [**Layered Architecture**](./architecture--design/think-layered-architecture)<br/>
  → 단순하지만 의존성 방향이 무너지기 쉬움

* [**Clean Architecture**](./architecture--design/think-clean-architecture)<br/>
  → 테스트와 장기 유지보수를 중시할 때

* [**Hexagonal (Ports & Adapters)**](./architecture--design/think-hexagonal-architecture)<br/>
  → 외부 세계(DB, 네트워크, UI)를 교체 가능하게 만드는 구조

* [**MVC / MVP / MVVM**](./architecture--design/think-mvc-mvvm-architecture)<br/>
  → UI와 상태 관리의 책임 분리

* [**CQRS / Event-driven**](./architecture--design/think-cqrs-event-driven-architecture)<br/>
  → 규모가 커질 때 등장하는 선택지

* [**Unity-Oriented**](./architecture--design/think-additional-architecture)

---

### [**Design Concepts**](./design-concepts/think-design-concepts) (대화에 반드시 나오는 단어들)

* [**Ownership**](./design-concepts/think-design-concepts#1-ownership--책임은-어디에-있는가): 이 데이터는 누가 책임지는가
* [**Lifecycle**](./design-concepts/think-design-concepts#2-lifecycle--언제-존재해야-정상인가): 언제 생성되고 언제 파괴되는가
* [**Boundary**](./design-concepts/think-design-concepts#3-boundary--책임의-경계는-어디까지인가): 여기까지가 이 시스템의 책임인가
* [**Coupling / Cohesion**](./design-concepts/think-design-concepts#4-coupling--cohesion--바꾸기-쉬운-구조인가): 바꾸기 쉬운가
* [**Trade-offs**](./design-concepts/think-design-concepts#5-trade-offs--무엇을-포기했는가): 무엇을 포기했는가

> 설계 리뷰에서 코드보다 먼저 나오는 질문들

---

## 3. Asynchronous & Concurrency

> 대부분의 버그는 비동기 경계에서 발생한다.

### Async Models

* [async / await](./async--concurrency/think-async-models)
* [Promise / Future](./async--concurrency/think-promise-future)
* [Coroutine](./async--concurrency/think-coroutine)
* [Reactive (Rx)](./async--concurrency/think-reactive)
* [Actor Model](./async--concurrency/think-actor-model)

**대화 포인트**

* 예외는 어디로 전파되는가
* 취소(Cancellation)는 설계에 포함되어 있는가

---

### Concurrency Primitives

* [ThreadPool](./async--concurrency/concurrency-primitives/think-threadpool)
* [Job Queue](./async--concurrency/concurrency-primitives/think-jobqueue)
* [Channel / Queue](./async--concurrency/concurrency-primitives/think-channel-queue)
* [Lock / Mutex / Semaphore](./async--concurrency/concurrency-primitives/think-lock-mutex-semaphore)
* [CAS / Lock-free](./async--concurrency/concurrency-primitives/think-cas-lock-free)

**"thread-safe한가요?"** 라는 질문은
→ **어떤 상태를 보호하고 있는가**라는 질문이다.

---

## 4. Package & Dependency Management

> 패키지는 코드보다 **신뢰**를 배포한다.

### Package Managers

* npm / pnpm / yarn
* NuGet
* Unity Package Manager

### Dependency Strategies

* Semantic Versioning
* Dependency Pinning
* Peer / Transitive Dependency
* Vendoring

**대화 포인트**

* 왜 lockfile이 필요한가
* 버전 충돌은 언제 발생하는가
* 재현 가능한 빌드는 왜 중요한가

---

## 5. CI / CD & Automation

> CI는 개발 문화의 압축 파일이다.

### CI Concepts

* Pipeline
* Stage / Job
* Artifact
* Cache
* Triggering & Scheduling
* Matrix Build
* Reproducible Build

**중요한 질문**

* 이 빌드는 언제 깨지는가
* 로컬과 CI의 차이는 무엇인가

---

## 6. Containers & Execution Environments

### Containers

* Image vs Container
* Dockerfile
* Multi-stage Build
* Image Layer Cache
* Public vs. Private Registries (Docker Hub, AWS ECR, GCP GCR)

**"내 컴퓨터에선 됐는데요"** 를 없애기 위한 도구

### Orchestration

* Kubernetes
* Helm / Kustomize

> 직접 쓰지 않더라도 개념을 알면 서버 팀과 대화가 된다.

---

## 7. Cloud & Backend

### Serverless

* IaaS (VMs) vs. CaaS (Containers) vs. PaaS (App Service) vs. FaaS (Serverless
  Functions
* AWS Lambda
* Google Cloud Functions
* Firebase Functions

### Managed Services

* Cloud Run
* ECS / Fargate

### APIs & Communication

* REST
* GraphQL
* gRPC
* WebSocket

### Messaging & Eventing

* SQS
* RabbitMQ
* Kafka
* Kinesis

### SQL, NoSQL, NewSQL?

**대화 포인트**

* 동기 vs 비동기
* 요청 수 vs 연결 수

---

## 8. Data & Storage

### Databases

* PostgreSQL / MySQL
* Redis
* Firestore
* CDN

### Data Formats

* JSON
* Protobuf
* MessagePack

### Storage Types

* [**Block Storage**]()<br>
  → EBS, for VMs
* [**Fire Storage**]()<br/>
  → NFS, EFS, for shared access
* [**Object Storage**]()<br/>
  → S3, GCS, for blobs, backups, static assets

**"왜 이 포맷을 썼나요?"** 에 답할 수 있어야 함

---

## 9. Security & Identity

* OAuth 2.0
* JWT
* API Key
* IAM / RBAC
* OpenID Connect (OIDC)
* SAML (Enterprice SSO)

### Access Control:

* RBAC
* ABAC
* IAM

> 보안은 기능이 아니라 **전제 조건**이다.

---

## 10. Observability & Operations

### Logging

* Structured Logging
* Trace ID

### Monitoring & Tracing

* Prometheus
* OpenTelemetry
* Sentry

### Reliability Patterns

* Health Checks
* Retry
* Timeout
* Circuit Breaker
* Rate Limiting & Throttling

---

## 11. Unity & Game Dev Context

* Unity + .NET Runtime
* IL2CPP / AOT
* Addressables / Asset Pipeline
* Build Automation

> 게임 개발자는 **엔진·플랫폼·서버** 언어를 동시에 쓴다.
 
---

## 마무리

이 리스트를 **전부 잘할 필요는 없다**.
하지만, 어떤 키워드가 나왔을 때

* *아, 그건 이런 맥락의 문제구나*
* *이 선택에는 이런 비용이 따르겠구나*

라고 이어서 말할 수 있다면, 이미 **기술로 소통하고 있는 상태**다.
