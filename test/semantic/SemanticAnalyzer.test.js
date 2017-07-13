const {assert} = require('chai');
const SemanticAnalyzer = require('../../src/semantic/SemanticAnalyzer');
const Parser = require('../../src/parser');

describe('Semantic::SemanticAnalyzer', () => {
  it('Should properly throw error if variable is not resolved', () => {
    const program = `
      PROGRAM main; 
      VAR x: INTEGER; 
      BEGIN 
        x:= y; 
      END.
      `;
    const ast = new Parser(program).parse();
    const analyzer = new SemanticAnalyzer();

    assert.throws(() => analyzer.visit(ast), Error, 'Variable y is not resolved');
  });

  it('Should properly throw error if duplicate variable declaration', () => {
    const program = `
      PROGRAM main; 
      VAR x: INTEGER;
          x: REAL;
      BEGIN 
        x:= y; 
      END.
      `;
    const ast = new Parser(program).parse();
    const analyzer = new SemanticAnalyzer();

    assert.throws(() => analyzer.visit(ast), Error, 'Duplicate declaration of x');
  });

  it('Should properly create two symbol tables', () => {
    const program = `
      PROGRAM main;
        VAR x, y: REAL;
          
        PROCEDURE Alpha(a: INTEGER);
          VAR y: INTEGER;
        BEGIN
        END;
      
      BEGIN
      END.
    `;

    const ast = new Parser(program).parse();
    const analyzer = new SemanticAnalyzer();

    analyzer.visit(ast);

    assert.equal(analyzer.scope.scopeLevel, 2);
    assert.equal(analyzer.scope.scopeName, 'Alpha');
  });
});
