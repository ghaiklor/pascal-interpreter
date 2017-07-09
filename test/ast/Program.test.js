const {assert} = require('chai');
const Program = require('../../src/ast/Program');
const Block = require('../../src/ast/Block');

describe('AST::Program', () => {
  it('Should properly instantiate', () => {
    const program = Program.create('name', Block.create());

    assert.instanceOf(program, Program);
    assert.isString(program.name);
    assert.instanceOf(program.block, Block);
  });

  it('Should properly get name of a program', () => {
    const program = Program.create('name', Block.create());

    assert.equal(program.getName(), 'name');
  });

  it('Should properly get block of a program', () => {
    const program = Program.create('name', Block.create());

    assert.instanceOf(program.getBlock(), Block);
  });
});
