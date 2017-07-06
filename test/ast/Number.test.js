const {assert} = require('chai');
const Token = require('../../src/lexer/Token');
const Number = require('../../src/ast/Number');

const TOKEN = Token.create(Token.INTEGER, 500);

describe('AST::Number', () => {
  it('Should properly instantiate Number node', () => {
    const node = Number.create(TOKEN);

    assert.instanceOf(node, Number);
    assert.instanceOf(node.token, Token);
    assert.ok(node.token.is(Token.INTEGER));
    assert.equal(node.value, 500);
  });

  it('Should properly return a value from Number node', () => {
    const node = Number.create(TOKEN);

    assert.instanceOf(node, Number);
    assert.equal(node.getValue(), 500);
  });
});
