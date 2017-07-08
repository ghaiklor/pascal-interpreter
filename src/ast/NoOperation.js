const Node = require('./Node');

/**
 * NoOperation node has a specific value.
 * It used to indicate a valid AST node which doesn't have statements.
 *
 * @class
 * @since 1.0.0
 */
class NoOperation extends Node {
  /**
   * Creates a NoOperation node.
   */
  constructor() {
    super(null);
  }
}

module.exports = NoOperation;
