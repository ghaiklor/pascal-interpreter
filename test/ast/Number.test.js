const {assert} = require('chai');
const Token = require('../../src/lexer/Token');
const Number = require('../../src/ast/Number');

describe('AST::Number', () => {
  it('Should properly instantiate Number node', () => {
    const node = Number.create(Token.create(Token.INTEGER, 500));

    assert.instanceOf(node, Number);
  });

  it('Should properly return a value from Number node', () => {
    const node = Number.create(Token.create(Token.INTEGER, 500));

    assert.instanceOf(node, Number);
    assert.equal(node.getValue(), 500);
  });
});
