const Interpreter = require('./interpreter/Interpreter');

module.exports = function (input) {
  const interpreter = new Interpreter(input);

  return interpreter.expr();
};
