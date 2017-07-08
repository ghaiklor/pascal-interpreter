const {assert} = require('chai');
const Interpreter = require('../../src/interpreter');

describe('Interpreter', () => {
  it('Should properly handle symbol table changes', () => {
    const program = `BEGIN x:= -2; y:= -x; z:=(x - y + +8) / 4 * -1 END.`;
    const interpreter = new Interpreter(program);

    interpreter.interpret();

    assert.deepEqual(process.GLOBAL_SCOPE, {x: -2, y: 2, z: -1});
  });
});
