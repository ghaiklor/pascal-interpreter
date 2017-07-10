const {assert} = require('chai');
const TypeSymbol = require('../../src/builtin/TypeSymbol');

describe('Builtin::TypeSymbol', () => {
  it('Should properly instantiate', () => {
    const symbol = TypeSymbol.create('INTEGER');

    assert.instanceOf(symbol, TypeSymbol);
    assert.isString(symbol.name);
    assert.isNull(symbol.type);
  });

  it('Should properly converts to string representation', () => {
    const symbol = TypeSymbol.create('REAL');

    assert.instanceOf(symbol, TypeSymbol);
    assert.equal(symbol, 'TypeSymbol(REAL)');
  });
});
