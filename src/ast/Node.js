/**
 * Basic Node for an AST.
 *
 * @since 1.0.0
 */
class Node {
  /**
   * Creates an instance of Node.
   *
   * @param {Token} token {@link Token} instance
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
