const Token = require('../lexer/Token');
const Parser = require('../parser');

/**
 * This class responsible for interpreting generated AST by the parser.
 *
 * @class
 * @since 1.0.0
 */
class Interpreter {
  /**
   * Creates a new instance of interpreter.
   * As a dependency it creates {@link Parser} instance and provides it with a source program.
   * Afterwards, it calls {@link Parser#parse} method, getting an AST of the program.
   * In result, interpreter is able to interpret the program, since it has AST of it.
   *
   * @param {String} input Source code of a program
   * @example
   * const interpreter = new Interpreter('2 + 5');
   * const result = interpreter.interpret();
   */
  constructor(input) {
    this.parser = new Parser(input);
    this.ast = this.parser.parse();
  }

  /**
   * Visits a specified {@link Node}.
   * Visiting means calling a specific method, providing a node, based on its type.
   * This method must return some result, in our case, result of an operation based on node info.
   * I.e. node is BinaryOperator, then need to call {@link Interpreter#onBinaryOperator}.
   * Which results into recursively visiting LHS and RHS and executing an OPERATOR on them.
   *
   * @param {Node} node AST Node
   * @returns {*} Returns a result from a Node visitor
   * @example
   * const interpreter = new Interpreter('2 + 5');
   *
   * // AST here is BinaryOperator with LHS = Number(2), OPERATOR = + and RHS = Number(5)
   * interpreter.visit(interpreter.ast);
   * // Calling `visit` with this AST as an argument leads to calling `onBinaryOperator`
   * // which recursively calls `onNumber`, gets its values and returning a result
   */
  visit(node) {
    const visitor = this[`on${node.constructor.name}`];

    return visitor.call(this, node);
  }

  /**
   * Visitor for {@link NoOperation} node.
   * Do nothing here and just return the node itself.
   *
   * @param {NoOperation} node
   * @returns {NoOperation}
   */
  onNoOperation(node) {
    return node;
  }

  /**
   * Visitor for {@link Compound} node.
   * Interpreter for a compound nodes is a sequential visiting of all its children.
   *
   * @param {Compound} node
   */
  onCompound(node) {
    return node.getChildren().forEach(child => this.visit(child));
  }

  /**
   * Visitor for {@link Assign} node.
   * Each time, we see an assignment, we need to resolve a variable where to assign.
   * Also, we need to visit an expression, so we know what to assign into the variable.
   *
   * @param {Assign} node
   */
  onAssign(node) {
    const variableName = node.getVariable().getName();

    process.GLOBAL_SCOPE = Object.assign({}, process.GLOBAL_SCOPE);
    process.GLOBAL_SCOPE[variableName] = this.visit(node.getExpression());
  }

  /**
   * Visitor for {@link Variable} node.
   * All it does is simply gets a name of a variable and tries to look up it in symbol table.
   *
   * @param {Variable} node
   */
  onVariable(node) {
    const variableName = node.getName();

    return process.GLOBAL_SCOPE[variableName];
  }

  /**
   * Visitor for {@link Number} Node.
   * Since our Number node have a numeric value, we return its value.
   *
   * @param {Number} node
   * @returns {Number}
   */
  onNumber(node) {
    return node.getValue();
  }

  /**
   * Visitor for {@link UnaryOperator} Node.
   * Each time we see an unary operator, visit an operand and apply operator to it.
   *
   * @param {UnaryOperator} node
   * @returns {*}
   */
  onUnaryOperator(node) {
    const operator = node.getOperator();
    const operand = node.getOperand();

    if (operator.is(Token.PLUS)) {
      return +this.visit(operand);
    } else if (operator.is(Token.MINUS)) {
      return -this.visit(operand);
    }
  }

  /**
   * Visitor for {@link BinaryOperator} Node.
   * First of all, we need to visit left and right sides.
   * Afterwards, apply an operator to these results.
   *
   * @param {BinaryOperator} node
   * @returns {*}
   */
  onBinaryOperator(node) {
    const lhs = node.getLHS();
    const operator = node.getOperator();
    const rhs = node.getRHS();

    if (operator.is(Token.PLUS)) {
      return this.visit(lhs) + this.visit(rhs);
    } else if (operator.is(Token.MINUS)) {
      return this.visit(lhs) - this.visit(rhs);
    } else if (operator.is(Token.ASTERISK)) {
      return this.visit(lhs) * this.visit(rhs);
    } else if (operator.is(Token.SLASH)) {
      return this.visit(lhs) / this.visit(rhs);
    } else if (operator.is(Token.INTEGER_DIV)) {
      return this.visit(lhs) / this.visit(rhs);
    }
  }

  /**
   * Visitor for {@link Program} node.
   *
   * @param {Program} node
   */
  onProgram(node) {
    this.visit(node.getBlock());
  }

  /**
   * Visitor for {@link Block} node.
   *
   * @param {Block} node
   */
  onBlock(node) {
    node.getDeclarations().forEach(decl => this.visit(decl));
    this.visit(node.getCompound());
  }

  /**
   * Visitor for {@link VarDecl} node.
   *
   * @param {VarDecl} node
   * @returns {VarDecl}
   */
  onVarDecl(node) {
    return node;
  }

  /**
   * Visitor for {@link Type} node.
   *
   * @param {Type} node
   */
  onType(node) {
    return node;
  }

  /**
   * Interprets an AST and returns a result.
   *
   * @returns {*}
   */
  interpret() {
    return this.visit(this.ast);
  }
}

module.exports = Interpreter;
