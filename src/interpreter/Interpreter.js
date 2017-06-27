const Token = require('../lexer/Token');

class Interpreter {
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.currentToken = null;
  }

  getNextToken() {
    const {input, position} = this;

    if (position > input.length - 1) return Token.create(Token.EOF, null);

    const char = input[position];

    if (!isNaN(char)) {
      const token = Token.create(Token.INTEGER, parseInt(char));
      this.position += 1;
      return token;
    }

    if (char === '+') {
      const token = Token.create(Token.PLUS, char);
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
    this.eat(Token.PLUS);

    const right = this.currentToken;
    this.eat(Token.INTEGER);

    return left.getValue() + right.getValue();
  }

  static error(msg) {
    throw new Error(msg);
  }
}

module.exports = Interpreter;
