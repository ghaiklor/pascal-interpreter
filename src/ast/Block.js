const Node = require('./Node');

/**
 * Block node holds declarations and a compound statement.
 *
 * @class
 * @since 1.0.0
 */
class Block extends Node {
  /**
   * Creates new Block instance.
   *
   * @param {Array<Node>} declarations
   * @param {Compound} compound
   */
  constructor(declarations, compound) {
    super(null);

    this.declarations = declarations;
    this.compound = compound;
  }

  /**
   * Get an array with declarations in a block.
   *
   * @returns {Array<Node>}
   */
  getDeclarations() {
    return this.declarations;
  }

  /**
   * Get a compound node with a statements inside.
   *
   * @returns {Compound}
   */
  getCompound() {
    return this.compound;
  }

  /**
   * Static helper for creating Block node.
   *
   * @static
   * @param {Array<Node>} declarations
   * @param {Compound} compound
   * @returns {Block}
   */
  static create(declarations, compound) {
    return new this(declarations, compound);
  }
}

module.exports = Block;
