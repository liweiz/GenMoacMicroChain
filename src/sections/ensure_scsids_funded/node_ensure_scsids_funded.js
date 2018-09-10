const nodeToFundScsids = require('../../steps/fund_addrs/node_fund_scsids');
const nodeToIntervalCheck = require('../../steps/interval_check_balances_of_addrs_till/node_interval_check_balances_of_scsids_till');
const genRawNode = require('../../util/operation_tree/operation_tree_node');

/**
 * @typedef Context
 * @property {object} state - same data structure as process_state.json
 */

const nodeEnsureScsidBalances = rawNode => {
  rawNode.genKids = () => {
    rawNode.kids.push(nodeToFundScsids(genRawNode(rawNode)));
    rawNode.kids.push(nodeToIntervalCheck(genRawNode(rawNode)));
  };

  rawNode.sideWorkDescription =
    'ensure scsids need funding reach target balance';

  return rawNode;
};

module.exports = nodeEnsureScsidBalances;
