const {assert} = require('chai');
const Lexer = require('../../src/lexer');

describe('Lexer', () => {
  it('Should properly instantiate an instance', () => {
    const lexer = new Lexer('2 + 3');

    assert.instanceOf(lexer, Lexer);
    assert.equal(lexer.input, '2 + 3');
    assert.equal(lexer.position, 0);
    assert.equal(lexer.currentChar, '2');
  });

  it('Should properly advance a pointer', () => {
    const lexer = new Lexer('2 + 3');

    assert.instanceOf(lexer, Lexer);
    assert.instanceOf(lexer.advance(), Lexer);
    assert.equal(lexer.input, '2 + 3');
    assert.equal(lexer.position, 1);
    assert.equal(lexer.currentChar, ' ');
  });

  it('Should properly skip whitespaces in an input', () => {
    const lexer = new Lexer('2    + 3');

    assert.instanceOf(lexer, Lexer);
    assert.equal(lexer.input, '2    + 3');
    assert.equal(lexer.position, 0);
    assert.equal(lexer.currentChar, '2');
    assert.instanceOf(lexer.skipWhitespace(), Lexer);
    assert.equal(lexer.input, '2    + 3');
    assert.equal(lexer.position, 0);
    assert.equal(lexer.currentChar, '2');
    assert.instanceOf(lexer.advance(), Lexer);
    assert.instanceOf(lexer.skipWhitespace(), Lexer);
    assert.equal(lexer.input, '2    + 3');
    assert.equal(lexer.position, 5);
    assert.equal(lexer.currentChar, '+');
  });

  it('Should properly parse an integer from an input', () => {
    const lexer = new Lexer('256 + 3');

    assert.instanceOf(lexer, Lexer);
    assert.equal(lexer.input, '256 + 3');
    assert.equal(lexer.position, 0);
    assert.equal(lexer.currentChar, '2');
    assert.equal(lexer.integer(), 256);
    assert.equal(lexer.input, '256 + 3');
    assert.equal(lexer.position, 3);
    assert.equal(lexer.currentChar, ' ');
  });

  it('Should properly return a stream of tokens for +, -, *, /', () => {
    const lexer = new Lexer('+ - * /');

    assert.equal(lexer.getNextToken(), 'Token(PLUS, +)');
    assert.equal(lexer.getNextToken(), 'Token(MINUS, -)');
    assert.equal(lexer.getNextToken(), 'Token(ASTERISK, *)');
    assert.equal(lexer.getNextToken(), 'Token(SLASH, /)');
    assert.equal(lexer.getNextToken(), 'Token(EOF, null)');
  });

  it('Should properly return a stream of tokens for integers', () => {
    const lexer = new Lexer('123 456 7890');

    assert.equal(lexer.getNextToken(), 'Token(INTEGER, 123)');
    assert.equal(lexer.getNextToken(), 'Token(INTEGER, 456)');
    assert.equal(lexer.getNextToken(), 'Token(INTEGER, 7890)');
    assert.equal(lexer.getNextToken(), 'Token(EOF, null)');
  });

  it('Should properly return a stream of tokens for an expression with parenthesis', () => {
    const lexer = new Lexer('(1 + 2) * 3');

    assert.equal(lexer.getNextToken(), 'Token(LEFT_PARENTHESIS, ()');
    assert.equal(lexer.getNextToken(), 'Token(INTEGER, 1)');
    assert.equal(lexer.getNextToken(), 'Token(PLUS, +)');
    assert.equal(lexer.getNextToken(), 'Token(INTEGER, 2)');
    assert.equal(lexer.getNextToken(), 'Token(RIGHT_PARENTHESIS, ))');
    assert.equal(lexer.getNextToken(), 'Token(ASTERISK, *)');
    assert.equal(lexer.getNextToken(), 'Token(INTEGER, 3)');
    assert.equal(lexer.getNextToken(), 'Token(EOF, null)');
  });

  it('Should properly throw an error if unknown character', () => {
    const lexer = new Lexer('~');

    assert.throws(() => lexer.getNextToken(), `Unexpected character: ~`);
  });
});
