---
title: AWS Lambda (FaaS)
sidebar:
  order: 32
---

### Lambda의 특징(개념)
- 트리거: API Gateway(HTTP), EventBridge(스케줄), S3 이벤트, DynamoDB Streams 등
- 기본 철학: **짧게 실행되는 Stateless 함수**
- 실행 환경: 런타임(.NET 포함) 기반으로 함수 코드 실행

### Unity에서의 사용 흐름(전형)
1. Unity 로그인/인증 (예: Cognito, 자체 토큰)
2. Unity가 API Gateway 엔드포인트로 HTTP 호출
3. API Gateway → Lambda 실행
4. Lambda가 DB/DynamoDB/외부 API 호출
5. 응답 반환

### Unity/C# 개발자가 주의할 점
- **권한/인증**: 클라이언트에서 직접 AWS 리소스 접근은 최소화(서명/권한 설계 필요)
- **Cold Start**: 첫 호출이 느릴 수 있음 → 중요한 엔드포인트는 워밍 전략 고려
- **상태 저장 금지**: 메모리/파일에 저장해도 영구 보장 X
- **장시간 작업**: 제한이 존재 → 필요하면 Step Functions, 큐(SQS)로 분리