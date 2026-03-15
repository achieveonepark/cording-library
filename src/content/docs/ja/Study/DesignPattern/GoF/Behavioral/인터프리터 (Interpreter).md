---
title: Interpreter
---

# Interpreter

## パターン一言説明
小さなドメイン言語ルールを文法オブジェクトとして解釈し、結果を計算するパターンです。

## Unity でよく使う状況
- クエスト条件 DSL を作りたいとき
- 会話分岐条件をデータ化したいとき

## 構成要素（役割）
- Expression
- Terminal
- Nonterminal
- Context

## Unity 例 (C#)
以下のコードは、上で説明した状況を Unity プロジェクトの文脈で単純化した例です。

```csharp
public interface IConditionExpression
{
    bool Evaluate(PlayerContext context);
}

public sealed class LevelAtLeastExpression : IConditionExpression
{
    private readonly int requiredLevel;

    public LevelAtLeastExpression(int requiredLevel)
    {
        this.requiredLevel = requiredLevel;
    }

    public bool Evaluate(PlayerContext context)
    {
        return context.PlayerLevel >= requiredLevel;
    }
}

public sealed class AndExpression : IConditionExpression
{
    private readonly IConditionExpression leftExpression;
    private readonly IConditionExpression rightExpression;

    public AndExpression(IConditionExpression leftExpression, IConditionExpression rightExpression)
    {
        this.leftExpression = leftExpression;
        this.rightExpression = rightExpression;
    }

    public bool Evaluate(PlayerContext context)
    {
        return leftExpression.Evaluate(context) && rightExpression.Evaluate(context);
    }
}
```

## 長所
- 振る舞いを分離できるため、変更の影響範囲を小さくできます。
- ルールの追加や差し替えを比較的安全に行えます。

## 注意点
- オブジェクト数や間接呼び出しが増えると、流れを追いにくくなります。
- 実行順序のバグはテストで固定しておく必要があります。

## 動作ダイアグラム

文法ルールを式ツリーとして解釈し、結果を計算する流れです。

```d2 title="Interpreter の流れ"
direction: right

input: "Rule String"
lexer: "Tokenizer"
parser: "Parser"
ast: "Expression Tree"
interpreter: "Interpret(context)"
result: "bool / score"

input -> lexer
lexer -> parser
parser -> ast
ast -> interpreter: "recursive visit"
interpreter -> result
```
