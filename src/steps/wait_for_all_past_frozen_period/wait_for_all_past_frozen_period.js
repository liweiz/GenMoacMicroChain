const watchTillBlkNo = require('../../vnode/blk_watch/blk_watcher_till_blk');
const logger = require('../../util/logger');

const waitPastFrozen = async (
  scsids,
  chain3Instance,
  subChainProtocolBaseContract
) => {
  try {
    for (let i = 0; i < scsids.length; i += 1) {
      const scsid = scsids[i];
      logger.info(`scsList for, ${scsid}`);
      const scsListElem = await subChainProtocolBaseContract.scsList(scsid);
      logger.info(`scsList , ${scsid}, ${scsListElem}`);
      if (scsListElem) {
        await watchTillBlkNo(
          chain3Instance,
          blk => blk.number,
          blkNumber => {
            logger.info(
              `block num #${blkNumber}, expected #${Number(scsListElem[3])}`
            );
            return blkNumber >= Number(scsListElem[3]);
          }
        );
      } else {
        // TO DO
      }
    }
  } catch (err) {
    throw err;
  }
};

module.exports = waitPastFrozen;
