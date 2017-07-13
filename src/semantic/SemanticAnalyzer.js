const SymbolTable = require('../symbols/SymbolTable');
const VariableSymbol = require('../symbols/VariableSymbol');

class SemanticAnalyzer {
  /**
   * Creates new instance of SemanticAnalyzer.
   */
  constructor() {
    this.scope = SymbolTable.create('global', 1);
  }

  /**
   * Get and call a visitor for specified Node.
   *
   * @param {Node} node
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
   */
  onNoOperation(node) {
    return node;
  }

  /**
   * Visitor for VarDecl node.
   *
   * @param {VarDecl} node
   */
  onVarDecl(node) {
    const typeName = node.getType().getValue();
    const typeSymbol = this.scope.lookup(typeName);

    const varName = node.getVariable().getName();
    const varSymbol = VariableSymbol.create(varName, typeSymbol);

    if (this.scope.lookup(varName)) throw new Error(`Duplicate declaration of ${varName}`);

    this.scope.define(varSymbol);
  }

  /**
   * Visitor for Variable node.
   *
   * @param {Variable} node
   */
  onVariable(node) {
    const varName = node.getName();
    const varSymbol = this.scope.lookup(varName);

    if (!varSymbol) throw new Error(`Variable ${varName} is not resolved`);
  }

  /**
   * Visitor for Assign node.
   *
   * @param {Assign} node
   */
  onAssign(node) {
    this.visit(node.getExpression());
    this.visit(node.getVariable());
  }

  /**
   * Visitor for BinaryOperator node.
   *
   * @param {BinaryOperator} node
   */
  onBinaryOperator(node) {
    this.visit(node.getLHS());
    this.visit(node.getRHS());
  }

  /**
   * Static helper for creating an instance.
   *
   * @static
   * @returns {SemanticAnalyzer}
   */
  static create() {
    return new this();
  }
}

module.exports = SemanticAnalyzer;