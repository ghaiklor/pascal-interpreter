const {assert} = require('chai');
const VariableSymbol = require('../../src/symbols/VariableSymbol');
const TypeSymbol = require('../../src/symbols/TypeSymbol');

describe('Symbols::VariableSymbol', () => {
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
