const Node = require('./Node');

/**
 * AST node for formal parameters in a procedure declaration.
 *
 * @class
 * @since 1.0.0
 */
class Param extends Node {
  /**
   * Creates new instance of Param node.
   *
   * @param {Variable} variable
   * @param {Type} type
   */
  constructor(variable, type) {
    super(null);

    this.variable = variable;
    this.type = type;
  }

  /**
   * Get variable of a param.
   *
   * @returns {Variable}
   */
  getVariable() {
    return this.variable;
  }

  /**
   * Get type of a param.
   *
   * @returns {Type}
   */
  getType() {
    return this.type;
  }

  /**
   * Static helper for creating new Param node.
   *
   * @static
   * @param {Variable} variable
   * @param {Type} type
   * @returns {Param}
   */
  static create(variable, type) {
    return new this(variable, type);
  }
}

module.exports = Param;
