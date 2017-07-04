const Node = require('./Node');

/**
 * Class for representing numbers in AST.
 *
 * @since 1.0.0
 */
class Number extends Node {
  /**
   * Creates a new instance of Number Node.
   *
   * @param {Token} token {@link Token} that represents a number
   */
  constructor(token) {
    super(token);

    this.value = token.getValue();
  }

  /**
   * Get a value of a number as integer.
   *
   * @returns {Number}
   */
  getValue() {
    return parseInt(this.value);
  }

  /**
   * Static helper for creating this node.
   *
   * @param {Token} token
   * @returns {Number}
   */
  static create(token) {
    return new this(token);
  }
}

module.exports = Number;
