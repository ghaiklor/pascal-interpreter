# Pascal Interpreter

[![Build Status](https://travis-ci.org/ghaiklor/pascal-interpreter.svg?branch=master)](https://travis-ci.org/ghaiklor/pascal-interpreter)
[![Coverage Status](https://coveralls.io/repos/github/ghaiklor/pascal-interpreter/badge.svg?branch=master)](https://coveralls.io/github/ghaiklor/pascal-interpreter?branch=master)
[![Greenkeeper badge](https://badges.greenkeeper.io/ghaiklor/pascal-interpreter.svg)](https://greenkeeper.io/)

_A simple interpreter for a large subset of Pascal language with a source-level debugger written for educational purposes_

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

### Parser

- Consuming (eating) tokens from a lexer **[DONE]**
- Productions for mathematical expressions **[DONE]**
- Associativity and precedence **[DONE]**
- Support for parenthesis **[DONE]**
- Building an AST nodes **[DONE]**

### AST

- Basic AST Node class **[DONE]**
- Number Node **[DONE]**
- BinaryOperator Node **[DONE]**
- UnaryOperator Node **[DONE]**

### Interpreter

- *visit()* that calls visitors for each AST node, based on its type **[DONE]**
- Visitor for Number Node **[DONE]**
- Visitor for UnaryOperator Node **[DONE]**
- Visitor for BinaryOperator Node **[DONE]**

### Compiler

**TBD**

### Debugger

**TBD**

## License

[MIT](./LICENSE)
