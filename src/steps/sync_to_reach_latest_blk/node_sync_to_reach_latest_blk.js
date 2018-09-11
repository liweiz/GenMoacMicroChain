const sync = require('./sync_to_reach_latest_blk');

const nodeSync = rawNode => {
  /**
   * launch a vnode
   *
   * @param {object} ctx
   */
  const sideWork = async ctx => {
    try {
      await sync(ctx);
    } catch (err) {
      throw err;
    }
  };

  rawNode.sideWorkDescription = 'ensure node is synced with chain';
  rawNode.setSideWork(sideWork);

  return rawNode;
};

module.exports = nodeSync;
