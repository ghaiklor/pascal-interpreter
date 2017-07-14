const TypeSymbol = require('./TypeSymbol');

/**
 * Symbol table for storing all the symbols in a program.
 *
 * @class
 * @since 1.0.0
 */
class SymbolTable {
  /**
   * Creates new empty symbol table.
   * Symbol tables are used for storing and tracking various symbols in source code.
   *
   * @param {String} scopeName
   * @param {Number} scopeLevel
   * @param {SymbolTable} [enclosingScope=null]
   * @example
   * const table = SymbolTable.create();
   * const symbol = VariableSymbol.create();
   *
   * table.define(symbol);
   */
  constructor(scopeName, scopeLevel, enclosingScope = null) {
    this.symbols = new Map();
    this.scopeName = scopeName;
    this.scopeLevel = scopeLevel;
    this.enclosingScope = enclosingScope;

    this.initBuiltin();
  }

  /**
   * Initialize the built-in types when the symbol table instance is created.
   *
   * @returns {SymbolTable}
   */
  initBuiltin() {
    this.define(TypeSymbol.create('INTEGER'));
    this.define(TypeSymbol.create('REAL'));

    return this;
  }

  /**
   * Defines a symbol into symbol table.
   *
   * @param {Symbol} symbol
   * @returns {SymbolTable}
   */
  define(symbol) {
    this.symbols.set(symbol.getName(), symbol);

    return this;
  }

  /**
   * Lookup for a symbol in symbol table by its name.
   *
   * @param {String} name
   * @param {Boolean} [currentScopeOnly=false]
   * @returns {Symbol}
   */
  lookup(name, currentScopeOnly = false) {
    const symbol = this.symbols.get(name);

    if (symbol) return symbol;
    if (currentScopeOnly) return null;
    if (this.enclosingScope) return this.enclosingScope.lookup(name);
  }

  /**
   * Prints all the defined symbols in the current symbol table.
   *
   * @returns {String}
   */
  toString() {
    let entries = '';

    for (const [key, value] of this.symbols.entries()) {
      entries += `${key}:${value}\n`;
    }

    return `Scope Name: ${this.scopeName}\nScope Level: ${this.scopeLevel}\n\nEntries\n${entries}`;
  }

  /**
   * Static helper for creating new SymbolTable instance.
   *
   * @static
   * @param {String} scopeName
   * @param {Number} scopeLevel
   * @param {SymbolTable} [enclosingScope=null]
   * @returns {SymbolTable}
   */
  static create(scopeName, scopeLevel, enclosingScope) {
    return new this(scopeName, scopeLevel, enclosingScope);
  }
}

module.exports = SymbolTable;
