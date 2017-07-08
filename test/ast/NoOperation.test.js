const {assert} = require('chai');
const NoOperation = require('../../src/ast/NoOperation');

describe('AST::NoOperation', () => {
  it('Should properly create node', () => {
    const noop = NoOperation.create();

    assert.instanceOf(noop, NoOperation);
    assert.isNull(noop.getToken());
  })
});
