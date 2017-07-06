const {assert} = require('chai');
const Token = require('../../src/lexer/Token');
const Lexer = require('../../src/lexer');
const Parser = require('../../src/parser');
const AST = require('../../src/ast');

describe('Parser', () => {
  it('Should properly instantiate', () => {
    const parser = new Parser('2 + 5');

    assert.instanceOf(parser.lexer, Lexer);
    assert.instanceOf(parser.currentToken, Token);
  });

  it('Should properly consume (eat) a token', () => {
    const parser = new Parser('2 + 5');

    assert.ok(parser.currentToken.is(Token.INTEGER));
    assert.instanceOf(parser.eat(Token.INTEGER), Parser);
    assert.ok(parser.currentToken.is(Token.PLUS));
    assert.instanceOf(parser.eat(Token.PLUS), Parser);
    assert.ok(parser.currentToken.is(Token.INTEGER));
    assert.throws(() => parser.eat(Token.ASTERISK), Error, '[Parser]\nYou provided unexpected token type "ASTERISK" while current token is Token(INTEGER, 5)');
  });

  it('Should properly parse an expression with +', () => {
    const parser = new Parser('2 + 5');
    const ast = parser.parse();

    assert.instanceOf(ast, AST.BinaryOperator);
    assert.equal(ast.getLHS().getValue(), 2);
    assert.ok(ast.getOperator().is(Token.PLUS));
    assert.equal(ast.getRHS().getValue(), 5);
  });

  it('Should properly parse an expression with -', () => {
    const parser = new Parser('2 - 5');
    const ast = parser.parse();

    assert.instanceOf(ast, AST.BinaryOperator);
    assert.equal(ast.getLHS().getValue(), 2);
    assert.ok(ast.getOperator().is(Token.MINUS));
    assert.equal(ast.getRHS().getValue(), 5);
  });

  it('Should properly parse an expression with *', () => {
    const parser = new Parser('2 * 5');
    const ast = parser.parse();

    assert.instanceOf(ast, AST.BinaryOperator);
    assert.equal(ast.getLHS().getValue(), 2);
    assert.ok(ast.getOperator().is(Token.ASTERISK));
    assert.equal(ast.getRHS().getValue(), 5);
  });

  it('Should properly parse an expression with /', () => {
    const parser = new Parser('2 / 5');
    const ast = parser.parse();

    assert.instanceOf(ast, AST.BinaryOperator);
    assert.equal(ast.getLHS().getValue(), 2);
    assert.ok(ast.getOperator().is(Token.SLASH));
    assert.equal(ast.getRHS().getValue(), 5);
  });

  it('Should properly parse an expression with parenthesis', () => {
    const parser = new Parser('5 * (10 - 8)');
    const ast = parser.parse();

    assert.instanceOf(ast, AST.BinaryOperator);
    assert.equal(ast.getLHS().getValue(), 5);
    assert.ok(ast.getOperator().is(Token.ASTERISK));
    assert.instanceOf(ast.getRHS(), AST.BinaryOperator);
    assert.equal(ast.getRHS().getLHS().getValue(), 10);
    assert.ok(ast.getRHS().getOperator().is(Token.MINUS));
    assert.equal(ast.getRHS().getRHS().getValue(), 8);
  });

  it('Should properly parse an expression with unary operator (-)', () => {
    const parser = new Parser('-5');
    const ast = parser.parse();

    assert.instanceOf(ast, AST.UnaryOperator);
    assert.ok(ast.getOperator().is(Token.MINUS));
    assert.equal(ast.getOperand().getValue(), 5);
  });

  it('Should properly parse an expression with unary operator (+)', () => {
    const parser = new Parser('+5');
    const ast = parser.parse();

    assert.instanceOf(ast, AST.UnaryOperator);
    assert.ok(ast.getOperator().is(Token.PLUS));
    assert.equal(ast.getOperand().getValue(), 5);
  });

  it('Should properly throw an error if provide parser with unexpected chars', () => {
    assert.throws(() => new Parser('~~'), Error, '[Lexer]\nUnexpected character: ~');
  });

  it('Should properly throw an error if provide parser with wrong syntax structure', () => {
    const parser = new Parser('100 + / 5');

    assert.throws(() => parser.parse(), Error, '[Parser]\nUnexpected token in "factor" production: Token(SLASH, /)');
  });
});
