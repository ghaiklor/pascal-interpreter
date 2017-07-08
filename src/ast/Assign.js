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
   * This node contains three parts: variable, assignment token and an expression.
   *
   * @param {Variable} variable Variable node
   * @param {Token} token Assignment token
   * @param {Node} expression AST node which indicates an expression
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
   * @param {Variable} variable Variable node
   * @param {Token} token Assignment token
   * @param {Node} expression AST node which indicates an expression
   * @returns {Assign} Returns created Assign node
   */
  static create(variable, token, expression) {
    return new this(variable, token, expression);
  }
}

module.exports = Assign;
