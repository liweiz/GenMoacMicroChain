const watchBlk = require('../../vnode/blk_watch/blk_watcher_till_blk');

const sideWork = async ctx => {
  try {
    await watchBlk(
      ctx.vnode.chain3,
      blk => blk.number,
      blkNumber => {
        console.log(
          `expecting block num #${
            ctx.state.blk_num_scs_changed_to_enabled
          }, now #${blkNumber}`
        );
        return blkNumber > ctx.state.blk_num_scs_changed_to_enabled;
      }
    );
  } catch (err) {
    throw err;
  }
};

const waitForBlkNum = rawNode => {
  rawNode.sideWorkDescription =
    'wait for the block number to enable SCS node connection';
  rawNode.setSideWork(sideWork);
  return rawNode;
};

module.exports = waitForBlkNum;
