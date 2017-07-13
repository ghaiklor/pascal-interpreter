const Token = require('../lexer/Token');
const Lexer = require('../lexer');
const AST = require('../ast');

/**
 * Parser implementation for a language.
 * Converts stream of tokens into AST.
 *
 * @class
 * @since 1.0.0
 */
class Parser {
  /**
   * Creates new parser instance.
   * It accepts as an input source code of a program.
   * In result, it will parse it and return an AST of specified program.
   * As a dependency, it uses the lexer which returns stream of tokens.
   *
   * @param {String} input Source code of a program
   * @example
   * const parser = new Parser('2 + 5');
   */
  constructor(input) {
    this.lexer = new Lexer(input);
    this.currentToken = this.lexer.getNextToken();
  }

  /**
   * Consumes one specified token type.
   * In case, token type is not equal to the current one, it throws an error.
   * When you are consuming a token you are not expecting, it means broken syntax structure.
   *
   * @param {String} tokenType Token type from {@link Token} dictionary
   * @returns {Parser} Returns current parser instance
   * @example
   * const parser = new Parser('2 + 5'); // currentToken = INTEGER
   *
   * parser
   *  .eat(Token.INTEGER) // currentToken = PLUS
   *  .eat(Token.PLUS) // currentToken = INTEGER
   *  .eat(Token.PLUS) // throws an error, because currentToken = INTEGER
   */
  eat(tokenType) {
    if (this.currentToken.is(tokenType)) {
      this.currentToken = this.lexer.getNextToken();
    } else {
      Parser.error(`You provided unexpected token type "${tokenType}" while current token is ${this.currentToken}`);
    }

    return this;
  }

  /**
   * empty:
   *
   * @returns {NoOperation}
   */
  empty() {
    return AST.NoOperation.create();
  }

  /**
   * variable: IDENTIFIER
   *
   * @returns {Variable}
   */
  variable() {
    const node = AST.Variable.create(this.currentToken, this.currentToken.getValue());
    this.eat(Token.IDENTIFIER);
    return node;
  }

  /**
   * factor: PLUS factor
   *       | MINUS factor
   *       | INTEGER_LITERAL
   *       | REAL_LITERAL
   *       | LEFT_PARENTHESIS expr RIGHT_PARENTHESIS
   *       | variable
   *
   * @returns {Node}
   */
  factor() {
    const token = this.currentToken;

    if (token.is(Token.PLUS)) {
      this.eat(Token.PLUS);
      return AST.UnaryOperator.create(token, this.factor());
    } else if (token.is(Token.MINUS)) {
      this.eat(Token.MINUS);
      return AST.UnaryOperator.create(token, this.factor());
    } else if (token.is(Token.INTEGER_LITERAL)) {
      this.eat(Token.INTEGER_LITERAL);
      return AST.Number.create(token);
    } else if (token.is(Token.REAL_LITERAL)) {
      this.eat(Token.REAL_LITERAL);
      return AST.Number.create(token);
    } else if (token.is(Token.LEFT_PARENTHESIS)) {
      this.eat(Token.LEFT_PARENTHESIS);
      const node = this.expr();
      this.eat(Token.RIGHT_PARENTHESIS);
      return node;
    }

    return this.variable();
  }

  /**
   * term: factor ASTERISK term
   *     | factor SLASH term
   *     | factor REAL_DIV term
   *     | factor
   *
   * @returns {Node}
   */
  term() {
    let node = this.factor();

    while ([Token.ASTERISK, Token.SLASH, Token.INTEGER_DIV].some(type => this.currentToken.is(type))) {
      const token = this.currentToken;

      if (token.is(Token.ASTERISK)) {
        this.eat(Token.ASTERISK);
      } else if (token.is(Token.SLASH)) {
        this.eat(Token.SLASH);
      } else {
        this.eat(Token.INTEGER_DIV);
      }

      node = AST.BinaryOperator.create(node, token, this.factor());
    }

    return node;
  }

  /**
   * expr: term PLUS expr
   *     | term MINUS expr
   *     | term
   *
   * @returns {Node}
   */
  expr() {
    let node = this.term();

    while ([Token.PLUS, Token.MINUS].some(type => this.currentToken.is(type))) {
      const token = this.currentToken;

      if (token.is(Token.PLUS)) {
        this.eat(Token.PLUS);
      } else {
        this.eat(Token.MINUS);
      }

      node = AST.BinaryOperator.create(node, token, this.term());
    }

    return node;
  }

  /**
   * assignmentStatement: variable ASSIGN expr
   *
   * @returns {Assign}
   */
  assignmentStatement() {
    const variable = this.variable();
    const token = this.currentToken;
    this.eat(Token.ASSIGN);
    const expression = this.expr();

    return AST.Assign.create(variable, token, expression);
  }

  /**
   * compoundStatement: BEGIN statementList END
   *
   * @returns {Compound}
   */
  compoundStatement() {
    this.eat(Token.BEGIN);
    const nodes = this.statementList();
    this.eat(Token.END);

    const root = AST.Compound.create();
    nodes.forEach(node => root.append(node));

    return root;
  }

  /**
   * statement: compoundStatement
   *          | assignmentStatement
   *          | empty
   *
   * @returns {Node}
   */
  statement() {
    let node;

    if (this.currentToken.is(Token.BEGIN)) {
      node = this.compoundStatement();
    } else if (this.currentToken.is(Token.IDENTIFIER)) {
      node = this.assignmentStatement();
    } else {
      node = this.empty();
    }

    return node;
  }

  /**
   * statementList: statement
   *              | statement SEMICOLON statementList
   *
   * @returns {Array<Node>}
   */
  statementList() {
    const node = this.statement();
    const nodes = [node];

    while (this.currentToken.is(Token.SEMICOLON)) {
      this.eat(Token.SEMICOLON);
      nodes.push(this.statement());
    }

    if (this.currentToken.is(Token.IDENTIFIER)) {
      Parser.error(`Unexpected identifier in "statementList" production: ${this.currentToken}`);
    }

    return nodes;
  }

  /**
   * typeSpec: INTEGER_TYPE
   *         | REAL_TYPE
   *
   * @returns {Type}
   */
  typeSpec() {
    const token = this.currentToken;

    if (token.is(Token.INTEGER_TYPE)) {
      this.eat(Token.INTEGER_TYPE);
    } else {
      this.eat(Token.REAL_TYPE);
    }

    return AST.Type.create(token);
  }

  /**
   * variableDeclaration: IDENTIFIER (COMMA IDENTIFIER)* COLON typeSpec
   *
   * @returns {Array<VarDecl>}
   */
  variableDeclaration() {
    const varNodes = [AST.Variable.create(this.currentToken, this.currentToken.getValue())];
    this.eat(Token.IDENTIFIER);

    while (this.currentToken.is(Token.COMMA)) {
      this.eat(Token.COMMA);
      varNodes.push(AST.Variable.create(this.currentToken, this.currentToken.getValue()));
      this.eat(Token.IDENTIFIER);
    }

    this.eat(Token.COLON);

    const typeNode = this.typeSpec();

    return varNodes.map(node => AST.VarDecl.create(node, typeNode));
  }

  /**
   * formalParameters: ID (COMMA ID)* COLON type_spec
   *
   * @returns {Array<Param>}
   */
  formalParameters() {
    const varNodes = [AST.Variable.create(this.currentToken, this.currentToken.getValue())];
    this.eat(Token.IDENTIFIER);

    while (this.currentToken.is(Token.COMMA)) {
      this.eat(Token.COMMA);
      varNodes.push(AST.Variable.create(this.currentToken, this.currentToken.getValue()));
      this.eat(Token.IDENTIFIER);
    }

    this.eat(Token.COLON);

    const typeNode = this.typeSpec();

    return varNodes.map(varNode => AST.Param.create(varNode, typeNode));
  }

  /**
   * formalParameterList: formalParameters
   *                    | formalParameters SEMICOLON formalParameterList
   *
   * @returns {Array<Param>}
   */
  formalParameterList() {
    let params = this.formalParameters();

    while (this.currentToken.is(Token.SEMICOLON)) {
      this.eat(Token.SEMICOLON);
      params = params.concat(this.formalParameters());
    }

    return params;
  }

  /**
   * declarations: VAR (variableDeclaration SEMICOLON)+
   *             | (PROCEDURE ID (LPAREN formalParameterList RPAREN)? SEMICOLON block SEMICOLON)*
   *             | empty
   *
   * @returns {Array}
   */
  declarations() {
    let declarations = [];
    let params = [];

    if (this.currentToken.is(Token.VAR)) {
      this.eat(Token.VAR);

      while (this.currentToken.is(Token.IDENTIFIER)) {
        const varDecl = this.variableDeclaration();
        declarations = declarations.concat(varDecl);
        this.eat(Token.SEMICOLON);
      }
    }

    while (this.currentToken.is(Token.PROCEDURE)) {
      this.eat(Token.PROCEDURE);

      const procedureName = this.currentToken.getValue();
      this.eat(Token.IDENTIFIER);

      if (this.currentToken.is(Token.LEFT_PARENTHESIS)) {
        this.eat(Token.LEFT_PARENTHESIS);
        params = this.formalParameterList();
        this.eat(Token.RIGHT_PARENTHESIS);
      }

      this.eat(Token.SEMICOLON);
      const blockNode = this.block();
      this.eat(Token.SEMICOLON);

      const procedureNode = AST.ProcedureDecl.create(procedureName, params, blockNode);
      declarations.push(procedureNode);
    }

    return declarations;
  }

  /**
   * block: declarations compoundStatement
   *
   * @returns {Block}
   */
  block() {
    const declarations = this.declarations();
    const compoundStatement = this.compoundStatement();

    return AST.Block.create(declarations, compoundStatement);
  }

  /**
   * program: PROGRAM variable SEMICOLON block DOT
   *
   * @returns {Node}
   */
  program() {
    this.eat(Token.PROGRAM);

    const variableNode = this.variable();
    const programName = variableNode.getName();

    this.eat(Token.SEMICOLON);

    const blockNode = this.block();
    const programNode = AST.Program.create(programName, blockNode);
    this.eat(Token.DOT);

    return programNode;
  }

  /**
   * Parses an input source program and returns an AST.
   * It uses all the grammar rules above to parse tokens and build AST from it.
   *
   * @returns {Node}
   * @example
   * const parser = new Parser('BEGIN END.');
   *
   * parser.parse(); // return an object that represents an AST of source program
   */
  parse() {
    return this.program();
  }

  /**
   * Static helper for notifying about an error, during parsing.
   *
   * @static
   * @param {String} msg Error message
   */
  static error(msg) {
    throw new Error(`[Parser]\n${msg}`);
  }
}

module.exports = Parser;
