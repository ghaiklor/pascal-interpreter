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
   * new Token(Token.INTEGER, 1234);
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
    return this.type;
  }

  /**
   * Returns a value of a token.
   *
   * @returns {String}
   */
  getValue() {
    return this.value;
  }

  /**
   * Check if specified token type is this token.
   *
   * @param {String} tokenType Token type from {@link Token} static enum
   * @returns {Boolean}
   * @example
   * const token = Token.create(Token.INTEGER, 234);
   *
   * token.is(Token.INTEGER); // true
   * token.is(Token.ASTERISK); // false
   */
  is(tokenType) {
    return this.type === tokenType;
  }

  /**
   * Converts a token into string representation.
   *
   * @returns {String} Returns a representation in format Token(type, value)
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
   * Returns a Token type for an integer.
   *
   * @static
   * @returns {String}
   */
  static get INTEGER() {
    return 'INTEGER';
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
   * Returns a Token type for end-of-file.
   *
   * @static
   * @returns {String}
   */
  static get EOF() {
    return 'EOF';
  }
}

module.exports = Token;
