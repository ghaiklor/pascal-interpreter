const Node = require('./Node');

/**
 * VarDecl node holds a variable declaration with its type.
 *
 * @class
 * @since 1.0.0
 */
class VarDecl extends Node {
  /**
   * Creates new VarDecl node.
   *
   * @param {Variable} variable
   * @param {Type} type
   */
  constructor(variable, type) {
    super(null);

    this.variable = variable;
    this.type = type;
  }

  /**
   * Get a variable node from its declaration.
   *
   * @returns {Variable}
   */
  getVariable() {
    return this.variable;
  }

  /**
   * Get a type node from its declaration.
   *
   * @returns {Type}
   */
  getType() {
    return this.type;
  }

  /**
   * Static helper for creating new VarDecl node.
   *
   * @static
   * @param {Variable} variable
   * @param {Type} type
   * @returns {VarDecl}
   */
  static create(variable, type) {
    return new this(variable, type);
  }
}

module.exports = VarDecl;
