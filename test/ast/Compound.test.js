const {assert} = require('chai');
const Compound = require('../../src/ast/Compound');

describe('AST::Compound', () => {
  it('Should properly create instance of a Compound node', () => {
    const compound = Compound.create();

    assert.instanceOf(compound, Compound);
    assert.isArray(compound.children);
    assert.equal(compound.children.length, 0);
  });

  it('Should properly return its children', () => {
    const compound = Compound.create();

    assert.isArray(compound.getChildren());
    assert.equal(compound.getChildren().length, 0);
  });

  it('Should properly append new children into compound', () => {
    const compound = Compound.create();

    assert.isArray(compound.getChildren());
    assert.equal(compound.getChildren().length, 0);
    assert.instanceOf(compound.append(1), Compound);
    assert.equal(compound.getChildren().length, 1);
    assert.deepEqual(compound.getChildren(), [1]);
    assert.instanceOf(compound.append({}), Compound);
    assert.equal(compound.getChildren().length, 2);
    assert.deepEqual(compound.getChildren(), [1, {}]);
  });
});
