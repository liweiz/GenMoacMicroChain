const sleep = require('../../util/sleep');
const ctx = require('../../context/process_ctx_proxy');

/**
 * Check gas price in GSha
 *
 * @param {Chain3} chain3
 * @throws gas price retrieval failed
 * @returns {Promise<number>}
 */
module.exports = async chain3 => {
  await sleep(ctx.state.interval_between_rpc_calls_ms);
  return new Promise(res => {
    chain3.mc.getGasPrice(
      // err: Error, result: BigNumber
      (err, result) => {
        if (err == null) {
          res(result.toNumber());
        } else {
          throw new Error('gas price retrieval failed');
        }
      }
    );
  });
};
