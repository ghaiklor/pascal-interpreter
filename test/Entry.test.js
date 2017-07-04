const {assert} = require('chai');
const interpret = require('../src');

describe('Entry::Parser', () => {
  it('Should properly calculate plus operation', () => {
    assert.equal(interpret('2 + 5 + 3'), 10);
  });

  it('Should properly calculate minus operation', () => {
    assert.equal(interpret('2 - 5 + 10'), 7);
  });

  it('Should properly calculate multiplication operation', () => {
    assert.equal(interpret('2 * 5 * 10'), 100);
  });

  it('Should properly calculate division operation', () => {
    assert.equal(interpret('10 / 5 / 2'), 1);
  });

  it('Should properly calculate complex mathematical expression', () => {
    assert.equal(interpret('5 * 10 / 25 - 1 + 5'), 6);
  });

  it('Should properly calculate expressions with parenthesis', () => {
    assert.equal(interpret('5 * (15 + 5) / (20 - 10)'), 10);
  });
});
