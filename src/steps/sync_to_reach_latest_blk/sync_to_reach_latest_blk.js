const logger = require('../../util/logger');

const syncToReachLatestBlk = chain3 =>
  new Promise((res, rej) => {
    chain3.mc.isSyncing((err, sync) => {
      if (!err) {
        if (sync === true) {
          logger.info(
            `start to sync, current block number, ${chain3.mc.blockNumber}`
          );
        } else if (sync === false) {
          logger.info(
            `sync stopped, current block number, ${chain3.mc.blockNumber}`
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

module.exports = syncToReachLatestBlk;
