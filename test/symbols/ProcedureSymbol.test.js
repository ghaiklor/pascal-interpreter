const {assert} = require('chai');
const ProcedureSymbol = require('../../src/symbols/ProcedureSymbol');

describe('Symbols::ProcedureSymbol', () => {
  it('Should properly instantiate', () => {
    const symbol = ProcedureSymbol.create('foo');

    assert.instanceOf(symbol, ProcedureSymbol);
    assert.equal(symbol.name, 'foo');
    assert.isArray(symbol.params);
  });

  it('Should properly return params', () => {
    const symbol = ProcedureSymbol.create('foo', []);

    assert.instanceOf(symbol, ProcedureSymbol);
    assert.isArray(symbol.getParams());
  });

  it('Should properly convert into string representation', () => {
    const symbol = ProcedureSymbol.create('foo', [1, 2]);

    assert.equal(symbol, 'ProcedureSymbol(foo, 1,2)');
  });
});
