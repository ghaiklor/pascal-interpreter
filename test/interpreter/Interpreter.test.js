const {assert} = require('chai');
const Interpreter = require('../../src/interpreter');
const Token = require('../../src/lexer/Token');
const Parser = require('../../src/parser');
const AST = require('../../src/ast');

describe('Interpreter', () => {
  it('Should properly handle creating new instance', () => {
    const interpreter = new Interpreter('PROGRAM program; BEGIN END.');

    assert.instanceOf(interpreter.parser, Parser);
    assert.instanceOf(interpreter.ast, AST.Program);
  });

  it('Should properly get a visitor for specified node', () => {
    const number = AST.Number.create(Token.create(Token.INTEGER_LITERAL, 500));
    const interpreter = new Interpreter('PROGRAM program; BEGIN END.');

    assert.isNumber(interpreter.visit(number));
    assert.equal(interpreter.visit(number), 500);
  });

  it('Should properly interpret the simplest program', () => {
    process.GLOBAL_SCOPE = {};
    const program = `PROGRAM program; BEGIN x:= -2; y:= -x; z:=(x - y + +8) / 4 * -1 END.`;
    const interpreter = new Interpreter(program);

    interpreter.interpret();

    assert.deepEqual(process.GLOBAL_SCOPE, {x: -2, y: 2, z: -1});
  });
});
