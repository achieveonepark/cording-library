---
title: Garbage Collection
---

> 언제 튀는가, 왜 튀는가, 어떻게 피하는가

GC는 Unity 성능 이슈에서 **가장 자주 오해되는 요소**다.

---

## 언제 튀는가

* 힙 메모리 임계치 도달
* Gen0/Gen1 컬렉션 빈번
* 프레임 루프에서 잦은 할당

## 왜 튀는가

* 짧은 생명 객체 대량 생성
* 살아남은 객체가 상위 세대로 승격
* 메인 스레드에서 GC 수행

```mermaid
flowchart LR
    New[New Object]
    Gen0[Gen 0]
    Gen1[Gen 1]
    Gen2[Gen 2]

    New --> Gen0 -->|survive| Gen1 -->|survive| Gen2
```

---

## 어떻게 피하는가 (Unity 관점)

* 프레임 루프에서 할당 제거
* 풀링 사용
* LINQ/문자열/박싱 최소화

---

## 대화용 한 문장

> "GC 문제는 메모리 부족이 아니라, 프레임 단위 할당 패턴에서 시작됩니다."
