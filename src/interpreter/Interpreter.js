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
   *
   * @param {NoOperation} node
   * @returns {NoOperation}
   */
  onNoOperation(node) {
    return node;
  }

  /**
   * Visitor for {@link Compound} node.
   *
   * @param {Compound} node
   */
  onCompound(node) {
    return node.getChildren().forEach(child => this.visit(child));
  }

  /**
   * Visitor for {@link Assign} node.
   *
   * @param {Assign} node
   */
  onAssign(node) {
    const variableName = node.getVariable().getName();

    process.GLOBAL_SCOPE = process.GLOBAL_SCOPE || {};
    process.GLOBAL_SCOPE[variableName] = this.visit(node.getExpression());
  }

  /**
   * Visitor for {@link Variable} node.
   *
   * @param {Variable} node
   */
  onVariable(node) {
    const variableName = node.getName();

    return process.GLOBAL_SCOPE[variableName];
  }

  /**
   * Visitor for {@link Number} Node.
   *
   * @param {Number} node
   * @returns {Number}
   */
  onNumber(node) {
    return node.getValue();
  }

  /**
   * Visitor for {@link UnaryOperator} Node.
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
    }
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
