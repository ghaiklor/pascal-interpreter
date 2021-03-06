const {assert} = require('chai');
const Token = require('../../src/lexer/Token');
const Number = require('../../src/ast/Number');
const BinaryOperator = require('../../src/ast/BinaryOperator');

const LHS = Number.create(Token.create(Token.INTEGER, 250));
const OPERATOR = Token.create(Token.PLUS, '+');
const RHS = Number.create(Token.create(Token.INTEGER, 500));

describe('AST::BinaryOperator', () => {
  it('Should properly instantiate', () => {
    const node = new BinaryOperator(LHS, OPERATOR, RHS);

    assert.instanceOf(node, BinaryOperator);
    assert.instanceOf(node.lhs, Number);
    assert.instanceOf(node.token, Token);
    assert.instanceOf(node.rhs, Number);
  });

  it('Should properly return LHS', () => {
    const node = new BinaryOperator(LHS, OPERATOR, RHS);

    assert.instanceOf(node.getLHS(), Number);
    assert.equal(node.getLHS().getValue(), 250);
  });

  it('Should properly return binary operator', () => {
    const node = new BinaryOperator(LHS, OPERATOR, RHS);

    assert.instanceOf(node.getOperator(), Token);
    assert.ok(node.getOperator().is(Token.PLUS));
    assert.equal(node.getOperator().getType(), 'PLUS');
    assert.equal(node.getOperator().getValue(), '+');
  });

  it('Should properly return RHS', () => {
    const node = new BinaryOperator(LHS, OPERATOR, RHS);

    assert.instanceOf(node.getRHS(), Number);
    assert.equal(node.getRHS().getValue(), 500);
  });

  it('Should properly create instance via static helper', () => {
    const node = BinaryOperator.create(LHS, OPERATOR, RHS);

    assert.instanceOf(node, BinaryOperator);
    assert.instanceOf(node.lhs, Number);
    assert.instanceOf(node.token, Token);
    assert.instanceOf(node.rhs, Number);
  });
});
