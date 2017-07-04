const Parser = require('../parser');

class Interpreter {
  constructor(input) {
    this.parser = new Parser(input);
    this.ast = this.parser.parse();
  }

  toObject() {
    return this.ast;
  }
}

module.exports = Interpreter;
