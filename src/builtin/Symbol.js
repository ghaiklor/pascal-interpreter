/**
 * Base class for representing symbols in our program.
 *
 * @class
 * @since 1.0.0
 */
class Symbol {
  /**
   * Creates new Symbol instance.
   * Symbol instance has its name and an assigned type symbol.
   * Category of a symbol encoded in its class name itself.
   *
   * @param {String} name
   * @param {TypeSymbol} [type=null]
   */
  constructor(name, type = null) {
    this.name = name;
    this.type = type;
  }

  /**
   * Get a name of the symbol.
   *
   * @returns {String}
   */
  getName() {
    return this.name;
  }

  /**
   * Get a type of this symbol.
   *
   * @returns {TypeSymbol}
   */
  getType() {
    return this.type;
  }

  /**
   * Helper for converting Symbol into string representation.
   *
   * @returns {String}
   */
  toString() {
    return `Symbol(${this.getName()}, ${this.getType()})`;
  }

  /**
   * Static helper for creating new Symbol instance.
   *
   * @static
   * @param {String} name
   * @param {TypeSymbol} [type=null]
   * @returns {Symbol}
   */
  static create(name, type) {
    return new this(name, type);
  }
}

module.exports = Symbol;
