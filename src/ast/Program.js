const Node = require('./Node');

/**
 * AST Node that represents a program definition.
 *
 * @class
 * @since 1.0.0
 */
class Program extends Node {
  /**
   * Creates new Program instance.
   *
   * @param {String} name
   * @param {Block} block
   */
  constructor(name, block) {
    super(null);

    this.name = name;
    this.block = block;
  }

  /**
   * Get a name of a program.
   *
   * @returns {String}
   */
  getName() {
    return this.name;
  }

  /**
   * Get block of a program.
   *
   * @returns {Block}
   */
  getBlock() {
    return this.block;
  }

  /**
   * Static helper for creating Program node.
   *
   * @static
   * @param {String} name
   * @param {Block} block
   * @returns {Program}
   */
  static create(name, block) {
    return new this(name, block);
  }
}

module.exports = Program;
