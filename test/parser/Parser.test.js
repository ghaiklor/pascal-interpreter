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

    assert.ok(parser.currentToken.is(Token.INTEGER_LITERAL));
    assert.instanceOf(parser.eat(Token.INTEGER_LITERAL), Parser);
    assert.ok(parser.currentToken.is(Token.PLUS));
    assert.instanceOf(parser.eat(Token.PLUS), Parser);
    assert.ok(parser.currentToken.is(Token.INTEGER_LITERAL));
    assert.throws(() => parser.eat(Token.ASTERISK), Error, '[Parser]\nYou provided unexpected token type "ASTERISK" while current token is Token(INTEGER_LITERAL, 5)');
  });

  it('Should properly return NoOperation node for an empty production', () => {
    const parser = new Parser('');

    assert.instanceOf(parser.empty(), AST.NoOperation);
  });

  it('Should properly return Variable node from variable production', () => {
    const parser = new Parser('x y');
    const x = parser.variable();
    const y = parser.variable();

    assert.instanceOf(x, AST.Variable);
    assert.instanceOf(x.getToken(), Token);
    assert.ok(x.getToken().is(Token.IDENTIFIER));
    assert.equal(x.getName(), 'x');
    assert.instanceOf(y, AST.Variable);
    assert.equal(y.getName(), 'y');
    assert.instanceOf(y.getToken(), Token);
    assert.ok(y.getToken().is(Token.IDENTIFIER));
  });

  it('Should properly handle factor production', () => {
    const parser = new Parser('+1 -2 3 (4) a');

    assert.instanceOf(parser.factor(), AST.UnaryOperator);
    assert.instanceOf(parser.factor(), AST.UnaryOperator);
    assert.instanceOf(parser.factor(), AST.Number);
    assert.instanceOf(parser.factor(), AST.Number);
    assert.instanceOf(parser.factor(), AST.Variable);
  });

  it('Should properly handle term production', () => {
    const parser = new Parser('1 * 2 / 3');

    assert.instanceOf(parser.term(), AST.BinaryOperator);
  });

  it('Should properly handle expr production', () => {
    const parser = new Parser('1 + 2 - 3');

    assert.instanceOf(parser.expr(), AST.BinaryOperator);
  });

  it('Should properly handle assignmentStatement production', () => {
    const parser = new Parser('a := 2');
    const node = parser.assignmentStatement();

    assert.instanceOf(node, AST.Assign);
    assert.instanceOf(node.getVariable(), AST.Variable);
    assert.equal(node.getVariable().getName(), 'a');
    assert.instanceOf(node.getToken(), Token);
    assert.ok(node.getToken().is(Token.ASSIGN));
    assert.instanceOf(node.getExpression(), AST.Number);
    assert.equal(node.getExpression().getValue(), 2);
  });

  it('Should properly handle compoundStatement production', () => {
    const parser = new Parser('BEGIN a := 2 END');
    const node = parser.compoundStatement();

    assert.instanceOf(node, AST.Compound);
    assert.equal(node.getChildren().length, 1);
    assert.instanceOf(node.getChildren()[0], AST.Assign);
    assert.equal(node.getChildren()[0].getVariable().getName(), 'a');
    assert.ok(node.getChildren()[0].getToken().is(Token.ASSIGN));
    assert.equal(node.getChildren()[0].getExpression().getValue(), 2);
  });

  it('Should properly handle statement production', () => {
    const parser = new Parser('BEGIN END');
    const node = parser.statement();

    assert.instanceOf(node, AST.Compound);
    assert.equal(node.getChildren().length, 1);
    assert.instanceOf(node.getChildren()[0], AST.NoOperation);
  });

  it('Should properly handle statementList production', () => {
    const parser = new Parser('a := 2; b := 3;');
    const nodes = parser.statementList();

    assert.isArray(nodes);
    assert.equal(nodes.length, 3);
    assert.instanceOf(nodes[0], AST.Assign);
    assert.equal(nodes[0].getVariable().getName(), 'a');
    assert.ok(nodes[0].getToken().is(Token.ASSIGN));
    assert.equal(nodes[0].getExpression().getValue(), 2);
    assert.instanceOf(nodes[1], AST.Assign);
    assert.equal(nodes[1].getVariable().getName(), 'b');
    assert.ok(nodes[1].getToken().is(Token.ASSIGN));
    assert.equal(nodes[1].getExpression().getValue(), 3);
    assert.instanceOf(nodes[2], AST.NoOperation);
  });

  it('Should properly handle program production', () => {
    const parser = new Parser('PROGRAM program; BEGIN END.');
    const node = parser.program();

    assert.instanceOf(node, AST.Program);
    assert.equal(node.getName(), 'program');
    assert.instanceOf(node.getBlock(), AST.Block);
  });

  it('Should properly parse a simple program', () => {
    const program = `PROGRAM program; BEGIN x:= 2; y:= x + 5; END.`;
    const parser = new Parser(program);
    const ast = parser.parse();

    assert.instanceOf(parser, Parser);
    assert.instanceOf(ast, AST.Program);
  });

  it('Should properly parse a program with all factors', () => {
    const program = `PROGRAM program; BEGIN x:= +2; y:= x + -5; z:= (x + y); END.`;
    const parser = new Parser(program);
    const ast = parser.parse();

    assert.instanceOf(parser, Parser);
    assert.instanceOf(ast, AST.Program);
  });

  it('Should properly parse a program with all terms', () => {
    const program = `PROGRAM program; BEGIN x:= +2; y:= x * -5; z:= (x / y); END.`;
    const parser = new Parser(program);
    const ast = parser.parse();

    assert.instanceOf(parser, Parser);
    assert.instanceOf(ast, AST.Program);
  });

  it('Should properly parse a program with all expressions', () => {
    const program = `PROGRAM program; BEGIN x:= +2; y:= x * -5; z:= (x / y) - 5; END.`;
    const parser = new Parser(program);
    const ast = parser.parse();

    assert.instanceOf(parser, Parser);
    assert.instanceOf(ast, AST.Program);
  });

  it('Should properly parse a program with few compound statements', () => {
    const program = `PROGRAM program; BEGIN x:= +2; y:= x * -5; BEGIN z:= (x / y) - 5; END END.`;
    const parser = new Parser(program);
    const ast = parser.parse();

    assert.instanceOf(parser, Parser);
    assert.instanceOf(ast, AST.Program);
  });

  it('Should properly throw an error if provide parser with unexpected chars', () => {
    assert.throws(() => new Parser('~~'), Error, '[Lexer]\nUnexpected character: ~');
  });

  it('Should properly throw an error if identifier is in statement list', () => {
    const program = `PROGRAM program; BEGIN x:= y z END.`;
    const parser = new Parser(program);

    assert.throws(() => parser.parse(), Error, '[Parser]\nUnexpected identifier in "statementList" production: Token(IDENTIFIER, z)');
  });

  it('Should properly throw an error if provide parser with wrong syntax structure', () => {
    const parser = new Parser('PROGRAM program; BEGIN x:= 100 + / 5 END.');

    assert.throws(() => parser.parse(), Error, '[Parser]\nYou provided unexpected token type "IDENTIFIER" while current token is Token(SLASH, /)');
  });
});
