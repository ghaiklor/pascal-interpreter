const {assert} = require('chai');
const Token = require('../../src/lexer/Token');
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
    assert.instanceOf(lexer.advance(), Lexer);
    assert.equal(lexer.input, '2 + 3');
    assert.equal(lexer.position, 2);
    assert.equal(lexer.currentChar, '+');
  });

  it('Should properly peek a character without modifying a pointer', () => {
    const lexer = new Lexer('2 + 3');

    assert.instanceOf(lexer, Lexer);
    assert.equal(lexer.input, '2 + 3');
    assert.equal(lexer.position, 0);
    assert.equal(lexer.currentChar, '2');
    assert.instanceOf(lexer.advance(), Lexer);
    assert.equal(lexer.input, '2 + 3');
    assert.equal(lexer.position, 1);
    assert.equal(lexer.currentChar, ' ');
    assert.equal(lexer.peek(), '+');
    assert.equal(lexer.input, '2 + 3');
    assert.equal(lexer.position, 1);
    assert.equal(lexer.currentChar, ' ');
    assert.instanceOf(lexer.advance(), Lexer);
    assert.equal(lexer.input, '2 + 3');
    assert.equal(lexer.position, 2);
    assert.equal(lexer.currentChar, '+');
    assert.instanceOf(lexer.advance(), Lexer);
    assert.equal(lexer.input, '2 + 3');
    assert.equal(lexer.position, 3);
    assert.equal(lexer.currentChar, ' ');
    assert.equal(lexer.peek(), '3');
    assert.equal(lexer.input, '2 + 3');
    assert.equal(lexer.position, 3);
    assert.equal(lexer.currentChar, ' ');
    assert.instanceOf(lexer.advance(), Lexer);
    assert.equal(lexer.input, '2 + 3');
    assert.equal(lexer.position, 4);
    assert.equal(lexer.currentChar, '3');
    assert.isNull(lexer.peek());
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
    assert.equal(lexer.input, '2    + 3');
    assert.equal(lexer.position, 1);
    assert.equal(lexer.currentChar, ' ');
    assert.instanceOf(lexer.skipWhitespace(), Lexer);
    assert.equal(lexer.input, '2    + 3');
    assert.equal(lexer.position, 5);
    assert.equal(lexer.currentChar, '+');
    assert.instanceOf(lexer.advance(), Lexer);
    assert.equal(lexer.input, '2    + 3');
    assert.equal(lexer.position, 6);
    assert.equal(lexer.currentChar, ' ');
    assert.instanceOf(lexer.skipWhitespace(), Lexer);
    assert.equal(lexer.input, '2    + 3');
    assert.equal(lexer.position, 7);
    assert.equal(lexer.currentChar, '3');
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
    assert.instanceOf(lexer.advance(), Lexer);
    assert.instanceOf(lexer.advance(), Lexer);
    assert.instanceOf(lexer.advance(), Lexer);
    assert.equal(lexer.input, '256 + 3');
    assert.equal(lexer.position, 6);
    assert.equal(lexer.currentChar, '3');
    assert.equal(lexer.integer(), 3);
  });

  it('Should properly parse an identifier from an input', () => {
    const lexer = new Lexer('BEGIN x y z END');

    assert.instanceOf(lexer, Lexer);

    const begin = lexer.identifier();
    assert.instanceOf(begin, Token);
    assert.ok(begin.is(Token.BEGIN));
    assert.equal(begin.getType(), 'BEGIN');
    assert.equal(begin.getValue(), 'BEGIN');
    assert.instanceOf(lexer.advance(), Lexer);

    const x = lexer.identifier();
    assert.instanceOf(x, Token);
    assert.ok(x.is(Token.IDENTIFIER));
    assert.equal(x.getType(), 'IDENTIFIER');
    assert.equal(x.getValue(), 'x');
    assert.instanceOf(lexer.advance(), Lexer);

    const y = lexer.identifier();
    assert.instanceOf(y, Token);
    assert.ok(y.is(Token.IDENTIFIER));
    assert.equal(y.getType(), 'IDENTIFIER');
    assert.equal(y.getValue(), 'y');
    assert.instanceOf(lexer.advance(), Lexer);

    const z = lexer.identifier();
    assert.instanceOf(z, Token);
    assert.ok(z.is(Token.IDENTIFIER));
    assert.equal(z.getType(), 'IDENTIFIER');
    assert.equal(z.getValue(), 'z');
    assert.instanceOf(lexer.advance(), Lexer);

    const end = lexer.identifier();
    assert.instanceOf(end, Token);
    assert.ok(end.is(Token.END));
    assert.equal(end.getType(), 'END');
    assert.equal(end.getValue(), 'END');
  });

  it('Should properly return a stream of tokens for +, -, *, /', () => {
    const lexer = new Lexer('+ - * /');

    assert.equal(lexer.getNextToken(), 'Token(PLUS, +)');
    assert.equal(lexer.getNextToken(), 'Token(MINUS, -)');
    assert.equal(lexer.getNextToken(), 'Token(ASTERISK, *)');
    assert.equal(lexer.getNextToken(), 'Token(SLASH, /)');
    assert.equal(lexer.getNextToken(), 'Token(EOF, null)');
    assert.equal(lexer.getNextToken(), 'Token(EOF, null)');
  });

  it('Should properly return a stream of tokens for integers', () => {
    const lexer = new Lexer('123 456 7890');

    assert.equal(lexer.getNextToken(), 'Token(INTEGER, 123)');
    assert.equal(lexer.getNextToken(), 'Token(INTEGER, 456)');
    assert.equal(lexer.getNextToken(), 'Token(INTEGER, 7890)');
    assert.equal(lexer.getNextToken(), 'Token(EOF, null)');
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
    assert.equal(lexer.getNextToken(), 'Token(EOF, null)');
  });

  it('Should properly return a stream of tokens for a Pascal program definition', () => {
    const lexer = new Lexer('BEGIN a := 2; END.');

    assert.equal(lexer.getNextToken(), 'Token(BEGIN, BEGIN)');
    assert.equal(lexer.getNextToken(), 'Token(IDENTIFIER, a)');
    assert.equal(lexer.getNextToken(), 'Token(ASSIGN, :=)');
    assert.equal(lexer.getNextToken(), 'Token(INTEGER, 2)');
    assert.equal(lexer.getNextToken(), 'Token(SEMICOLON, ;)');
    assert.equal(lexer.getNextToken(), 'Token(END, END)');
    assert.equal(lexer.getNextToken(), 'Token(DOT, .)');
    assert.equal(lexer.getNextToken(), 'Token(EOF, null)');
  });

  it('Should properly throw an error if unknown character', () => {
    const lexer = new Lexer('~');

    assert.throws(() => lexer.getNextToken(), `[Lexer]\nUnexpected character: ~`);
  });

  it('Should properly throw an error during analysis', () => {
    const lexer = new Lexer('2 + ~');

    assert.equal(lexer.getNextToken(), 'Token(INTEGER, 2)');
    assert.equal(lexer.getNextToken(), 'Token(PLUS, +)');
    assert.throws(() => lexer.getNextToken(), `[Lexer]\nUnexpected character: ~`);
  });

  it('Should properly return a dictionary of reserved words in a language', () => {
    assert.instanceOf(Lexer.RESERVED_WORDS.BEGIN, Token);
    assert.instanceOf(Lexer.RESERVED_WORDS.END, Token);
  });
});
