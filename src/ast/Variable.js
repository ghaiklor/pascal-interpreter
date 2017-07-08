const Node = require('./Node');

/**
 * Variable node represents a variable in AST.
 *
 * @class
 * @since 1.0.0
 */
class Variable extends Node {
  /**
   * Creates new instance of Variable node.
   *
   * @param {Token} token Identifier token that represents a variable
   * @param {String} name Name of a variable
   */
  constructor(token, name) {
    super(token);

    this.name = name;
  }

  /**
   * Get a name of variable.
   *
   * @returns {String}
   */
  getName() {
    return this.name;
  }

  /**
   * Static helper for creating Variable node.
   *
   * @static
   * @param {Token} token
   * @param {String} name
   * @returns {Variable}
   */
  static create(token, name) {
    return new this(token, name);
  }
}

module.exports = Variable;
