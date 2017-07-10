const {assert} = require('chai');
const Symbol = require('../../src/builtin/Symbol');

describe('Builtin::Symbol', () => {
  it('Should properly instantiate', () => {
    const symbol = Symbol.create('INTEGER');

    assert.isString(symbol.name);
    assert.isNull(symbol.type);
  });

  it('Should properly get name of a symbol', () => {
    const symbol = Symbol.create('INTEGER');

    assert.isString(symbol.name);
    assert.isNull(symbol.type);
    assert.equal(symbol.getName(), 'INTEGER');
  });

  it('Should properly get type of a symbol', () => {
    const symbol = Symbol.create('INTEGER', 'TYPE');

    assert.isString(symbol.name);
    assert.isString(symbol.type);
    assert.equal(symbol.getType(), 'TYPE');
  });

  it('Should properly convert to string representation', () => {
    const symbol = Symbol.create('INTEGER', 'TYPE');

    assert.isString(symbol.name);
    assert.isString(symbol.type);
    assert.equal(symbol, 'Symbol(INTEGER, TYPE)');
  });
});
