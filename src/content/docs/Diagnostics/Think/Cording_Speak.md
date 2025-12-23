---
title: 코드로 소통하기
---

뭘 알아야 할까? 일단 나열해보기.

# Developer Technology Landscape

## 1. Languages & Runtimes

### Languages
- [C# / .NET](https://learn.microsoft.com/dotnet/)  
  게임 클라이언트, 툴링, 서버까지 폭넓게 쓰이는 언어.  
  GC, async/await, 런타임 특성 이해가 깊을수록 설계 이야기에서 강해짐.

- [TypeScript](https://www.typescriptlang.org/)  
  프론트엔드와 서버(Node.js) 양쪽에서 타입 안정성을 확보하기 위한 선택.  
  대규모 코드베이스에서 협업을 전제로 많이 사용됨.

- [JavaScript](https://developer.mozilla.org/docs/Web/JavaScript)  
  브라우저, 서버, 툴링 전반의 기반 언어.  
  이벤트 루프와 비동기 모델 이해가 중요함.

- [Python](https://docs.python.org/3/)  
  스크립팅, 자동화, 서버, 데이터 처리에 자주 사용됨.  
  “빠르게 만들고 검증”하는 용도로 GitHub 레포에서 자주 보임.

- [Go](https://go.dev/doc/)  
  단순한 문법과 빠른 빌드, 정적 바이너리 배포가 장점.  
  CLI 도구, 서버, 인프라 유틸리티에 많이 사용됨.

- [Bash / PowerShell](https://learn.microsoft.com/powershell/)  
  CI/CD, 빌드 스크립트, 환경 설정 자동화의 핵심 도구.  
  인프라 감각이 있는 개발자일수록 자연스럽게 사용함.

---

### Runtime Concepts
- [.NET Runtime](https://learn.microsoft.com/dotnet/core/introduction)  
  JIT/AOT, GC, 스레딩 모델 이해는 성능·메모리 질문에 직접 연결됨.

- [Node.js](https://en.wikipedia.org/wiki/Node.js)  
  단일 스레드 이벤트 루프 기반 런타임.  
  “왜 이게 빠른가/느린가”를 설명할 수 있으면 신뢰도가 올라감.

- [Event Loop](https://developer.mozilla.org/docs/Web/JavaScript/EventLoop)  
  비동기 코드 실행 순서를 설명할 때 빠지지 않는 개념.  
  async/await, Promise 이해의 핵심.

---

## 2. Architecture & Design

### Architectural Styles
- [Clean Architecture](https://en.wikipedia.org/wiki/Clean_architecture)  
  비즈니스 로직을 외부 의존성으로부터 분리하기 위한 구조.  
  테스트 용이성과 장기 유지보수를 중시할 때 선택됨.

- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)  
  포트와 어댑터를 기준으로 외부 시스템(DB, UI)을 분리하는 방식.  
  서버·툴·엔진 코드에서 자주 언급됨.

- [MVC / MVVM](https://learn.microsoft.com/azure/architecture/mvc)  
  UI와 로직 분리를 위한 전통적인 패턴.  
  Unity, 프론트엔드, 데스크톱 앱에서 공통 언어로 쓰임.

---

### Design Concepts
- **Ownership**: 이 객체/데이터를 누가 책임지는가
- **Lifecycle**: 언제 생성되고 언제 해제되는가
- **Boundary**: 어디까지가 이 시스템의 책임인가

설계 대화에서 코드보다 먼저 나오는 단어들.

---

## 3. Asynchronous & Concurrency

### Async Models
- [async / await](https://learn.microsoft.com/dotnet/csharp/programming-guide/concepts/async/)  
  비동기 흐름을 직선적으로 표현하기 위한 문법.  
  가독성과 예외 처리 방식이 핵심 포인트.

### Concurrency Primitives
- [Thread / Task / Mutex](https://learn.microsoft.com/dotnet/standard/threading/)  
  멀티스레드 안전성, 성능, 데드락 논의의 출발점.  
  “thread-safe 한가요?” 질문의 근간.

---

## 4. Package & Dependency Management

### Package Managers
- [npm / pnpm / yarn](https://docs.npmjs.com/)  
  JavaScript 생태계의 기본 인프라.  
  lockfile과 의존성 트리 이해가 중요함.

- [NuGet](https://www.nuget.org/)  
  .NET 패키지 관리 표준.  
  버전 충돌, 트랜지티브 의존성 이슈가 자주 발생함.

- [Unity Package Manager](https://learn.unity.com/tutorial/upm-overview)  
  Unity 프로젝트 모듈화를 위한 공식 수단.  
  내부 패키지 배포와 연관됨.

---

### Dependency Strategies
- [Semantic Versioning](https://semver.org/)  
  버전 번호로 변경 범위를 표현하는 규칙.  
  “업데이트해도 안전한가?” 대화의 기준.

- **Peer / Transitive / Vendoring**  
  의존성 충돌과 재현 가능한 빌드를 다룰 때 등장하는 개념.

---

## 5. CI / CD & Automation

### CI Platforms
- [GitLab CI](https://docs.gitlab.com/ee/ci/)  
  코드부터 배포까지 자동화하기 위한 파이프라인 시스템.  
  게임/엔터프라이즈 환경에서 많이 사용됨.

- [GitHub Actions](https://docs.github.com/actions)  
  GitHub와 밀접하게 통합된 CI/CD 도구.  
  오픈소스 레포에서 표준처럼 사용됨.

- [Jenkins](https://www.jenkins.io/doc/)  
  가장 오래된 CI 도구 중 하나.  
  커스터마이징이 강하지만 관리 비용이 큼.

---

### CI Concepts
- **Pipeline**: 전체 자동화 흐름
- **Artifact**: 빌드 결과물
- **Cache**: 빌드 시간 단축 수단

CI 대화에서 반드시 등장하는 공통 용어.

---

## 6. Containers & Execution Environments

### Container Basics
- [Docker](https://docs.docker.com/)  
  실행 환경을 코드로 고정하기 위한 표준 도구.  
  “내 로컬에선 되는데” 문제를 줄여줌.

- **Multi-stage Build**  
  빌드 결과만 남기고 불필요한 레이어를 제거하는 방식.

---

### Orchestration
- [Kubernetes](https://en.wikipedia.org/wiki/Kubernetes)  
  컨테이너를 대규모로 운영하기 위한 플랫폼.  
  운영·인프라 감각의 상징처럼 여겨짐.

- **Helm / Kustomize**  
  Kubernetes 설정을 관리하기 위한 도구들.

---

## 7. Cloud & Backend

### Serverless
- [AWS Lambda](https://en.wikipedia.org/wiki/AWS_Lambda)  
  서버 관리 없이 함수 단위로 실행하는 모델.  
  이벤트 기반 아키텍처에서 자주 사용됨.

- [Google Cloud Functions](https://cloud.google.com/functions)  
  GCP 기반 서버리스 함수.  
  Firebase와 자주 함께 쓰임.

- [Firebase Functions](https://firebase.google.com/docs/functions)  
  모바일/게임 백엔드에서 빠르게 서버 기능을 붙일 때 사용.

---

### Managed Services
- [Cloud Run](https://cloud.google.com/run)  
  컨테이너 기반 서버리스 실행 환경.  
  Lambda보다 자유도가 높음.

---

### APIs & Communication
- **REST / GraphQL / gRPC**  
  클라이언트–서버 통신 방식 선택의 핵심 옵션들.

---

## 8. Data & Storage

### Databases
- [PostgreSQL](https://www.postgresql.org/docs/)  
  기능이 풍부한 오픈소스 RDBMS.  
  서버 개발자의 기본 선택지 중 하나.

- [Redis](https://redis.io/documentation)  
  인메모리 캐시 및 메시지 브로커.  
  성능 최적화 이야기에서 자주 등장.

- [Firestore](https://firebase.google.com/docs/firestore)  
  NoSQL 문서 DB.  
  모바일·게임에서 빠른 개발에 유리함.

---

### Data Formats
- [JSON](https://www.json.org/json-en.html)  
  가장 범용적인 데이터 교환 포맷.

- [Protobuf](https://developers.google.com/protocol-buffers)  
  성능과 스키마 안정성이 중요한 경우 선택됨.

---

## 9. Security & Identity
- [OAuth 2.0](https://oauth.net/2/)  
  외부 인증 및 권한 위임의 표준.

- [JWT](https://jwt.io/introduction/)  
  인증 정보를 토큰으로 전달하는 방식.

- **Secrets / IAM**  
  접근 제어와 보안 사고를 막기 위한 필수 개념.

---

## 10. Observability & Operations

### Logging
- **Structured Logging / Trace ID**  
  로그를 “검색 가능한 데이터”로 다루기 위한 방식.

### Monitoring & Tracing
- [Prometheus](https://prometheus.io/docs/introduction/overview/)  
  메트릭 기반 모니터링 시스템.

- [OpenTelemetry](https://opentelemetry.io/docs/)  
  로그·메트릭·트레이스를 통합하기 위한 표준.

- [Sentry](https://docs.sentry.io/)  
  에러 추적과 크래시 분석 도구.

---

## 11. Unity & Game Dev Specific

### Unity DevOps
- [Unity Cloud Build](https://docs.unity3d.com/Manual/UnityCloudBuild.html)  
  Unity 프로젝트를 자동으로 빌드하기 위한 서비스.

- [Unity Build Automation & Git](https://docs.unity.com/build-automation)  
  CI 환경에서 Unity를 다루는 공식 가이드.

- [Unity Cloud Code](https://docs.unity.com/ugs/manual/cloud-code/manual)  
  Unity 게임을 위한 서버리스 로직 실행 환경.

---


# Developer Technology Landscape

## 1. Languages & Runtimes
### Languages
- C# (.NET 6 / .NET 8)
- TypeScript
- JavaScript
- Python
- Go
- Bash / PowerShell

### Runtime Concepts
- CLR / JIT / AOT
- Garbage Collection (Generational GC, Allocation Patterns)
- Thread / Task / Async Runtime
- Event Loop (Node.js)
- Native Interop (P/Invoke, JNI)

---

## 2. Architecture & Design
### Architectural Styles
- Layered Architecture
- Clean Architecture
- Hexagonal Architecture (Ports & Adapters)
- MVC / MVP / MVVM
- CQRS
- Event-driven Architecture

### Design Concepts
- Ownership
- Lifecycle
- Boundary
- Responsibility
- Coupling / Cohesion
- Trade-offs

---

## 3. Asynchronous & Concurrency
### Async Models
- async / await
- Promise / Future
- Coroutine
- Reactive Programming (Rx)
- Actor Model

### Concurrency Primitives
- ThreadPool
- Job Queue
- Channel / Queue
- Lock / Mutex / Semaphore
- CAS / Lock-free Programming

---

## 4. Package & Dependency Management
### Package Managers
- npm / pnpm / yarn
- NuGet
- Unity Package Manager (UPM)

### Dependency Strategies
- Semantic Versioning
- Dependency Pinning
- Peer Dependency
- Transitive Dependency
- Vendoring

---

## 5. CI / CD & Automation
### CI Platforms
- GitHub Actions
- GitLab CI
- Jenkins
- CircleCI

### CI Concepts
- Pipeline
- Stage / Job
- Artifact
- Cache
- Matrix Build
- Reproducible Build

### Automation Targets
- Linting
- Testing
- Build
- Packaging
- Deployment

---

## 6. Containers & Execution Environments
### Container Basics
- Dockerfile
- Multi-stage Build
- docker-compose
- Volume / Network
- Image Layer Cache

### Orchestration
- Kubernetes
- Helm
- Kustomize

---

## 7. Cloud & Backend
### Serverless
- AWS Lambda
- Google Cloud Functions
- Firebase Functions
- Vercel / Netlify Functions

### Managed Services
- Cloud Run
- App Engine
- ECS / Fargate

### APIs & Communication
- REST
- GraphQL
- gRPC
- WebSocket

---

## 8. Data & Storage
### Databases
- PostgreSQL
- MySQL
- SQLite
- Redis
- MongoDB
- Firestore

### Data Formats
- JSON
- YAML
- Protobuf
- MessagePack
- FlatBuffers

### Caching
- In-memory Cache
- CDN
- Edge Cache
- Cache Invalidation Strategies

---

## 9. Security & Identity
- OAuth 2.0
- JWT
- API Key
- Secret Manager
- IAM / RBAC
- HTTPS / TLS

---

## 10. Observability & Operations
### Logging
- Structured Logging
- Log Aggregation
- Trace ID

### Monitoring & Tracing
- Prometheus
- Grafana
- OpenTelemetry
- Sentry

### Reliability Patterns
- Retry
- Circuit Breaker
- Timeout
- Rate Limiting

---

## 11. Common Interests of GitHub-active Developers
- Performance
- Developer Experience (DX)
- Tooling
- Automation
- Maintainability
- Documentation
- Example-first Design
- Opinionated vs Unopinionated Tools
