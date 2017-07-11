const SymbolTable = require('./SymbolTable');
const VariableSymbol = require('./VariableSymbol');

/**
 * It's a specific class which constructs symbol table based on AST.
 *
 * @class
 * @since 1.0.0
 */
class SymbolTableBuilder {
  /**
   * Creates new instance of SymbolTableBuilder.
   */
  constructor() {
    this.symbolTable = SymbolTable.create();
  }

  /**
   * Get a visitor for a node.
   *
   * @param {Node} node
   * @returns {*}
   */
  visit(node) {
    const visitor = this[`on${node.constructor.name}`];

    return visitor.call(this, node);
  }

  /**
   * Visitor for Block node.
   *
   * @param {Block} node
   */
  onBlock(node) {
    node.getDeclarations().forEach(node => this.visit(node));
    this.visit(node.getCompound());
  }

  /**
   * Visitor for Program node.
   *
   * @param {Program} node
   */
  onProgram(node) {
    this.visit(node.getBlock());
  }

  /**
   * Visitor for BinaryOperation.
   *
   * @param {BinaryOperator} node
   */
  onBinaryOperator(node) {
    this.visit(node.getLHS());
    this.visit(node.getRHS());
  }

  /**
   * Visitor for Number node.
   *
   * @param {Number} node
   * @returns {Number}
   */
  onNumber(node) {
    return node;
  }

  /**
   * Visitor for UnaryOperator.
   *
   * @param {UnaryOperator} node
   */
  onUnaryOperator(node) {
    this.visit(node.getOperand());
  }

  /**
   * Visitor for Compound node.
   *
   * @param {Compound} node
   */
  onCompound(node) {
    node.getChildren().forEach(node => this.visit(node));
  }

  /**
   * Visitor for NoOperation node.
   *
   * @param {NoOperation} node
   * @returns {NoOperation}}
   */
  onNoOperation(node) {
    return node;
  }

  /**
   * Visitor for VarDecl node.
   * It traverses the variable declaration and adds a symbol into symbol table.
   *
   * @param {VarDecl} node
   */
  onVarDecl(node) {
    const typeName = node.getType().getValue();
    const typeSymbol = this.symbolTable.lookup(typeName);
    const varName = node.getVariable().getName();
    const varSymbol = VariableSymbol.create(varName, typeSymbol);

    this.symbolTable.define(varSymbol);
  }

  /**
   * Visitor for Assign node.
   *
   * @param {Assign} node
   */
  onAssign(node) {
    const varName = node.getVariable().getName();
    const varSymbol = this.symbolTable.lookup(varName);

    if (!varSymbol) throw new Error(`Variable ${varName} is not declared`);

    return this.visit(node.getExpression());
  }

  /**
   * Visitor for Variable node.
   *
   * @param {Variable} node
   */
  onVariable(node) {
    const varName = node.getName();
    const varSymbol = this.symbolTable.lookup(varName);

    if (!varSymbol) throw new Error(`Variable ${varName} is not declared`);
  }

  /**
   * Visitor for ProcedureDecl node.
   *
   * @param {ProcedureDecl} node
   * @returns {ProcedureDecl}
   */
  onProcedureDecl(node) {
    return node;
  }

  /**
   * Static helper for creating SymbolTableBuilder instance.
   *
   * @static
   * @returns {SymbolTableBuilder}
   */
  static create() {
    return new this;
  }
}

module.exports = SymbolTableBuilder;
