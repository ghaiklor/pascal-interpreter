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
   */
  static create(type, value) {
    return new this(type, value);
  }

  /**
   * Returns a Token type for integer.
   *
   * @static
   * @returns {String}
   */
  static get INTEGER() {
    return 'INTEGER';
  }

  /**
   * Returns a Token type for operator plus.
   *
   * @static
   * @returns {String}
   */
  static get PLUS() {
    return 'PLUS';
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
