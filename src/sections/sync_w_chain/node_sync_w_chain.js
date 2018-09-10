const nodeSyncToLatest = require('../../steps/sync_to_reach_latest_blk/node_sync_to_reach_latest_blk');
const genRawNode = require('../../util/operation_tree/operation_tree_node');

const nodeScsPool = rawNode => {
  rawNode.genKids = ctx => {
    if (!ctx.state.vnode.ignore_sync) {
      rawNode.kids.push(nodeSyncToLatest(genRawNode(rawNode)));
    }
  };

  rawNode.sideWorkDescription = 'figure out whether to ignore sync or not';

  return rawNode;
};

module.exports = nodeScsPool;
