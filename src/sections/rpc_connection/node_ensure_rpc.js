const nodeToStartVnode = require('../../steps/vnode_w_rpc/node_start_vnode');
const nodeToReachRpc = require('../../steps/rpc_connector/node_rpc_connector');
const genRawNode = require('../../util/operation_tree/operation_tree_node');

/**
 * @typedef Context
 * @property {object} state - same data structure as process_state.json
 */

const nodeEnsureRpc = rawNode => {
  rawNode.genKids = ctx => {
    if (ctx.state.vnode.start_vnode_via_process) {
      // node starting existing vnode
      const nodeOfVnodeStart = nodeToStartVnode(genRawNode(rawNode));
      rawNode.kids.push(nodeOfVnodeStart);
    }
    const nodeOfRpcReached = nodeToReachRpc(genRawNode(rawNode));
    rawNode.kids.push(nodeOfRpcReached);
  };

  rawNode.sideWorkDescription = 'ensure a connected RPC is available';

  return rawNode;
};

module.exports = nodeEnsureRpc;
