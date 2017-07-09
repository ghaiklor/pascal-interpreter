const {assert} = require('chai');
const Type = require('../../src/ast/Type');
const Token = require('../../src/lexer/Token');

describe('AST::Type', () => {
  it('Should properly instantiate', () => {
    const type = Type.create(Token.create(Token.INTEGER, 'INTEGER'));

    assert.instanceOf(type, Type);
    assert.instanceOf(type.token, Token);
    assert.isString(type.value);
  });

  it('Should properly return type value', () => {
    const type = Type.create(Token.create(Token.INTEGER, 'INTEGER'));

    assert.instanceOf(type, Type);
    assert.instanceOf(type.token, Token);
    assert.equal(type.getValue(), 'INTEGER');
  });
});
