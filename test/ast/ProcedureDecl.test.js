const {assert} = require('chai');
const ProcedureDecl = require('../../src/ast/ProcedureDecl');
const Block = require('../../src/ast/Block');
const Param = require('../../src/ast/Param');

const PARAMS = [Param.create()];

describe('AST::ProcedureDecl', () => {
  it('Should properly instantiate', () => {
    const node = ProcedureDecl.create('proc', PARAMS, Block.create());

    assert.instanceOf(node, ProcedureDecl);
    assert.isString(node.name);
    assert.isArray(node.params);
    assert.instanceOf(node.params[0], Param);
    assert.instanceOf(node.block, Block);
  });

  it('Should properly get procedure name', () => {
    const node = ProcedureDecl.create('proc', PARAMS, Block.create());

    assert.instanceOf(node, ProcedureDecl);
    assert.equal(node.getName(), 'proc');
  });

  it('Should properly get params', () => {
    const node = ProcedureDecl.create('proc', PARAMS, Block.create());

    assert.instanceOf(node, ProcedureDecl);
    assert.isArray(node.getParams());
    assert.instanceOf(node.getParams()[0], Param);
  });

  it('Should properly get block of the procedure', () => {
    const node = ProcedureDecl.create('proc', PARAMS, Block.create());

    assert.instanceOf(node, ProcedureDecl);
    assert.instanceOf(node.getBlock(), Block);
  });
});
