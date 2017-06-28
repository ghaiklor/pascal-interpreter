const Token = require('./Token');

/**
 * Lexer of a language.
 *
 * @class
 * @since 1.0.0
 */
class Lexer {
  /**
   * Creates a new instance of a lexer.
   *
   * @param {String} input Source code of a program
   */
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.currentChar = this.input[this.position];
  }

  /**
   * Move pointer by one.
   * Increments a position value by one and assigns new char to currentChar.
   *
   * @returns {Lexer}
   */
  advance() {
    this.position += 1;

    if (this.position > this.input.length - 1) {
      this.currentChar = null;
    } else {
      this.currentChar = this.input[this.position];
    }

    return this;
  }

  /**
   * Skips whitespaces in a source code.
   *
   * @returns {Lexer}
   */
  skipWhitespace() {
    while (this.currentChar && /\s/.test(this.currentChar)) {
      this.advance();
    }

    return this;
  }

  /**
   * Parses an integer from a source code.
   *
   * @returns {Number}
   */
  integer() {
    let integer = '';

    while (this.currentChar && /\d/.test(this.currentChar)) {
      integer += this.currentChar;
      this.advance();
    }

    return parseInt(integer);
  }

  /**
   * Returns a next token in a source program.
   *
   * @returns {Token}
   */
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

      Lexer.error(`Unexpected character: ${this.currentChar}`);
    }

    return Token.create(Token.EOF, null);
  }

  /**
   * Throws an error in a scanner context.
   *
   * @static
   * @param {String} msg An error message
   */
  static error(msg) {
    throw new Error(`An error raised during lexical analysis:\n${msg}`);
  }
}

module.exports = Lexer;
