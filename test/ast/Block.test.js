const {assert} = require('chai');
const Block = require('../../src/ast/Block');
const Compound = require('../../src/ast/Compound');

describe('AST::Block', () => {
  it('Should properly instantiate', () => {
    const block = Block.create([], Compound.create());

    assert.isArray(block.declarations);
    assert.instanceOf(block.compound, Compound);
  });

  it('Should properly return declarations', () => {
    const block = Block.create([], Compound.create());

    assert.isArray(block.getDeclarations());
  });

  it('Should properly return compound', () => {
    const block = Block.create([], Compound.create());

    assert.instanceOf(block.getCompound(), Compound);
  });
});
