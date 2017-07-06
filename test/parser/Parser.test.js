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
    assert.instanceOf(parser.eat(Token.PLUS), Parser);
    assert.throws(() => parser.eat(Token.ASTERISK), Error, 'An error during syntax analysis:\nUnexpected token type: ASTERISK');
  });

  it('Should properly parse an expression with +', () => {
    const parser = new Parser('2 + 5');
    const ast = parser.parse();

    assert.equal(ast.lhs.getValue(), 2);
    assert.ok(ast.token.is(Token.PLUS));
    assert.equal(ast.rhs.getValue(), 5);
  });

  it('Should properly parse an expression with -', () => {
    const parser = new Parser('2 - 5');
    const ast = parser.parse();

    assert.equal(ast.lhs.getValue(), 2);
    assert.ok(ast.token.is(Token.MINUS));
    assert.equal(ast.rhs.getValue(), 5);
  });

  it('Should properly parse an expression with *', () => {
    const parser = new Parser('2 * 5');
    const ast = parser.parse();

    assert.equal(ast.lhs.getValue(), 2);
    assert.ok(ast.token.is(Token.ASTERISK));
    assert.equal(ast.rhs.getValue(), 5);
  });

  it('Should properly parse an expression with /', () => {
    const parser = new Parser('2 / 5');
    const ast = parser.parse();

    assert.equal(ast.lhs.getValue(), 2);
    assert.ok(ast.token.is(Token.SLASH));
    assert.equal(ast.rhs.getValue(), 5);
  });

  it('Should properly parse an expression with parenthesis', () => {
    const parser = new Parser('5 * (10 - 8)');
    const ast = parser.parse();

    assert.equal(ast.lhs.getValue(), 5);
    assert.ok(ast.token.is(Token.ASTERISK));
    assert.isObject(ast.rhs);
    assert.equal(ast.rhs.lhs.getValue(), 10);
    assert.ok(ast.rhs.token.is(Token.MINUS));
    assert.equal(ast.rhs.rhs.getValue(), 8);
  });

  it('Should properly throw an error if provide parser with unexpected chars', () => {
    assert.throws(() => new Parser('~~'), Error, '[Lexer]\nUnexpected character: ~');
  });

  it('Should properly throw an error if provide parser with wrong syntax structure', () => {
    const parser = new Parser('100 + / 5');

    assert.throws(() => parser.parse(), Error, 'Unexpected token in "factor" production: Token(SLASH, /)');
  });
});
