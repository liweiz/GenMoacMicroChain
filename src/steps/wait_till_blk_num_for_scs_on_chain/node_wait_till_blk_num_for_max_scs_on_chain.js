const watchBlk = require('../../vnode/blk_watch/blk_watcher_till_blk');

const sideWork = async ctx => {
  try {
    await watchBlk(
      ctx.vnode.chain3,
      blk => blk.number,
      blkNumber => {
        const expectedNum =
          ctx.subChain_base.blk_no_register_open +
          ctx.state.subChain_base.num_of_blk_to_wait_for.min_nodes +
          ctx.state.subChain_base.num_of_blk_to_wait_for
            .max_nodes_after_min_met;
        console.log(`block num #${blkNumber}, expected #${expectedNum}`);
        return blkNumber >= expectedNum;
      }
    );
    const numScsIn = Number(ctx.subChain_base.instance.nodeCount());
    console.log(
      `enough scs nodes registered to form required micro-chain, got ${numScsIn}, required range: ${
        ctx.state.subChain_base.min_num_nodes
      } - ${ctx.state.subChain_base.max_num_nodes}`
    );
  } catch (err) {
    throw err;
  }
};

const waitForBlkNum = rawNode => {
  rawNode.sideWorkDescription =
    'wait for the block number to fullfil max number of scs nodes requiremnet';
  rawNode.setSideWork(sideWork);
  return rawNode;
};

module.exports = waitForBlkNum;
