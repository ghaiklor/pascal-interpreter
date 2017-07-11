const Node = require('./Node');

/**
 * AST node for representing procedure declarations.
 *
 * @class
 * @since 1.0.0
 */
class ProcedureDecl extends Node {
  /**
   * Creates new instance of procedure declaration node.
   *
   * @param {String} name Procedure name
   * @param {Block} block
   */
  constructor(name, block) {
    super(null);

    this.name = name;
    this.block = block;
  }

  /**
   * Returns procedure name.
   *
   * @returns {String}
   */
  getName() {
    return this.name;
  }

  /**
   * Returns {@link Block} node of a procedure.
   *
   * @returns {Block}
   */
  getBlock() {
    return this.block;
  }

  /**
   * Static helper for creating new ProcedureDecl node.
   *
   * @static
   * @param {String} name Procedure name
   * @param {Block} block
   * @returns {ProcedureDecl}
   */
  static create(name, block) {
    return new this(name, block);
  }
}

module.exports = ProcedureDecl;
