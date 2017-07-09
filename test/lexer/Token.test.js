const {assert} = require('chai');
const Token = require('../../src/lexer/Token');

describe('Lexer::Token', () => {
  it('Should properly create a Token instance', () => {
    const token = new Token(Token.INTEGER_LITERAL, '2');

    assert.instanceOf(token, Token);
    assert.isString(token.type);
    assert.isString(token.value);
    assert.equal(token.type, 'INTEGER_LITERAL');
    assert.equal(token.value, '2');
  });

  it('Should properly return a type of a token', () => {
    const token = new Token(Token.INTEGER_LITERAL, '2');
    const token2 = new Token();

    assert.equal(token.getType(), Token.INTEGER_LITERAL);
    assert.equal(token.getType(), 'INTEGER_LITERAL');
    assert.isNull(token2.getType());
    assert.equal(token2.getType(), null);
  });

  it('Should properly return a value of a token', () => {
    const token = new Token(Token.INTEGER_LITERAL, '2');
    const token2 = new Token();

    assert.equal(token.getValue(), '2');
    assert.isNull(token2.getValue());
    assert.equal(token2.getValue(), null);
  });

  it('Should properly check if token type is equal to specified', () => {
    const token = Token.create(Token.INTEGER_LITERAL, '234');

    assert.ok(token.is(Token.INTEGER_LITERAL));
    assert.notOk(token.is(Token.ASTERISK));
    assert.notOk(token.is(Token.PLUS));
    assert.notOk(token.is(null));
    assert.notOk(token.is());
  });

  it('Should properly convert a token into string representation', () => {
    const token = new Token(Token.INTEGER_LITERAL, '2');
    const token2 = new Token(Token.PLUS, '+');
    const token3 = new Token(Token.BACKSLASH, 'bla bla');
    const token4 = new Token(Token.MINUS);
    const token5 = new Token();
    const token6 = new Token(null, 'value');

    assert.equal(token.toString(), 'Token(INTEGER_LITERAL, 2)');
    assert.equal(token2.toString(), 'Token(PLUS, +)');
    assert.equal(token3.toString(), 'Token(BACKSLASH, bla bla)');
    assert.equal(token4.toString(), 'Token(MINUS, null)');
    assert.equal(token5.toString(), 'Token(null, null)');
    assert.equal(token6.toString(), 'Token(null, value)');
  });

  it('Should properly create a new token via static create method', () => {
    const token = Token.create(Token.INTEGER_LITERAL, '2');

    assert.instanceOf(token, Token);
    assert.ok(token.is(Token.INTEGER_LITERAL));
    assert.equal(token.getType(), 'INTEGER_LITERAL');
    assert.equal(token.getValue(), '2');
  });

  it('Should properly return a token types from static getters', () => {
    assert.equal(Token.PLUS, 'PLUS');
    assert.equal(Token.MINUS, 'MINUS');
    assert.equal(Token.ASTERISK, 'ASTERISK');
    assert.equal(Token.SLASH, 'SLASH');
    assert.equal(Token.BACKSLASH, 'BACKSLASH');
    assert.equal(Token.COMMA, 'COMMA');
    assert.equal(Token.DOT, 'DOT');
    assert.equal(Token.COLON, 'COLON');
    assert.equal(Token.SEMICOLON, 'SEMICOLON');
    assert.equal(Token.LEFT_PARENTHESIS, 'LEFT_PARENTHESIS');
    assert.equal(Token.RIGHT_PARENTHESIS, 'RIGHT_PARENTHESIS');
    assert.equal(Token.ASSIGN, 'ASSIGN');
    assert.equal(Token.EOF, 'EOF');
    assert.equal(Token.BEGIN, 'BEGIN');
    assert.equal(Token.END, 'END');
    assert.equal(Token.IDENTIFIER, 'IDENTIFIER');
    assert.equal(Token.PROGRAM, 'PROGRAM');
    assert.equal(Token.VAR, 'VAR');
    assert.equal(Token.INTEGER_TYPE, 'INTEGER_TYPE');
    assert.equal(Token.REAL_TYPE, 'REAL_TYPE');
    assert.equal(Token.INTEGER_LITERAL, 'INTEGER_LITERAL');
    assert.equal(Token.REAL_LITERAL, 'REAL_LITERAL');
    assert.equal(Token.INTEGER_DIV, 'INTEGER_DIV');
    assert.equal(Token.REAL_DIV, 'REAL_DIV');
  });
});
