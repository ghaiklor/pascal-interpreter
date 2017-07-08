const Node = require('./Node');

/**
 * Assign Node represents assign operation to some variable.
 *
 * @class
 * @since 1.0.0
 */
class Assign extends Node {
  /**
   * Creates new instance of Assign node.
   *
   * @param {Variable} variable
   * @param {Token} token
   * @param {Node} expression
   */
  constructor(variable, token, expression) {
    super(token);

    this.variable = variable;
    this.expression = expression;
  }

  /**
   * Get variable node where result must be stored.
   *
   * @returns {Variable}
   */
  getVariable() {
    return this.variable;
  }

  /**
   * Get AST node of an expression which must be stored in a variable.
   *
   * @returns {Node}
   */
  getExpression() {
    return this.expression;
  }

  /**
   * Static helper for creating Assign node.
   *
   * @static
   * @param {Variable} variable
   * @param {Token} token
   * @param {Node} expression
   * @returns {Assign}
   */
  static create(variable, token, expression) {
    return new this(variable, token, expression);
  }
}

module.exports = Assign;
