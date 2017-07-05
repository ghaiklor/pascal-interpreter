const Node = require('./Node');

class UnaryOperator extends Node {
  /**
   * Creates a new instance of Node for unary operator.
   *
   * @param {Token} operator
   * @param {Node} expression
   */
  constructor(operator, expression) {
    super(operator);

    this.expression = expression;
  }

  getOperator() {
    return this.token;
  }

  getOperand() {
    return this.expression;
  }

  static create(operator, expression) {
    return new this(operator, expression);
  }
}

module.exports = UnaryOperator;
