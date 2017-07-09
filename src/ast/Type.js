const Node = require('./Node');

/**
 * AST node that holds information about variable type.
 *
 * @class
 * @since 1.0.0
 */
class Type extends Node {
  /**
   * Creates new Type node instance.
   *
   * @param {Token} token
   */
  constructor(token) {
    super(token);

    this.value = token.getValue();
  }

  /**
   * Get a value that represents a type.
   *
   * @returns {String}
   */
  getValue() {
    return this.value;
  }

  /**
   * Static helper for creating Type node.
   *
   * @static
   * @param {Token} token
   * @returns {Type}
   */
  static create(token) {
    return new this(token);
  }
}

module.exports = Type;
