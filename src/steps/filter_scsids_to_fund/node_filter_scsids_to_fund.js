const filterScsids = require('./filter_scsids_to_fund');

/**
 * node of searching scsids need funding
 *
 * @param {OperationNode} rawNode
 * @param {boolean} fundingScsidNeeded
 * @returns {OperationNode}
 */
const scsidsNeedFunding = rawNode => {
  rawNode.setSideWork(filterScsids);
  rawNode.sideWorkDescription = 'filter scsids need funding';
  return rawNode;
};

module.exports = scsidsNeedFunding;
