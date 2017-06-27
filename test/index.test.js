const {assert} = require('chai');
const interpret = require('../src');

describe('Entry', () => {
  it('Should properly interpret the simplest expression', () => {
    assert.equal(interpret('2+1'), 3);
  });
});
