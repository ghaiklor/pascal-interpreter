const Token = require('../lexer/Token');

class Interpreter {
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.currentToken = null;
  }

  getNextToken() {
    if (this.position > this.input.length - 1) return Token.create(Token.EOF, null);

    while (this.input[this.position] === ' ') this.position += 1;

    const char = this.input[this.position];

    if (!isNaN(char)) {
      let number = char;
      this.position += 1;

      while (!isNaN(this.input[this.position])) {
        number += this.input[this.position];
        this.position += 1;
      }

      return Token.create(Token.INTEGER, parseInt(number));
    }

    if (char === '+') {
      const token = Token.create(Token.PLUS, char);
      this.position += 1;
      return token;
    }

    if (char === '-') {
      const token = Token.create(Token.MINUS, char);
      this.position += 1;
      return token;
    }

    Interpreter.error(`Unexpected char: ${char}`);
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

    // const op = this.currentToken;
    this.eat(Token.MINUS);

    const right = this.currentToken;
    this.eat(Token.INTEGER);

    return left.getValue() - right.getValue();
  }

  static error(msg) {
    throw new Error(msg);
  }
}

module.exports = Interpreter;
