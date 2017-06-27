const {assert} = require('chai');
const Token = require('../../src/lexer/Token');

describe('Lexer::Token', () => {
  it('Should properly create a Token instance', () => {
    const token = new Token(Token.INTEGER, '2');

    assert.instanceOf(token, Token);
  });

  it('Should properly return a type of a token', () => {
    const token = new Token(Token.INTEGER, '2');

    assert.equal(token.getType(), 'INTEGER');
  });

  it('Should properly return a value of a token', () => {
    const token = new Token(Token.INTEGER, '2');

    assert.equal(token.getValue(), '2');
  });

  it('Should properly convert a token into string representation', () => {
    const token = new Token(Token.INTEGER, '2');

    assert.equal(token.toString(), 'Token(INTEGER, 2)');
  });

  it('Should properly create a new token via static create method', () => {
    const token = Token.create(Token.INTEGER, '2');

    assert.instanceOf(token, Token);
    assert.equal(token.getType(), 'INTEGER');
    assert.equal(token.getValue(), '2');
  });

  it('Should properly return a token types from static getters', () => {
    assert.equal(Token.INTEGER, 'INTEGER');
    assert.equal(Token.PLUS, 'PLUS');
    assert.equal(Token.EOF, 'EOF');
  });
});
