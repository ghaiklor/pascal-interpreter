# Pascal Interpreter

[![Build Status](https://travis-ci.org/ghaiklor/pascal-interpreter.svg?branch=master)](https://travis-ci.org/ghaiklor/pascal-interpreter)
[![Coverage Status](https://coveralls.io/repos/github/ghaiklor/pascal-interpreter/badge.svg?branch=master)](https://coveralls.io/github/ghaiklor/pascal-interpreter?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/ghaiklor/pascal-interpreter.svg)](https://greenkeeper.io/)

_A simple interpreter for a large subset of Pascal language written for educational purposes_

## Known issues

- Procedures declarations are supported by parser and AST, but interpreter doesn't support its execution (there is no implementation for this at all);
- There are no builtin IO procedures, like writing into standard output and reading from standard input;

## Phases

This interpreter has several phases to execute before interpreting the source code:

- [Lexical Analysis](./src/lexer)
- [Syntax Analysis](./src/parser)
- [Semantic Analysis](./src/semantic)
- [Interpretation](./src/interpreter)

Each of these steps are explained a little bit below.

### Lexical analysis

> Lexical analysis is the process of converting a sequence of characters (such as in a computer program or web page) into a sequence of tokens (strings with an assigned and thus identified meaning)

Implementation of scanner here is based on simple lookahead pointer in input.

Scanner stores three properties: `input`, `position` and `currentChar`.

- input stores the whole code of input source code;
- position stores an integer which determines current position of a scanner in provided input;
- currentChar stores a character stored by current position of a marker;

Each time, when `advance()` called, it increments the value of `pointer` and read new character into `currentChar` property.

Each time, when `getNextToken()` is called, it calls `advance()` as many times as soon the next valid token is meet the requirements.

In a result, scanner returns a stream of a tokens.
In our case, token is simply a structure with two fields: `type` and `value`.
`type` recognizes a lexeme by its type, like NUMBER or SEMICOLON and `value` stores the original character sequence.

### Syntax analysis

> Syntax analysis is the process of analysing a string of symbols, either in natural language or in computer languages, conforming to the rules of a formal grammar

We are recognizing a string of tokens (stream of tokens) here.

Parser implementation here has mapped all its methods onto formal grammar rules (productions).
Each method has in its comments a production, that the method is trying to follow.

I.e. take a look into _factor_ production:

```js
/**
 * factor: PLUS factor
 *       | MINUS factor
 *       | INTEGER_LITERAL
 *       | REAL_LITERAL
 *       | LEFT_PARENTHESIS expr RIGHT_PARENTHESIS
 *       | variable
 *
 * @returns {Node}
 */
factor() {
  const token = this.currentToken;

  if (token.is(Token.PLUS)) {
    this.eat(Token.PLUS);
    return AST.UnaryOperator.create(token, this.factor());
  } else if (token.is(Token.MINUS)) {
    this.eat(Token.MINUS);
    return AST.UnaryOperator.create(token, this.factor());
  } else if (token.is(Token.INTEGER_LITERAL)) {
    this.eat(Token.INTEGER_LITERAL);
    return AST.Number.create(token);
  } else if (token.is(Token.REAL_LITERAL)) {
    this.eat(Token.REAL_LITERAL);
    return AST.Number.create(token);
  } else if (token.is(Token.LEFT_PARENTHESIS)) {
    this.eat(Token.LEFT_PARENTHESIS);
    const node = this.expr();
    this.eat(Token.RIGHT_PARENTHESIS);
    return node;
  }

  return this.variable();
}
```

Comments above the method show a grammar rule.
Method implementation itself follows this grammar rule.

Each terminal is a token, while each non-terminal is another method in a parser.

As a result, syntax analysis returns a generated AST of a Pascal program.

### Semantic analysis

> Semantic analysis, also context sensitive analysis, is a process in compiler construction, usually after parsing, to gather necessary semantic information from the source code. It usually includes type checking, or makes sure a variable is declared before use which is impossible to describe in Extended Backus–Naur Form and thus not easily detected during parsing.

That's why semantic analysis is a separate phase of a compiler.
Parsing know nothing about context in which your source code will run.

Semantic analyzer is implemented as AST visitor, which takes an AST from the parser and visits all the nodes.

Current implementation of a semantic analysis is just about symbol tables and type checking.
Each time when visitor visits a node with variable declaration, it creates a record about its scope, type and name in symbol table. Each time when a node is procedure declaration, it creates record about its scope, formal parameters list and a name in symbol table.

Afterwards, semantic analyzer checks if you have any duplicate declarations or doesn't have those at all.

### Interpretation

> An interpreter is a computer program that directly executes, i.e. performs, instructions written in a programming or scripting language, without previously compiling them into a machine language program

In our case, our "computer program" that directly executes the code is written in JavaScript and uses NodeJS runtime for these purposes.

Interpreter implemented as AST visitor as well.
After successful semantic analysis, AST goes into interpreter.

Interpreter visits each AST node recursively and calls appropriate JavaScript runtime methods to execute the code.

As a result, we got our code written in Pascal run.

## Roadmap

### Lexer

- Dictionary of tokens **[DONE]**
- Structure with accessors which defines token **[DONE]**
- Casting tokens into strings when printing **[DONE]**
- Helper for checking token types via *is()* **[DONE]**
- Lexical analyzer which returns next token each time you call *getNextToken()* **[DONE]**
- Skip whitespaces at all **[DONE]**
- Read digits as one token **[DONE]**
- Read alphanumeric as IDENTIFIER tokens **[DONE]**
- Add a dictionary of reserved words in a language with appropriate tokens in it **[DONE]**

### Parser

- Consuming (eating) tokens from a lexer **[DONE]**
- Productions for mathematical expressions **[DONE]**
- Associativity and precedence **[DONE]**
- Support for parenthesis **[DONE]**
- Support for variable assignments **[DONE]**
- Support for compounds of statements **[DONE]**
- Building an AST nodes **[DONE]**

### AST

- Basic AST Node class **[DONE]**
- Number Node **[DONE]**
- BinaryOperator Node **[DONE]**
- UnaryOperator Node **[DONE]**
- Assign Node **[DONE]**
- Compound Node **[DONE]**
- NoOperation Node **[DONE]**
- Variable Node **[DONE]**

### Interpreter

- *visit()* that calls visitors for each AST node, based on its type **[DONE]**
- Visitor for Number Node **[DONE]**
- Visitor for UnaryOperator Node **[DONE]**
- Visitor for BinaryOperator Node **[DONE]**
- Visitor for NoOperation Node **[DONE]**
- Visitor for Compound Node **[DONE]**
- Visitor for Assign Node **[DONE]**
- Visitor for Variable Node **[DONE]**

## License

[MIT](./LICENSE)
