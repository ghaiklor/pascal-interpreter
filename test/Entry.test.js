const {assert} = require('chai');
const interpret = require('../src');

describe('Module::Entry', () => {
  it('Should properly interpret the simplest program', () => {
    process.GLOBAL_SCOPE = {};

    const program = `
      PROGRAM myProgram;
      VAR
        a, b : INTEGER;
        y    : REAL;

      BEGIN {myProgram}
        a := 2;
        b := 10 * a + 10 * a DIV 4;
        y := 20 / 7 + 3.14;
      END.  {myProgram}
    `;

    interpret(program);
    assert.deepEqual(process.GLOBAL_SCOPE, {a: 2, b: 25, y: 5.857142857142858});
  });
});
