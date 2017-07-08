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

  it('Should properly parse a simple program', () => {
    const program = `BEGIN x:= 2; y:= x + 5; END.`;
    const parser = new Parser(program);
    const ast = parser.parse();

    assert.instanceOf(parser, Parser);
    assert.instanceOf(ast, AST.Compound);
  });

  it('Should properly parse a program with all factors', () => {
    const program = `BEGIN x:= +2; y:= x + -5; z:= (x + y); END.`;
    const parser = new Parser(program);
    const ast = parser.parse();

    assert.instanceOf(parser, Parser);
    assert.instanceOf(ast, AST.Compound);
  });

  it('Should properly parse a program with all terms', () => {
    const program = `BEGIN x:= +2; y:= x * -5; z:= (x / y); END.`;
    const parser = new Parser(program);
    const ast = parser.parse();

    assert.instanceOf(parser, Parser);
    assert.instanceOf(ast, AST.Compound);
  });

  it('Should properly parse a program with all expressions', () => {
    const program = `BEGIN x:= +2; y:= x * -5; z:= (x / y) - 5; END.`;
    const parser = new Parser(program);
    const ast = parser.parse();

    assert.instanceOf(parser, Parser);
    assert.instanceOf(ast, AST.Compound);
  });

  it('Should properly parse a program with few compound statements', () => {
    const program = `BEGIN x:= +2; y:= x * -5; BEGIN z:= (x / y) - 5; END END.`;
    const parser = new Parser(program);
    const ast = parser.parse();

    assert.instanceOf(parser, Parser);
    assert.instanceOf(ast, AST.Compound);
  });

  it('Should properly throw an error if provide parser with unexpected chars', () => {
    assert.throws(() => new Parser('~~'), Error, '[Lexer]\nUnexpected character: ~');
  });

  it('Should properly throw an error if identifier is in statement list', () => {
    const program = `BEGIN x:= y z END.`;
    const parser = new Parser(program);

    assert.throws(() => parser.parse(), Error, '[Parser]\nUnexpected identifier in "statementList" production: Token(IDENTIFIER, z)');
  });

  it('Should properly throw an error if provide parser with wrong syntax structure', () => {
    const parser = new Parser('BEGIN x:= 100 + / 5');

    assert.throws(() => parser.parse(), Error, '[Parser]\nUnexpected token in "factor" production: Token(SLASH, /)');
  });
});
