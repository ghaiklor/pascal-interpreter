const Token = require('../lexer/Token');

class Interpreter {
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.currentToken = null;
    this.currentChar = this.input[this.position];
  }

  advance() {
    this.position += 1;

    if (this.position > this.input.length - 1) {
      this.currentChar = null;
    } else {
      this.currentChar = this.input[this.position];
    }
  }

  skipWhitespace() {
    while (this.currentChar && /\s/.test(this.currentChar)) {
      this.advance();
    }
  }

  integer() {
    let integer = '';

    while (this.currentChar && /\d/.test(this.currentChar)) {
      integer += this.currentChar;
      this.advance();
    }

    return parseFloat(integer);
  }

  getNextToken() {
    while (this.currentChar) {
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace();
        continue;
      }

      if (/\d/.test(this.currentChar)) {
        return Token.create(Token.INTEGER, this.integer());
      }

      if (this.currentChar === '+') {
        this.advance();
        return Token.create(Token.PLUS, '+');
      }

      if (this.currentChar === '-') {
        this.advance();
        return Token.create(Token.MINUS, '-');
      }

      if (this.currentChar === '*') {
        this.advance();
        return Token.create(Token.ASTERISK, '*');
      }

      if (this.currentChar === '/') {
        this.advance();
        return Token.create(Token.SLASH, '/');
      }

      Interpreter.error(`Unexpected char: ${this.currentChar}`);
    }

    return Token.create(Token.EOF, null);
  }

  eat(tokenType) {
    if (this.currentToken.getType() === tokenType) {
      this.currentToken = this.getNextToken();
    } else {
      Interpreter.error(`Unexpected token type: ${tokenType}`);
    }
  }

  expr() {
    this.currentToken = this.getNextToken();

    const left = this.currentToken;
    this.eat(Token.INTEGER);

    const op = this.currentToken;
    if (op.getType() === Token.PLUS) this.eat(Token.PLUS);
    if (op.getType() === Token.MINUS) this.eat(Token.MINUS);
    if (op.getType() === Token.ASTERISK) this.eat(Token.ASTERISK);
    if (op.getType() === Token.SLASH) this.eat(Token.SLASH);

    const right = this.currentToken;
    this.eat(Token.INTEGER);

    if (op.getType() === Token.PLUS) return left.getValue() + right.getValue();
    if (op.getType() === Token.MINUS) return left.getValue() - right.getValue();
    if (op.getType() === Token.ASTERISK) return left.getValue() * right.getValue();
    if (op.getType() === Token.SLASH) return left.getValue() / right.getValue();
  }

  static error(msg) {
    throw new Error(`An error, while parsing an input:\n${msg}`);
  }
}

module.exports = Interpreter;
