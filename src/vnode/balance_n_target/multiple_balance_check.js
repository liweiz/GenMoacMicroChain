const sleep = require('../../util/sleep');
const ctx = require('../../context/process_ctx_proxy');
const getBalance = require('./get_balance_promise');
const logger = require('../../util/logger');

/**
 * @typedef AddrBalanceTarget
 * @property {string} addr
 * @property {number} balanceInMoac
 */

/**
 * Check if all given addresses meet their balance target
 *
 * @param {Chain3} chain3
 * @param {AddrBalanceTarget[]} checkList
 * @throws error from Chain3.mc.getBalance call
 * @returns {Promise<AddrBalanceTarget[]>}
 */
module.exports = async (chain3, checkList) => {
  // scsidsToFund: string[]
  const addrsToFund = [];
  for (let i = 0; i < checkList.length; i += 1) {
    const { addr, balanceInMoac: targetInMoac } = checkList[i];
    sleep(ctx.state.interval_between_rpc_calls_ms);
    try {
      const balanceInSha = await getBalance(chain3, addr);
      logger.info(
        `examing balance of address, ${addr}, in moac, ${balanceInSha /
          10 ** 18}`
      );
      if (balanceInSha / 10 ** 18 < targetInMoac) {
        logger.info(`need to fund addr, ${addr}`);
        addrsToFund.push(addr);
      }
    } catch (err) {
      throw err;
    }
  }

  return addrsToFund;
};
