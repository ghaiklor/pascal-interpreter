const Token = require('../lexer/Token');
const Parser = require('../parser');

class Interpreter {
  constructor(input) {
    this.parser = new Parser(input);
    this.ast = this.parser.parse();
  }

  visit(node) {
    const visitor = this[`on${node.constructor.name}`];

    return visitor.call(this, node);
  }

  onBinaryOperator(node) {
    if (node.getOperator().is(Token.PLUS)) {
      return this.visit(node.getLHS()) + this.visit(node.getRHS());
    } else if (node.getOperator().is(Token.MINUS)) {
      return this.visit(node.getLHS()) - this.visit(node.getRHS());
    } else if (node.getOperator().is(Token.ASTERISK)) {
      return this.visit(node.getLHS()) * this.visit(node.getRHS());
    } else if (node.getOperator().is(Token.SLASH)) {
      return this.visit(node.getLHS()) / this.visit(node.getRHS());
    }
  }

  onNumber(node) {
    return node.getValue();
  }

  interpret() {
    return this.visit(this.ast);
  }
}

module.exports = Interpreter;
