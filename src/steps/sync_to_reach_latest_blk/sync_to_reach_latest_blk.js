const logger = require('../../util/logger');
const sleep = require('../../util/sleep');

const syncToReachLatestBlk = async ctx => {
  await sleep(ctx.state.interval_between_rpc_calls_ms);
  if (ctx.vnode.chain3.mc.isSyncing !== false) {
    await sleep(ctx.state.interval_between_rpc_calls_ms);
    await new Promise((res, rej) => {
      ctx.vnode.chain3.mc.isSyncing((err, sync) => {
        if (!err) {
          if (sync === true) {
            logger.info(
              `start to sync, current block number, ${
                ctx.vnode.chain3.mc.blockNumber
              }`
            );
          } else if (sync === false) {
            logger.info(
              `sync stopped, current block number, ${
                ctx.vnode.chain3.mc.blockNumber
              }`
            );
            res();
          } else {
            logger.info(
              `${sync.highestBlock - sync.currentBlock} blocks to sync`
            );
          }
        } else {
          rej(err);
        }
      });
    });
  }
};

module.exports = syncToReachLatestBlk;
