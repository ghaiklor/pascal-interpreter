const Interpreter = require('./interpreter');

module.exports = function (input) {
  return new Interpreter(input).ast;
};
