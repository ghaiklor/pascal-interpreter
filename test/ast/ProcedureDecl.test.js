const {assert} = require('chai');
const ProcedureDecl = require('../../src/ast/ProcedureDecl');
const Block = require('../../src/ast/Block');

describe('AST::ProcedureDecl', () => {
  it('Should properly instantiate', () => {
    const node = ProcedureDecl.create('proc', Block.create());

    assert.instanceOf(node, ProcedureDecl);
    assert.isString(node.name);
    assert.instanceOf(node.block, Block);
  });

  it('Should properly get procedure name', () => {
    const node = ProcedureDecl.create('proc', Block.create());

    assert.instanceOf(node, ProcedureDecl);
    assert.equal(node.getName(), 'proc');
  });

  it('Should properly get block of the procedure', () => {
    const node = ProcedureDecl.create('proc', Block.create());

    assert.instanceOf(node, ProcedureDecl);
    assert.instanceOf(node.getBlock(), Block);
  });
});
