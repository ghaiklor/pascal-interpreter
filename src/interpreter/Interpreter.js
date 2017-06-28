const Token = require('../lexer/Token');
const Lexer = require('../lexer');

class Interpreter {
  constructor(input) {
    this.scanner = new Lexer(input);
    this.currentToken = this.scanner.getNextToken();
  }

  eat(tokenType) {
    if (this.currentToken.is(tokenType)) {
      this.currentToken = this.scanner.getNextToken();
    } else {
      Interpreter.error(`Unexpected token type: ${tokenType}`);
    }
  }

  factor() {
    const token = this.currentToken;
    this.eat(Token.INTEGER);
    return token.getValue();
  }

  term() {
    let result = this.factor();

    while ([Token.ASTERISK, Token.SLASH].indexOf(this.currentToken.getType()) !== -1) {
      const token = this.currentToken;

      if (token.is(Token.ASTERISK)) {
        this.eat(Token.ASTERISK);
        result *= this.factor();
      } else if (token.is(Token.SLASH)) {
        this.eat(Token.SLASH);
        result /= this.factor();
      }
    }

    return result;
  }

  expr() {
    let result = this.term();

    while ([Token.PLUS, Token.MINUS].indexOf(this.currentToken.getType()) !== -1) {
      const token = this.currentToken;

      if (token.is(Token.PLUS)) {
        this.eat(Token.PLUS);
        result += this.term();
      } else if (token.is(Token.MINUS)) {
        this.eat(Token.MINUS);
        result -= this.term();
      }
    }

    return result;
  }

  static error(msg) {
    throw new Error(`An error during syntax analysis:\n${msg}`);
  }
}

module.exports = Interpreter;
