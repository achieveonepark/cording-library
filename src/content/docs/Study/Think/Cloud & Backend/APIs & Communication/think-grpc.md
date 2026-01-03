---
title: gRPC
sidebar:
  order: 40
---

gRPC는  
HTTP/2 기반의 고성능 RPC(Remote Procedure Call) 통신 방식이다.

JSON 대신 바이너리(Protobuf)를 사용한다.

---

## 1. gRPC의 핵심 개념

- 함수 호출처럼 서버 메서드를 호출
- Protocol Buffers로 데이터 정의
- 강한 타입 시스템

REST보다 훨씬 빠르고 가볍다.

---

## 2. Unity에서 gRPC 구조

Unity Client  
→ gRPC Client Stub  
→ gRPC Server  
→ Backend Logic

- 통신 포맷: Protobuf (Binary)
- 연결: HTTP/2

---

## 3. Unity + C#에서 gRPC의 장단점

### 장점
- 매우 빠른 성능
- 데이터 크기 작음
- 명확한 계약(.proto)

### 단점
- 설정 난이도 높음
- 브라우저/WebGL 제약
- 디버깅 난이도 높음
- HTTP 캐시/프록시 활용 어려움

---

## 4. Unity 실무 사용 예시

- 내부 서버 간 통신
- 매치메이킹 보조 서비스
- 서버 간 동기화
- 대량 데이터 전송

모바일 클라이언트보다는  
서버 ↔ 서버 통신에 더 적합하다.

---

## 5. Unity 기준 주의사항

- WebGL은 거의 사용 불가
- 모바일에서는 네트워크 환경 고려 필요
- REST와 병행 사용이 일반적

---

## 6. 한 줄 요약

gRPC는  
Unity에서 성능이 중요한 내부 통신에 적합한 방식이다.
