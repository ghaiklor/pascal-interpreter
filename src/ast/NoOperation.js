const Node = require('./Node');

/**
 * NoOperation node.
 *
 * @class
 * @since 1.0.0
 */
class NoOperation extends Node {
  /**
   * Creates a NoOperation node.
   * It used to indicate a valid AST node which doesn't have statements.
   * I.e. a block `BEGIN END` is a valid compound, though it has nothing inside.
   * So that, we are creating a NoOperation node in this case.
   */
  constructor() {
    super(null);
  }

  /**
   * Static helper for creating NoOperation node.
   *
   * @static
   * @returns {NoOperation}
   */
  static create() {
    return new this();
  }
}

module.exports = NoOperation;
