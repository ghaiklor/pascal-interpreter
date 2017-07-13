const {assert} = require('chai');
const Param = require('../../src/ast/Param');
const Variable = require('../../src/ast/Variable');
const Type = require('../../src/ast/Type');
const Token = require('../../src/lexer/Token');

describe('AST::Param', () => {
  it('Should properly create instance', () => {
    const param = Param.create(Variable.create(), Type.create(Token.create(Token.INTEGER_TYPE, 'INTEGER')));

    assert.instanceOf(param, Param);
    assert.instanceOf(param.variable, Variable);
    assert.instanceOf(param.type, Type);
  });

  it('Should properly get variable', () => {
    const param = Param.create(Variable.create(), Type.create(Token.create(Token.INTEGER_TYPE, 'INTEGER')));

    assert.instanceOf(param, Param);
    assert.instanceOf(param.getVariable(), Variable);
  });

  it('Should properly get type', () => {
    const param = Param.create(Variable.create(), Type.create(Token.create(Token.INTEGER_TYPE, 'INTEGER')));

    assert.instanceOf(param, Param);
    assert.instanceOf(param.getType(), Type);
  });
});
