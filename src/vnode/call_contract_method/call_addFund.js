const callContractFunc = require('./call_contract_func');

/**
 * Call addFund
 *
 * @param {Chain3} chain3
 * @param {TxKnowledgeForSending} txKnowledge
 * @param {*} contract
 * @returns {Promise<TxReceipt>}
 */
module.exports = (chain3, txKnowledge, contract) =>
  callContractFunc(chain3, txKnowledge, 'addFund', contract);
