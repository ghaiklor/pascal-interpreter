/**
 * Basic Node for AST.
 *
 * @class
 * @since 1.0.0
 */
class Node {
  /**
   * Creates an instance of Node.
   * Each node should have a {@link Token} instance to identify where from this node came.
   * In case, token is not relevant here, i.e. {@link Compound} node, you can set `null`.
   * That's because some of AST nodes contain other nodes only and not assigned to some char in input.
   *
   * @param {Token} [token] {@link Token} instance
   * @example
   * const token = Token.create(Token.NUMBER, 1234);
   * const node = Node.create(token);
   */
  constructor(token) {
    this.token = token;
  }

  /**
   * Returns a token instance assigned to this Node.
   *
   * @returns {Token}
   */
  getToken() {
    return this.token;
  }

  /**
   * Static helper for creating a new Node instance.
   *
   * @static
   * @param {Token} token
   * @returns {Node}
   */
  static create(token) {
    return new this(token);
  }
}

module.exports = Node;
