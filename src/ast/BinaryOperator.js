const Node = require('./Node');

/**
 * Class that represents a binary operation in AST.
 *
 * @class
 * @since 1.0.0
 */
class BinaryOperator extends Node {
  /**
   * Creates an instance of binary operation in AST.
   * Binary operation means that it has two operands and one operator.
   *
   * @param {Node} lhs AST Node (left operand)
   * @param {Token} operator Operator represented as a {@link Token}
   * @param {Node} rhs AST Node (right operand)
   */
  constructor(lhs, operator, rhs) {
    super(operator);

    this.lhs = lhs;
    this.rhs = rhs;
  }

  /**
   * Get left assignment node from this binary operation.
   *
   * @returns {Node}
   */
  getLHS() {
    return this.lhs;
  }

  /**
   * Returns an operator in this binary expression.
   *
   * @returns {Token}
   */
  getOperator() {
    return this.getToken();
  }

  /**
   * Get right assignment node from this binary operation.
   *
   * @returns {Node}
   */
  getRHS() {
    return this.rhs;
  }

  /**
   * Static helper for creating new binary nodes.
   *
   * @param {Node} lhs AST Node (left operand)
   * @param {Token} operator Operator represented as a {@link Token}
   * @param {Node} rhs AST Node (right operand)
   * @returns {BinaryOperator}
   */
  static create(lhs, operator, rhs) {
    return new this(lhs, operator, rhs);
  }
}

module.exports = BinaryOperator;
