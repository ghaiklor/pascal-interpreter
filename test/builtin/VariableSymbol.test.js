const {assert} = require('chai');
const VariableSymbol = require('../../src/builtin/VariableSymbol');
const TypeSymbol = require('../../src/builtin/TypeSymbol');

describe('Builtin::VariableSymbol', () => {
  it('Should properly instantiate', () => {
    const symbol = VariableSymbol.create('x', TypeSymbol.create('INTEGER'));

    assert.isString(symbol.name);
    assert.instanceOf(symbol.type, TypeSymbol);
  });

  it('Should properly convert into string representation', () => {
    const symbol = VariableSymbol.create('x', TypeSymbol.create('INTEGER'));

    assert.isString(symbol.name);
    assert.instanceOf(symbol.type, TypeSymbol);
    assert.equal(symbol, 'VariableSymbol(x, TypeSymbol(INTEGER))');
  });
});
