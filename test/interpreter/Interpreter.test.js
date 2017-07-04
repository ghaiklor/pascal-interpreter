const {assert} = require('chai');
const Interpreter = require('../../src/interpreter');

describe('Interpreter', () => {
  it('Should properly instantiate', () => {
    const interpreter = new Interpreter('2 + 5');

    assert.instanceOf(interpreter, Interpreter);
  });
});
