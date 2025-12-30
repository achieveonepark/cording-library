---
title: Concurrency Model
sidebar:
  order: 14
---

## Thread vs Task

### Thread
- OS 스레드
- 선점형
- 진짜 병렬 실행

### Task / async
- 논리적 비동기
- 협력형
- 병렬 실행 보장 아님

---

## CPU-bound vs IO-bound

### IO-bound
- 네트워크
- 파일
- DB

async/await로 대기 시간 숨김 가능

### CPU-bound
- 연산
- 루프
- 암호화

async로는 빨라지지 않음  
병렬 처리 또는 알고리즘 개선 필요

---

## SynchronizationContext

await 이후 코드가 실행될 스레드를 결정한다.

- Unity: Main Thread
- UI: UI Thread
- ASP.NET: ThreadPool
