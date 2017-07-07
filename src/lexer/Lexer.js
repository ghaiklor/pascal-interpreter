const Token = require('./Token');

/**
 * Lexer of a language.
 *
 * @class
 * @since 1.0.0
 */
class Lexer {
  /**
   * Creates a new instance of a lexer.
   * When instance created, you need to call {@link Lexer#getNextToken} for get a token.
   * Each time you call {@link Lexer#getNextToken} it returns next token from specified input.
   *
   * @param {String} input Source code of a program
   * @example
   * const lexer = new Lexer('2 + 5');
   */
  constructor(input) {
    this.input = input;
    this.position = 0;
    this.currentChar = this.input[this.position];
  }

  /**
   * Lexer has a pointer that specifies where we are located right now in input.
   * This method moves this pointer by one, incrementing its value.
   * Afterwards, it reads a new char at new pointer's location and stores in `currentChar`.
   * In case, pointer is out-of-range (end of input) it assigns `null` to `currentChar`.
   *
   * @returns {Lexer} Returns current instance of the lexer
   * @example
   * const lexer = new Lexer('2 + 5'); // position = 0, currentChar = '2'
   *
   * lexer
   *  .advance() // position = 1, currentChar = ' '
   *  .advance() // position = 2, currentChar = '+'
   *  .advance() // position = 3, currentChar = ' '
   *  .advance() // position = 4, currentChar = '5'
   *  .advance() // position = 5, currentChar = null
   *  .advance() // position = 6, currentChar = null
   */
  advance() {
    this.position += 1;

    if (this.position > this.input.length - 1) {
      this.currentChar = null;
    } else {
      this.currentChar = this.input[this.position];
    }

    return this;
  }

  /**
   * Peeks a following character from the input without modifying the pointer.
   * The difference here between {@link Lexer#advance} is that this method is pure.
   * It helps differentiate between different tokens that start with the same character.
   * I.e. ':' and ':=' are different tokens, but we can't say that for sure until we see the next char.
   *
   * @returns {String}
   * @example
   * const lexer = new Lexer('2 + 5'); // pointer = 0, currentChar = '2'
   *
   * lexer
   *  .peek() // pointer = 0, currentChar = '2', returns ' '
   *  .advance() // pointer = 1, currentChar = ' '
   *  .peek() // pointer = 1, currentChar = ' ', returns '+'
   */
  peek() {
    const position = this.position + 1;

    if (position > this.input.length - 1) return null;

    return this.input[position];
  }

  /**
   * Skips whitespaces in a source code.
   * While `currentChar` is a whitespace do {@link Lexer#advance}.
   * That way, we literally skips any char that doesn't make sense to us.
   *
   * @returns {Lexer} Returns current instance of the lexer
   */
  skipWhitespace() {
    while (this.currentChar && /\s/.test(this.currentChar)) {
      this.advance();
    }

    return this;
  }

  /**
   * Parses an integer from a source code.
   * While `currentChar` is a digit [0-9], add a char into the string stack.
   * Afterwards, when `currentChar` is not a digit anymore, parses an integer from the stack.
   *
   * @returns {Number}
   */
  integer() {
    let integer = '';

    while (this.currentChar && /\d/.test(this.currentChar)) {
      integer += this.currentChar;
      this.advance();
    }

    return parseInt(integer);
  }

  /**
   * Parses a sequence of alphanumeric characters and returns a token.
   * In case, the sequence is reserved word, it returns a predefined token for this word.
   * Otherwise, it returns an IDENTIFIER token.
   *
   * @returns {Token}
   * @example
   * const lexer = new Lexer('BEGIN x END');
   *
   * lexer.identifier(); // Token(BEGIN, BEGIN)
   * lexer.identifier(); // Token(IDENTIFIER, x)
   * lexer.identifier(); // Token(END, END)
   */
  identifier() {
    let identifier = '';

    while (this.currentChar && /[a-zA-Z0-9]/.test(this.currentChar)) {
      identifier += this.currentChar;
      this.advance();
    }

    return Lexer.RESERVED_WORDS[identifier] || Token.create(Token.IDENTIFIER, identifier);
  }

  /**
   * Returns a next token in a source program.
   * Each time it sees a match from the source program, it wraps info into a {@link Token}.
   * It means, that it doesn't return all the tokens at once.
   * You need to call this method each time, you need to get next token from the input program.
   *
   * @returns {Token}
   * @example
   * const lexer = new Lexer('2 + 5');
   *
   * lexer.getNextToken(); // Token(INTEGER, 2)
   * lexer.getNextToken(); // Token(PLUS, +)
   * lexer.getNextToken(); // Token(INTEGER, 5)
   * lexer.getNextToken(); // Token(EOF, null)
   * lexer.getNextToken(); // Token(EOF, null)
   */
  getNextToken() {
    while (this.currentChar) {
      if (/\s/.test(this.currentChar)) {
        this.skipWhitespace();
        continue;
      }

      if (/\d/.test(this.currentChar)) {
        return Token.create(Token.INTEGER, this.integer());
      }

      if (this.currentChar === '+') {
        this.advance();
        return Token.create(Token.PLUS, '+');
      }

      if (this.currentChar === '-') {
        this.advance();
        return Token.create(Token.MINUS, '-');
      }

      if (this.currentChar === '*') {
        this.advance();
        return Token.create(Token.ASTERISK, '*');
      }

      if (this.currentChar === '/') {
        this.advance();
        return Token.create(Token.SLASH, '/');
      }

      if (this.currentChar === '(') {
        this.advance();
        return Token.create(Token.LEFT_PARENTHESIS, '(');
      }

      if (this.currentChar === ')') {
        this.advance();
        return Token.create(Token.RIGHT_PARENTHESIS, ')');
      }

      Lexer.error(`Unexpected character: ${this.currentChar}`);
    }

    return Token.create(Token.EOF, null);
  }

  /**
   * Throws an error in a lexer context.
   *
   * @static
   * @param {String} msg An error message
   */
  static error(msg) {
    throw new Error(`[Lexer]\n${msg}`);
  }

  /**
   * Returns a dictionary of reserved words in this language.
   * In case, identifier exists in this dictionary, we need to return a token for this identifier.
   * Otherwise, we need to create a token IDENTIFIER and provide it with a name of identifier.
   *
   * @static
   * @returns {Object}
   */
  static get RESERVED_WORDS() {
    return {
      BEGIN: Token.create(Token.BEGIN, 'BEGIN'),
      END: Token.create(Token.END, 'END')
    }
  }
}

module.exports = Lexer;
