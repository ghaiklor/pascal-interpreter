const {assert} = require('chai');
const interpret = require('../src');

describe('Module::Entry', () => {
  it('Should properly interpret the simplest program', () => {
    process.GLOBAL_SCOPE = {};

    const program = `
    BEGIN
      BEGIN
        number := 2;
        a := number;
        b := 10 * a + 10 * number / 4;
        c := a - - b;
      END;
      
      x := 11;
    END.`;

    interpret(program);
    assert.deepEqual(process.GLOBAL_SCOPE, {a: 2, x: 11, c: 27, b: 25, number: 2});
  });
});
