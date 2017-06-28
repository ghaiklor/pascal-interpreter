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

  term() {
    const token = this.currentToken;
    this.eat(Token.INTEGER);
    return token.getValue();
  }

  expr() {
    this.currentToken = this.getNextToken();

    let result = this.term();

    while ([Token.PLUS, Token.MINUS, Token.ASTERISK, Token.SLASH].indexOf(this.currentToken.getType()) !== -1) {
      const token = this.currentToken;

      if (token.getType() === Token.PLUS) {
        this.eat(Token.PLUS);
        result += this.term();
      } else if (token.getType() === Token.MINUS) {
        this.eat(Token.MINUS);
        result -= this.term();
      } else if (token.getType() === Token.ASTERISK) {
        this.eat(Token.ASTERISK);
        result *= this.term();
      } else if (token.getType() === Token.SLASH) {
        this.eat(Token.SLASH);
        result /= this.term();
      }
    }

    return result;
  }

  static error(msg) {
    throw new Error(`An error, while parsing an input:\n${msg}`);
  }
}

module.exports = Interpreter;
