const Token = require('../lexer/Token');
const Lexer = require('../lexer');
const AST = require('../ast');

class Parser {
  constructor(input) {
    this.scanner = new Lexer(input);
    this.currentToken = this.scanner.getNextToken();
  }

  eat(tokenType) {
    if (this.currentToken.is(tokenType)) {
      this.currentToken = this.scanner.getNextToken();
    } else {
      Parser.error(`Unexpected token type: ${tokenType}`);
    }

    return this;
  }

  factor() {
    const token = this.currentToken;

    if (token.is(Token.INTEGER)) {
      this.eat(Token.INTEGER);
      return new AST.Number(token);
    } else if (token.is(Token.LEFT_PARENTHESIS)) {
      this.eat(Token.LEFT_PARENTHESIS);

      const node = this.expr();

      this.eat(Token.RIGHT_PARENTHESIS);

      return node;
    }
  }

  term() {
    let node = this.factor();

    while ([Token.ASTERISK, Token.SLASH].indexOf(this.currentToken.getType()) !== -1) {
      const token = this.currentToken;

      if (token.is(Token.ASTERISK)) {
        this.eat(Token.ASTERISK);
      } else if (token.is(Token.SLASH)) {
        this.eat(Token.SLASH);
      }

      node = new AST.BinaryOperator(node, token, this.factor());
    }

    return node;
  }

  expr() {
    let node = this.term();

    while ([Token.PLUS, Token.MINUS].indexOf(this.currentToken.getType()) !== -1) {
      const token = this.currentToken;

      if (token.is(Token.PLUS)) {
        this.eat(Token.PLUS);
      } else if (token.is(Token.MINUS)) {
        this.eat(Token.MINUS);
      }

      node = new AST.BinaryOperator(node, token, this.term());
    }

    return node;
  }

  parse() {
    return this.expr();
  }

  static error(msg) {
    throw new Error(`An error during syntax analysis:\n${msg}`);
  }
}

module.exports = Parser;
