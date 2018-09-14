const sleep = require('../../util/sleep');
const ctx = require('../../context/process_ctx_proxy');
// const getNonce = require('../get_tx_nonce');

/**
 * Send given amount in Sha and do after transaction completed
 * Only work one transaction a time, 'coinbase' is shorthand to pass for using
 * coinbase as passed address
 *
 * @param {Chain3} chain3 - contains address and port parts
 * @param {TxKnowledgeForSending} txKnowledge - password of fromAddr
 * @param {function(Chain3, string): Promise.<any>} doneChecker
 * - arg0: chain3
 * - arg1: txHash
 * @returns {Promise.<any>} - resolve: address received transaction
 */
module.exports = async (chain3, txKnowledge, doneChecker) => {
  try {
    if (txKnowledge.passcode !== '') {
      await sleep(ctx.state.interval_between_rpc_calls_ms);
      chain3.personal.unlockAccount(txKnowledge.api.from, txKnowledge.passcode);
    }

    // const txNonce = await getNonce(chain3, txKnowledge.api.from);
    // txKnowledge.api.nonce = txNonce;

    await sleep(ctx.state.interval_between_rpc_calls_ms);
    const txHash = await new Promise((res, rej) => {
      chain3.mc.sendTransaction(txKnowledge.api, (err, transactionHash) => {
        if (err) {
          rej(err);
        } else {
          res(transactionHash);
        }
      });
    });

    return doneChecker(chain3, txHash);
  } catch (error) {
    throw error;
  }
};
