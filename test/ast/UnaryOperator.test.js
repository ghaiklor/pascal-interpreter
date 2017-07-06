const {assert} = require('chai');
const Token = require('../../src/lexer/Token');
const Number = require('../../src/ast/Number');
const UnaryOperator = require('../../src/ast/UnaryOperator');

const OPERATOR = Token.create(Token.MINUS, '-');
const OPERAND = Number.create(Token.create(Token.INTEGER, 500));

describe('AST::UnaryOperator', () => {
  it('Should properly instantiate', () => {
    const node = new UnaryOperator(OPERATOR, OPERAND);

    assert.instanceOf(node, UnaryOperator);
    assert.instanceOf(node.token, Token);
    assert.ok(node.token.is(Token.MINUS));
    assert.instanceOf(node.operand, Number);
  });

  it('Should properly return operator', () => {
    const node = new UnaryOperator(OPERATOR, OPERAND);

    assert.instanceOf(node.getOperator(), Token);
    assert.ok(node.getOperator().is(Token.MINUS));
    assert.equal(node.getOperator().getType(), Token.MINUS);
    assert.equal(node.getOperator().getValue(), '-');
  });

  it('Should properly return operand', () => {
    const node = new UnaryOperator(OPERATOR, OPERAND);

    assert.instanceOf(node.getOperand(), Number);
    assert.equal(node.getOperand().getValue(), 500);
  });

  it('Should properly create instance via static helper', () => {
    const node = UnaryOperator.create(OPERATOR, OPERAND);

    assert.instanceOf(node, UnaryOperator);
    assert.instanceOf(node.token, Token);
    assert.ok(node.token.is(Token.MINUS));
    assert.instanceOf(node.operand, Number);
  });
});
