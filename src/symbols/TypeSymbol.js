const Symbol = require('./Symbol');

/**
 * Symbol for representing type symbols in a program.
 *
 * @class
 * @since 1.0.0
 */
class TypeSymbol extends Symbol {
  /**
   * Helper for representing this type symbol as a string.
   *
   * @returns {String}
   */
  toString() {
    return `TypeSymbol(${this.getName()})`;
  }

  /**
   * Static helper for creating new TypeSymbol.
   *
   * @static
   * @param {String} name
   * @returns {TypeSymbol}
   */
  static create(name) {
    return new this(name);
  }
}

module.exports = TypeSymbol;
