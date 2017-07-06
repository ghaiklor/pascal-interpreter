const {assert} = require('chai');
const Interpreter = require('../../src/interpreter');
const Token = require('../../src/lexer/Token');
const Parser = require('../../src/parser');
const AST = require('../../src/ast');

describe('Interpreter', () => {
  it('Should properly instantiate', () => {
    const interpreter = new Interpreter('2 + 5');

    assert.instanceOf(interpreter, Interpreter);
    assert.instanceOf(interpreter.parser, Parser);
    assert.instanceOf(interpreter.ast, AST.BinaryOperator);
  });

  it('Should properly get a visitor for a node', () => {
    const interpreter = new Interpreter('2 + 5');

    assert.instanceOf(interpreter.ast, AST.BinaryOperator);
    assert.instanceOf(interpreter.ast.getLHS(), AST.Number);
    assert.equal(interpreter.ast.getLHS().getValue(), 2);
    assert.equal(interpreter.visit(interpreter.ast.getLHS()), 2);
    assert.equal(interpreter.visit(interpreter.ast.getRHS()), 5);
    assert.equal(interpreter.visit(interpreter.ast), 7);
  });

  it('Should properly get a visitor for a Number node', () => {
    const interpreter = new Interpreter('5');

    assert.instanceOf(interpreter.ast, AST.Number);
    assert.equal(interpreter.visit(interpreter.ast), 5);
  });

  it('Should properly get a visitor for a UnaryOperator node', () => {
    const interpreter = new Interpreter('+5 - -5');

    assert.instanceOf(interpreter.ast, AST.BinaryOperator);
    assert.instanceOf(interpreter.ast.getLHS(), AST.UnaryOperator);
    assert.instanceOf(interpreter.ast.getRHS(), AST.UnaryOperator);
    assert.ok(interpreter.ast.getLHS().getOperator().is(Token.PLUS));
    assert.ok(interpreter.ast.getRHS().getOperator().is(Token.MINUS));
    assert.equal(interpreter.visit(interpreter.ast), 10);
  });

  it('Should properly get a visitor for a BinaryOperator node', () => {
    const interpreter = new Interpreter('2 + 5');

    assert.instanceOf(interpreter.ast, AST.BinaryOperator);
    assert.equal(interpreter.visit(interpreter.ast), 7);
  });

  it('Should properly call a visitors for interpreting a source program', () => {
    const interpreter = new Interpreter('2 + 5');

    assert.equal(interpreter.interpret(), 7);
  });
});
