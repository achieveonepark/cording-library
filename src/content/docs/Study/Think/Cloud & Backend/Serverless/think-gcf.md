---
title: Google Cloud Functions
sidebar:
  order: 33
---

### Cloud Functions의 특징(개념)
- 트리거: HTTP, Pub/Sub, Cloud Storage, Firestore 이벤트 등
- GCP 서비스들과 결합이 쉬움(특히 Firebase/Firestore/Storage와 함께)

### Unity에서의 사용 흐름(전형)
1. Unity → HTTPS 호출(보통 Bearer 토큰 포함)
2. Cloud Functions → Firestore/Cloud Storage/외부 API
3. JSON 응답

### Unity/C# 개발자가 주의할 점
- **인증 토큰 검증**을 함수에서 해야 함(예: Firebase Auth ID Token 검증)
- **요청 폭주 대비**: 자동 확장되지만 외부 API/DB의 쿼터가 병목이 되기 쉬움
- **로깅/추적**: Cloud Logging/Trace 연동을 초기에 잡아두면 장애 대응이 쉬움