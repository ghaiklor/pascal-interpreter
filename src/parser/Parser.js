const Token = require('../lexer/Token');
const Lexer = require('../lexer');
const AST = require('../ast');

/**
 * Parser implementation for a language.
 * Converts stream of tokens into AST.
 *
 * @class
 * @since 1.0.0
 */
class Parser {
  /**
   * Creates new parser instance.
   * It accepts as an input source code of a program.
   * In result, it will parse it and return an AST of specified program.
   * As a dependency, it uses the lexer which returns stream of tokens.
   *
   * @param {String} input Source code of a program
   * @example
   * const parser = new Parser('2 + 5');
   */
  constructor(input) {
    this.lexer = new Lexer(input);
    this.currentToken = this.lexer.getNextToken();
  }

  /**
   * Consumes one specified token type.
   * In case, token type is not equal to the current one, it throws an error.
   * When you are consuming a token you are not expecting, it means broken syntax structure.
   *
   * @param {String} tokenType Token type from {@link Token} dictionary
   * @returns {Parser} Returns current parser instance
   * @example
   * const parser = new Parser('2 + 5'); // currentToken = INTEGER
   *
   * parser
   *  .eat(Token.INTEGER) // currentToken = PLUS
   *  .eat(Token.PLUS) // currentToken = INTEGER
   *  .eat(Token.PLUS) // throws an error, because currentToken = INTEGER
   */
  eat(tokenType) {
    if (this.currentToken.is(tokenType)) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      Parser.error(`You provided unexpected token type "${tokenType}" while current token is ${this.currentToken}`);
    }

    return this;
  }

  /**
   * Production for parsing basic units of a language.
   * It consists of unary operators, integers and expressions.
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
    } else if (token.is(Token.INTEGER)) {
      this.eat(Token.INTEGER);
      return AST.Number.create(token);
    } else if (token.is(Token.LEFT_PARENTHESIS)) {
      this.eat(Token.LEFT_PARENTHESIS);
      const node = this.expr();
      this.eat(Token.RIGHT_PARENTHESIS);
      return node;
    }

    Parser.error(`Unexpected token in "factor" production: ${token}`);
  }

  /**
   * Production for parsing terminals.
   *
   * @returns {Node}
   */
  term() {
    let node = this.factor();

    while ([Token.ASTERISK, Token.SLASH].some(type => this.currentToken.is(type))) {
      const token = this.currentToken;

      if (token.is(Token.ASTERISK)) {
        this.eat(Token.ASTERISK);
      } else if (token.is(Token.SLASH)) {
        this.eat(Token.SLASH);
      }

      node = AST.BinaryOperator.create(node, token, this.factor());
    }

    return node;
  }

  /**
   * Production for parsing expressions.
   *
   * @returns {Node}
   */
  expr() {
    let node = this.term();

    while ([Token.PLUS, Token.MINUS].some(type => this.currentToken.is(type))) {
      const token = this.currentToken;

      if (token.is(Token.PLUS)) {
        this.eat(Token.PLUS);
      } else if (token.is(Token.MINUS)) {
        this.eat(Token.MINUS);
      }

      node = AST.BinaryOperator.create(node, token, this.term());
    }

    return node;
  }

  /**
   * Parses an input source program and returns an AST.
   *
   * @returns {Node}
   * @example
   * const parser = new Parser('2 + 5');
   *
   * parser.parse(); // return an object that represents an AST of source program
   */
  parse() {
    return this.expr();
  }

  /**
   * Static helper for notifying about an error, during parsing.
   *
   * @static
   * @param {String} msg Error message
   */
  static error(msg) {
    throw new Error(`[Parser]\n${msg}`);
  }
}

module.exports = Parser;
