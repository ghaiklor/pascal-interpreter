/**
 * Represents a token in a source code of a program.
 *
 * @class
 * @since 1.0.0
 */
class Token {
  /**
   * Creates a new Token instance.
   *
   * @param {String} type Token type from {@link Token} static dictionary
   * @param {String} value Value of a token
   * @example
   * new Token(Token.INTEGER, '1234');
   * new Token(Token.PLUS, '+');
   * new Token(Token.INTEGER, '5678');
   */
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }

  /**
   * Returns a type of a token.
   *
   * @returns {String}
   */
  getType() {
    return this.type || null;
  }

  /**
   * Returns a value of a token.
   *
   * @returns {String}
   */
  getValue() {
    return this.value || null;
  }

  /**
   * Check if specified token type is this token.
   *
   * @param {String} tokenType Token type from {@link Token} static dictionary
   * @returns {Boolean} Returns true if provided type is equal to type of this token
   * @example
   * const token = Token.create(Token.INTEGER, '234');
   *
   * token.is(Token.INTEGER); // true
   * token.is(Token.ASTERISK); // false
   */
  is(tokenType) {
    return this.getType() === tokenType;
  }

  /**
   * Converts a token into string representation.
   * It useful when you need to debug some tokens.
   * Instead of printing a token as object, it will print as a string.
   * Format of this string is following: Token(<type>, <value>).
   *
   * @returns {String} Returns a string in format Token(<type>, <value>)
   * @example
   * const token = Token.create(Token.INTEGER, '1234');
   *
   * console.log(token); // Token(INTEGER, 1234)
   */
  toString() {
    return `Token(${this.getType()}, ${this.getValue()})`;
  }

  /**
   * Creates a new Token instance.
   *
   * @static
   * @param {String} type Token type from {@link Token} static dictionary
   * @param {String} value Value of a token
   * @returns {Token} Returns instantiated instance of a Token
   * @example
   * Token.create(Token.INTEGER, 1234);
   * Token.create(Token.PLUS, '+');
   * Token.create(Token.INTEGER, 5678);
   */
  static create(type, value) {
    return new this(type, value);
  }

  /**
   * Returns a Token type for a plus symbol (+).
   *
   * @static
   * @returns {String}
   */
  static get PLUS() {
    return 'PLUS';
  }

  /**
   * Returns a Token type for a minus symbol (-).
   *
   * @static
   * @returns {String}
   */
  static get MINUS() {
    return 'MINUS';
  }

  /**
   * Returns a Token type for an asterisk symbol (*).
   *
   * @static
   * @returns {String}
   */
  static get ASTERISK() {
    return 'ASTERISK';
  }

  /**
   * Returns a Token type for a slash sign (/).
   *
   * @static
   * @returns {String}
   */
  static get SLASH() {
    return 'SLASH';
  }

  /**
   * Returns a Token type for a backslash sign (\).
   *
   * @static
   * @returns {String}
   */
  static get BACKSLASH() {
    return 'BACKSLASH';
  }

  /**
   * Returns a Token type for a comma symbol (,).
   *
   * @static
   * @returns {String}
   */
  static get COMMA() {
    return 'COMMA';
  }

  /**
   * Returns a Token type for a dot symbol (.).
   *
   * @static
   * @returns {String}
   */
  static get DOT() {
    return 'DOT';
  }

  /**
   * Returns a Token type for a colon symbol (:).
   *
   * @static
   * @returns {String}
   */
  static get COLON() {
    return 'COLON';
  }

  /**
   * Returns a Token type for a semicolon symbol (;).
   *
   * @static
   * @returns {String}
   */
  static get SEMICOLON() {
    return 'SEMICOLON';
  }

  /**
   * Returns a Token type for a left parenthesis "(".
   *
   * @static
   * @returns {String}
   */
  static get LEFT_PARENTHESIS() {
    return 'LEFT_PARENTHESIS';
  }

  /**
   * Returns a Token type for a right parenthesis ")".
   *
   * @static
   * @returns {String}
   */
  static get RIGHT_PARENTHESIS() {
    return 'RIGHT_PARENTHESIS';
  }

  /**
   * Returns a Token type for an ASSIGN sequence of chars (:=).
   *
   * @static
   * @returns {String}
   */
  static get ASSIGN() {
    return 'ASSIGN';
  }

  /**
   * Returns a Token type for end-of-file.
   *
   * @static
   * @returns {String}
   */
  static get EOF() {
    return 'EOF';
  }

  /**
   * Returns a Token type for a BEGIN keyword.
   * This token marks a beginning of a compound statement.
   *
   * @static
   * @returns {String}
   */
  static get BEGIN() {
    return 'BEGIN';
  }

  /**
   * Returns a Token type for an END keyword.
   * This token marks the end of a compound statement.
   *
   * @static
   * @returns {String}
   */
  static get END() {
    return 'END';
  }

  /**
   * Returns a Token type for identifiers in a program.
   * Valid identifier starts with an alphabetical character.
   *
   * @static
   * @returns {String}
   */
  static get IDENTIFIER() {
    return 'IDENTIFIER';
  }

  /**
   * Returns a Token type for a PROGRAM keyword.
   *
   * @static
   * @returns {String}
   */
  static get PROGRAM() {
    return 'PROGRAM';
  }

  /**
   * Returns a Token type for a VAR keyword.
   *
   * @static
   * @returns {String}
   */
  static get VAR() {
    return 'VAR';
  }

  /**
   * Returns a Token type for an INTEGER type.
   *
   * @static
   * @returns {String}
   */
  static get INTEGER_TYPE() {
    return 'INTEGER_TYPE';
  }

  /**
   * Returns a Token type for a REAL type.
   *
   * @static
   * @returns {String}
   */
  static get REAL_TYPE() {
    return 'REAL_TYPE';
  }

  /**
   * Returns a Token type for an integer literals.
   *
   * @static
   * @returns {String}
   */
  static get INTEGER_LITERAL() {
    return 'INTEGER_LITERAL';
  }

  /**
   * Returns a Token type for a real literals.
   *
   * @static
   * @returns {String}
   */
  static get REAL_LITERAL() {
    return 'REAL_LITERAL';
  }

  /**
   * Returns a Token type for integer division (DIV).
   *
   * @static
   * @returns {String}
   */
  static get INTEGER_DIV() {
    return 'INTEGER_DIV';
  }

  /**
   * Returns a Token type for float division (/).
   *
   * @static
   * @returns {String}
   */
  static get REAL_DIV() {
    return 'REAL_DIV';
  }

  /**
   * Returns a Token type for PROCEDURE keyword (PROCEDURE).
   *
   * @static
   * @returns {String}
   */
  static get PROCEDURE() {
    return 'PROCEDURE';
  }
}

module.exports = Token;
