const watchBlk = require('../../vnode/blk_watch/blk_watcher_till_blk');

const sideWork = async ctx => {
  try {
    await watchBlk(
      ctx.vnode.chain3,
      blk => blk.number,
      blkNumber => {
        if (ctx.subChain_base.blk_no_register_open === 0) {
          ctx.subChain_base.blk_no_register_open = blkNumber;
        }
        const expectedNum =
          ctx.subChain_base.blk_no_register_open +
          ctx.state.subChain_base.num_of_blk_to_wait_for.min_nodes;
        console.log(`block num #${blkNumber}, expected #${expectedNum}`);
        return blkNumber >= expectedNum;
      }
    );
    const numScsIn = Number(ctx.subChain_base.instance.nodeCount());
    if (numScsIn < ctx.state.subChain_base.min_num_nodes) {
      throw Error(
        `not enough scs nodes registered to form required micro-chain, min number: ${
          ctx.state.subChain_base.min_num_nodes
        }, got ${numScsIn}`
      );
    }
  } catch (err) {
    throw err;
  }
};

const waitForBlkNum = rawNode => {
  rawNode.sideWorkDescription =
    'wait for the block number to fullfil min number of scs nodes requiremnet';
  rawNode.setSideWork(sideWork);
  return rawNode;
};

module.exports = waitForBlkNum;
