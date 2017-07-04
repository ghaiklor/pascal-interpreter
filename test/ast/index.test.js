const {assert} = require('chai');
const AST = require('../../src/ast');

describe('AST::EntryPoint', () => {
  it('Should properly export all the nodes', () => {
    assert.isFunction(AST.BinaryOperator);
    assert.isFunction(AST.Node);
    assert.isFunction(AST.Number);
  });
});
