const nodeCallRegisterFunc = require('../../steps/call_contract_method/node_call_register');
const genRawNode = require('../../util/operation_tree/operation_tree_node');

const nodeScsPool = rawNode => {
  rawNode.genKids = () => {
    rawNode.kids.push(nodeCallRegisterFunc(genRawNode(rawNode)));
  };

  rawNode.sideWorkDescription = 'register vnode to VnodeProtocolBase';

  return rawNode;
};

module.exports = nodeScsPool;
