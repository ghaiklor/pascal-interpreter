const {assert} = require('chai');
const Variable = require('../../src/ast/Variable');
const Token = require('../../src/lexer/Token');

const TOKEN = Token.create(Token.IDENTIFIER, 'x');

describe('AST::Variable', () => {
  it('Should properly create Variable node instance', () => {
    const variable = Variable.create(TOKEN, TOKEN.getValue());

    assert.instanceOf(variable, Variable);
    assert.instanceOf(variable.getToken(), Token);
    assert.isString(variable.name);
  });

  it('Should properly get a name of variable', () => {
    const variable = Variable.create(TOKEN, TOKEN.getValue());

    assert.instanceOf(variable, Variable);
    assert.equal(variable.getName(), 'x');
  });
});
