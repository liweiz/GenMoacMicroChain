/**
 * @typedef T
 * @type any
 */

/**
 * Watch receipt and take action
 *
 * @param {Chain3} chain3
 * @param {(string | FilterOptions)} watchConfig
 * @param {string} txHash
 * @param {funciton(TxReceipt): T} valueFunc
 * @param {function(T): boolean} checkFunc
 * - arg0: output from valueFunc
 * @returns {Promise.<T>}
 */
module.exports = async (chain3, watchConfig, txHash, valueFunc, checkFunc) => {
  const filter = chain3.mc.filter(watchConfig);
  let checkDone = false;
  return new Promise((res, rej) => {
    filter.watch(err => {
      if (err) {
        rej(err);
      } else {
        const receipt = chain3.mc.getTransactionReceipt(txHash);
        if (receipt != null) {
          const outcome = valueFunc(receipt);
          if (checkFunc(outcome) && !checkDone) {
            filter.stopWatching();
            checkDone = true;
            res(outcome);
          }
        }
      }
    });
  });
};
