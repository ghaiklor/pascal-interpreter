const Node = require('./Node');

/**
 * Compound Node represents a compound statement.
 * It contains a list of statement nodes in its children property.
 *
 * @class
 * @since 1.0.0
 */
class Compound extends Node {
  /**
   * Creates a new Compound instance.
   * It returns an empty Compound node which must be filled with its children.
   * Its children is usual AST nodes pushed via {@link Compound#append} method.
   * Usually, this AST node needs to store an array of AST nodes in some logical scope.
   * I.e. in this language it is used for storing statements in BEGIN END block.
   *
   * @example
   * const compound = Compound.create();
   *
   * compound.append(node1);
   * compound.append(node2);
   */
  constructor() {
    super(null);

    this.children = [];
  }

  /**
   * Get an array with its children.
   *
   * @returns {Array<Node>}
   */
  getChildren() {
    return this.children;
  }

  /**
   * Appends new AST node into its children.
   *
   * @param {Node} node
   * @returns {Compound}
   */
  append(node) {
    this.children.push(node);

    return this;
  }

  /**
   * Static helper for creating Compound node.
   *
   * @static
   * @returns {Compound}
   */
  static create() {
    return new this();
  }
}

module.exports = Compound;
