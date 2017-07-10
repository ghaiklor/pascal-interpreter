const {assert} = require('chai');
const SymbolTable = require('../../src/builtin/SymbolTable');
const TypeSymbol = require('../../src/builtin/TypeSymbol');
const VariableSymbol = require('../../src/builtin/VariableSymbol');

describe('Builtin::SymbolTable', () => {
  it('Should properly instantiate', () => {
    const table = SymbolTable.create();

    assert.instanceOf(table, SymbolTable);
    assert.instanceOf(table.symbols, Map);
  });

  it('Should properly define a symbol', () => {
    const table = SymbolTable.create();
    const typeSymbol = TypeSymbol.create('INTEGER');
    const variableSymbol = VariableSymbol.create('x', typeSymbol);

    assert.instanceOf(table, SymbolTable);
    assert.instanceOf(table.symbols, Map);
    assert.equal(table.symbols.size, 0);
    assert.instanceOf(table.define(typeSymbol), SymbolTable);
    assert.equal(table.symbols.size, 1);
    assert.instanceOf(table.define(variableSymbol), SymbolTable);
    assert.equal(table.symbols.size, 2);
  });

  it('Should properly lookup a symbol', () => {
    const table = SymbolTable.create();
    const typeSymbol = TypeSymbol.create('INTEGER');
    const variableSymbol = VariableSymbol.create('x', typeSymbol);

    assert.instanceOf(table, SymbolTable);
    assert.instanceOf(table.symbols, Map);
    assert.equal(table.symbols.size, 0);
    assert.instanceOf(table.define(typeSymbol), SymbolTable);
    assert.equal(table.symbols.size, 1);
    assert.instanceOf(table.define(variableSymbol), SymbolTable);
    assert.equal(table.symbols.size, 2);
    assert.instanceOf(table.lookup('INTEGER'), TypeSymbol);
    assert.instanceOf(table.lookup('x'), VariableSymbol);
    assert.isUndefined(table.lookup('y'));
  });

  it('Should properly converts into string representation', () => {
    const table = SymbolTable.create();
    const typeSymbol = TypeSymbol.create('INTEGER');
    const variableSymbol = VariableSymbol.create('x', typeSymbol);

    assert.instanceOf(table, SymbolTable);
    assert.instanceOf(table.define(typeSymbol), SymbolTable);
    assert.instanceOf(table.define(variableSymbol), SymbolTable);
    assert.equal(table.toString(), 'Symbols:\nINTEGER:TypeSymbol(INTEGER)\nx:VariableSymbol(x, TypeSymbol(INTEGER))\n');
  });
});
