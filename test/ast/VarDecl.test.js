const {assert} = require('chai');
const VarDecl = require('../../src/ast/VarDecl');
const Variable = require('../../src/ast/Variable');
const Type = require('../../src/ast/Type');
const Token = require('../../src/lexer/Token');

describe('AST::VarDecl', () => {
  it('Should properly instantiate', () => {
    const decl = VarDecl.create(Variable.create(Token.create(Token.IDENTIFIER, 'a'), 'a'), Type.create(Token.create(Token.INTEGER)));

    assert.instanceOf(decl, VarDecl);
    assert.instanceOf(decl.variable, Variable);
    assert.instanceOf(decl.type, Type);
  });

  it('Should properly get variable node', () => {
    const decl = VarDecl.create(Variable.create(Token.create(Token.IDENTIFIER, 'a'), 'a'), Type.create(Token.create(Token.INTEGER)));

    assert.instanceOf(decl.getVariable(), Variable);
  });

  it('Should properly get type node', () => {
    const decl = VarDecl.create(Variable.create(Token.create(Token.IDENTIFIER, 'a'), 'a'), Type.create(Token.create(Token.INTEGER)));

    assert.instanceOf(decl.getType(), Type);
  });
});
