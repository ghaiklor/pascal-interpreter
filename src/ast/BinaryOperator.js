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
   * @param {Node} lhs AST Node
   * @param {Token} op Operand represented as a {@link Token}
   * @param {Node} rhs AST Node
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
   * Returns an operand in this binary expression.
   *
   * @returns {Token}
   */
  getOperand() {
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
}

module.exports = BinaryOperator;
