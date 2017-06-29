const Interpreter = require('./interpreter');

module.exports = function (input) {
  const interpreter = new Interpreter(input);

  return interpreter.expr();
};
