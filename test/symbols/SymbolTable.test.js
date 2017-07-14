const {assert} = require('chai');
const SymbolTable = require('../../src/symbols/SymbolTable');
const TypeSymbol = require('../../src/symbols/TypeSymbol');
const VariableSymbol = require('../../src/symbols/VariableSymbol');

describe('Symbols::SymbolTable', () => {
  it('Should properly instantiate', () => {
    const table = SymbolTable.create('global', 1);

    assert.instanceOf(table, SymbolTable);
    assert.instanceOf(table.symbols, Map);
    assert.equal(table.symbols.size, 2);
    assert.instanceOf(table.symbols.get('INTEGER'), TypeSymbol);
    assert.instanceOf(table.symbols.get('REAL'), TypeSymbol);
    assert.equal(table.scopeName, 'global');
    assert.equal(table.scopeLevel, 1);
    assert.isNull(table.enclosingScope);
  });

  it('Should properly define a symbol', () => {
    const table = SymbolTable.create('global', 1);
    const typeSymbol = TypeSymbol.create('INTEGER');
    const variableSymbol = VariableSymbol.create('x', typeSymbol);

    assert.instanceOf(table, SymbolTable);
    assert.instanceOf(table.symbols, Map);
    assert.equal(table.symbols.size, 2);
    assert.instanceOf(table.define(typeSymbol), SymbolTable);
    assert.equal(table.symbols.size, 2);
    assert.instanceOf(table.define(variableSymbol), SymbolTable);
    assert.equal(table.symbols.size, 3);
  });

  it('Should properly lookup a symbol', () => {
    const table = SymbolTable.create('global', 1);
    const typeSymbol = TypeSymbol.create('INTEGER');
    const variableSymbol = VariableSymbol.create('x', typeSymbol);

    assert.instanceOf(table, SymbolTable);
    assert.instanceOf(table.symbols, Map);
    assert.equal(table.symbols.size, 2);
    assert.instanceOf(table.define(typeSymbol), SymbolTable);
    assert.equal(table.symbols.size, 2);
    assert.instanceOf(table.define(variableSymbol), SymbolTable);
    assert.equal(table.symbols.size, 3);
    assert.instanceOf(table.lookup('INTEGER'), TypeSymbol);
    assert.instanceOf(table.lookup('x'), VariableSymbol);
    assert.isUndefined(table.lookup('y'));
  });

  it('Should properly converts into string representation', () => {
    const table = SymbolTable.create('global', 1);

    assert.instanceOf(table, SymbolTable);
    assert.equal(table, `Scope Name: global\nScope Level: 1\n\nEntries\nINTEGER:TypeSymbol(INTEGER)\nREAL:TypeSymbol(REAL)\n`);
  });
});
