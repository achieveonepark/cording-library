---
title: Interpreter
---

언어의 문법적인 표현을 정의하고, 이 문법을 해석하는 인터프리터를 제공하는 패턴입니다. 특정 언어를 해석해야 할 때, 그리고 그 언어를 추상 구문 트리(Abstract Syntax Tree)로 표현할 수 있을 때 유용합니다.

## 구현부
Interpreter 패턴은 주로 다음 요소들로 구성됩니다.

### AbstractExpression (추상 표현식)
- 추상 구문 트리의 모든 노드에 공통적으로 적용될 `Interpret` 연산을 선언하는 인터페이스 또는 추상 클래스입니다.

### TerminalExpression (말단 표현식)
- 문법의 말단 기호(terminal symbol)에 대한 `Interpret` 연산을 구현합니다.

### NonterminalExpression (비말단 표현식)
- 문법의 비말단 기호(nonterminal symbol)에 대한 `Interpret` 연산을 구현합니다. 일반적으로 다른 `AbstractExpression` 객체들에 대한 참조를 가집니다.

### Context (문맥)
- 인터프리터에 전역적으로 필요한 정보를 포함합니다. (예: 변수 값)

### Client (클라이언트)
- 문법에 따라 추상 구문 트리를 구축하고, `Interpret` 연산을 호출합니다.

## 예시

간단한 산술 표현식(예: "5 + 3 - 2")을 해석하는 인터프리터 예시입니다.
