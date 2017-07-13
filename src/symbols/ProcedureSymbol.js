const Symbol = require('./Symbol');

/**
 * A symbol for procedure units in a program.
 *
 * @class
 * @since 1.0.0
 */
class ProcedureSymbol extends Symbol {
  /**
   * Creates new procedure symbol instance.
   *
   * @param {String} name
   * @param {Array} params
   */
  constructor(name, params = []) {
    super(name);

    this.params = params;
  }

  /**
   * Get params assigned to this procedure symbol.
   *
   * @return {Array}
   */
  getParams() {
    return this.params;
  }

  /**
   * Returns a string representation of a procedure symbol.
   *
   * @return {String}
   */
  toString() {
    return `ProcedureSymbol(${this.name}, ${this.params})`;
  }

  /**
   * Static helper for creating procedure symbol.
   *
   * @static
   * @param {String} name
   * @param {Array} params
   * @return {ProcedureSymbol}
   */
  static create(name, params) {
    return new this(name, params);
  }
}

module.exports = ProcedureSymbol;
