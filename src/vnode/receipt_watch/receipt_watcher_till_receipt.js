const watcher = require('./receipt_watcher');

/**
 * Watch block and take action
 *
 * @param {Chain3} chain3
 * @param {string} txHash
 * @param {(string | FilterOptions)} [watchConfig='latest']
 * @returns {Promise.<TxReceipt>}
 */
module.exports = (chain3, txHash, watchCfg = 'latest') =>
  watcher(
    chain3,
    watchCfg,
    txHash,
    receipt => receipt,
    receipt => receipt && receipt.blockHash != null
  );
