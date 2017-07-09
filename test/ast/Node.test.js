const {assert} = require('chai');
const Token = require('../../src/lexer/Token');
const Node = require('../../src/ast/Node');

const TOKEN = Token.create(Token.INTEGER_LITERAL, 200);

describe('AST::Node', () => {
  it('Should properly instantiate', () => {
    const node = new Node(TOKEN);

    assert.instanceOf(node, Node);
    assert.instanceOf(node.token, Token);
  });

  it('Should properly return a token from node', () => {
    const node = new Node(TOKEN);

    assert.instanceOf(node.getToken(), Token);
    assert.ok(node.getToken().is(Token.INTEGER_LITERAL));
    assert.equal(node.getToken().getType(), Token.INTEGER_LITERAL);
    assert.equal(node.getToken().getType(), 'INTEGER_LITERAL');
    assert.equal(node.getToken().getValue(), 200);
  });

  it('Should properly instantiate from static create', () => {
    const node = Node.create(TOKEN);

    assert.instanceOf(node, Node);
    assert.instanceOf(node.token, Token);
  });
});
