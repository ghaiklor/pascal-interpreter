const {assert} = require('chai');
const Assign = require('../../src/ast/Assign');
const Variable = require('../../src/ast/Variable');
const Token = require('../../src/lexer/Token');
const Number = require('../../src/ast/Number');

const VARIABLE = Variable.create(Token.create(Token.IDENTIFIER, 'x'), 'x');
const TOKEN = Token.create(Token.ASSIGN, ':=');
const NUMBER = Number.create(Token.create(Token.INTEGER, 500));

describe('AST::Assign', () => {
  it('Should properly create Assign node', () => {
    const assign = Assign.create(VARIABLE, TOKEN, NUMBER);

    assert.instanceOf(assign, Assign);
    assert.instanceOf(assign.variable, Variable);
    assert.instanceOf(assign.token, Token);
    assert.instanceOf(assign.expression, Number);
  });

  it('Should properly return variable node', () => {
    const assign = Assign.create(VARIABLE, TOKEN, NUMBER);

    assert.instanceOf(assign, Assign);
    assert.instanceOf(assign.getVariable(), Variable);
    assert.instanceOf(assign.getVariable().getToken(), Token);
    assert.equal(assign.getVariable().getName(), 'x');
  });

  it('Should properly return expression node', () => {
    const assign = Assign.create(VARIABLE, TOKEN, NUMBER);

    assert.instanceOf(assign, Assign);
    assert.instanceOf(assign.getExpression(), Number);
    assert.instanceOf(assign.getExpression().getToken(), Token);
    assert.equal(assign.getExpression().getValue(), 500);
  });
});
