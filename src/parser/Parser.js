const Token = require('../lexer/Token');
const Lexer = require('../lexer');
const AST = require('../ast');

/**
 * Parser implementation for a language.
 * Converts stream of tokens into AST.
 *
 * @since 1.0.0
 */
class Parser {
  /**
   * Creates new parser instance.
   *
   * @param {String} input Source code of a program
   * @example
   * const parser = new Parser('2 + 5');
   */
  constructor(input) {
    this.scanner = new Lexer(input);
    this.currentToken = this.scanner.getNextToken();
  }

  /**
   * Consumes one specified token type.
   * In case, token type is not equal to the current one, it throws an error.
   * That's because if you're eating a token that not equals, it means broken syntax structure.
   *
   * @param {String} tokenType Token type from {@link Token} dictionary
   * @returns {Parser}
   */
  eat(tokenType) {
    if (this.currentToken.is(tokenType)) {
      this.currentToken = this.scanner.getNextToken();
    } else {
      Parser.error(`Unexpected token type: ${tokenType}`);
    }

    return this;
  }

  /**
   * Basic expressions parsing.
   *
   * @returns {Node}
   */
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

    Parser.error(`Unexpected token in "factor" production: ${token}`);
  }

  /**
   * Terminals expressions parsing.
   *
   * @returns {Node}
   */
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

  /**
   * Expressions parsing.
   *
   * @returns {Node}
   */
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

  /**
   * Parses an input stream of tokens and returns AST tree as an object.
   *
   * @returns {Node}
   */
  parse() {
    return this.expr();
  }

  /**
   * Static helper for notifying about an error, during syntax analysis.
   *
   * @static
   * @param {String} msg
   */
  static error(msg) {
    throw new Error(`An error during syntax analysis:\n${msg}`);
  }
}

module.exports = Parser;
