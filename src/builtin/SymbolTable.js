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
   * @example
   * const table = SymbolTable.create();
   * const symbol = VariableSymbol.create();
   *
   * table.define(symbol);
   */
  constructor() {
    this.symbols = new Map();

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
   * @returns {Symbol}
   */
  lookup(name) {
    return this.symbols.get(name);
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

    return `Symbols:\n${entries}`;
  }

  /**
   * Static helper for creating new SymbolTable instance.
   *
   * @static
   * @returns {SymbolTable}
   */
  static create() {
    return new this();
  }
}

module.exports = SymbolTable;
