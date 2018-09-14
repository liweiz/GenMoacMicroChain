const sleep = require('../util/sleep');
const ctx = require('../context/process_ctx_proxy');

/**
 * get proper nonce for transaction to send
 *
 * @param {Chain3} chain3
 * @param {string} addr
 * @returns
 */
module.exports = async (chain3, addr) => {
  await sleep(ctx.state.interval_between_rpc_calls_ms);
  const nonceNow = chain3.mc.getTransactionCount(addr);
  console.log(
    `chain3.mc.pendingTransactions: ${chain3.mc.pendingTransactions}`
  );
  console.log(`nonceNow: ${nonceNow}`);
  const pendingNum = chain3.mc.pendingTransactions
    ? chain3.mc.pendingTransactions.length
    : 0;
  return nonceNow + pendingNum;
};
