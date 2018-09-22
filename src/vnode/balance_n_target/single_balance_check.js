const sleep = require('../../util/sleep');
const ctx = require('../../context/process_ctx_proxy');
const getBalance = require('./get_balance_promise');
const logger = require('../../util/logger');

/**
 * find out if an address's balance meets target accordingly
 *
 *
 * @param {Chain3} chain3
 * @param {string} addr
 * @param {number} targetInSha
 * @throws terminate application process
 * @returns {void}
 */
module.exports = async (chain3, addr, targetInSha) => {
  await sleep(ctx.state.interval_between_rpc_calls_ms);
  const balanceInSha = await getBalance(chain3, addr);
  logger.info(
    `balance in moac, expected, ${targetInSha / 10 ** 18}, now, ${balanceInSha /
      10 ** 18}`
  );
  if (balanceInSha < targetInSha) {
    logger.info(
      `Insufficient fund at address, ${addr}, current balance is ${balanceInSha /
        10 **
          18} moac. Please make sure the account balance is not less than ${targetInSha /
        10 ** 18} moac and restart the process after it is satisfied.`
    );
    process.exit();
  }
  logger.info(`enough fund at address, ${addr}`);
};
