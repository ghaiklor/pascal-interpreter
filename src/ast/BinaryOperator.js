const Node = require('./Node');

/**
 * Class that represents a binary operation in AST.
 *
 * @since 1.0.0
 */
class BinaryOperator extends Node {
  /**
   * Creates an instance of binary operation in AST.
   *
   * @param {Node} lhs AST Node (left operand)
   * @param {Token} op Operator represented as a {@link Token}
   * @param {Node} rhs AST Node (right operand)
   */
  constructor(lhs, op, rhs) {
    super(op);

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
    return this.token;
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
   * @param {Node} lhs
   * @param {Token} op
   * @param {Node} rhs
   * @returns {BinaryOperator}
   */
  static create(lhs, op, rhs) {
    return new this(lhs, op, rhs);
  }
}

module.exports = BinaryOperator;
