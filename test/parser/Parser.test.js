const {assert} = require('chai');
const Token = require('../../src/lexer/Token');
const Lexer = require('../../src/lexer');
const Parser = require('../../src/parser');

describe('Parser', () => {
  it('Should properly instantiate', () => {
    const parser = new Parser('2+5');

    assert.instanceOf(parser.scanner, Lexer);
    assert.instanceOf(parser.currentToken, Token);
  });

  it('Should properly consume (eat) a token', () => {
    const parser = new Parser('2 + 5');

    assert.ok(parser.currentToken.is(Token.INTEGER));
    assert.instanceOf(parser.eat(Token.INTEGER), Parser);
    assert.throws(() => parser.eat(Token.ASTERISK), Error, 'An error during syntax analysis:\nUnexpected token type: ASTERISK');
  });

  it('Should properly parse a simple expression', () => {
    const parser = new Parser('2 + 5');
    const ast = parser.parse();

    assert.equal(ast.lhs.getValue(), 2);
    assert.equal(ast.token.getType(), 'PLUS');
    assert.equal(ast.rhs.getValue(), 5);
  });
});
