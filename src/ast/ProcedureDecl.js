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
   * @param {Array<Param>} params Array of Param nodes
   * @param {Block} block
   */
  constructor(name, params, block) {
    super(null);

    this.name = name;
    this.params = params;
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
   * Get params of a procedure.
   *
   * @returns {Array<Param>}
   */
  getParams() {
    return this.params;
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
   * @param {Array<Param>} params Array of Param nodes
   * @param {Block} block
   * @returns {ProcedureDecl}
   */
  static create(name, params, block) {
    return new this(name, params, block);
  }
}

module.exports = ProcedureDecl;
