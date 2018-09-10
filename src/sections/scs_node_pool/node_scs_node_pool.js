const nodeCallMultiRegisterFunc = require('../../steps/call_contract_method/node_call_multiple_register');
const nodeCheckTillPoolReady = require('../../steps/interval_check_till_scs_pool/node_interval_check_till_scs_pool');
const nodeHoldForFrozenPeriod = require('../../steps/wait_for_all_past_frozen_period/node_wait_for_all_past_frozen_period');
const genRawNode = require('../../util/operation_tree/operation_tree_node');

const nodeScsPool = rawNode => {
  rawNode.genKids = () => {
    rawNode.kids.push(nodeCallMultiRegisterFunc(genRawNode(rawNode)));
    rawNode.kids.push(nodeCheckTillPoolReady(genRawNode(rawNode)));
    rawNode.kids.push(nodeHoldForFrozenPeriod(genRawNode(rawNode)));
  };

  rawNode.sideWorkDescription = 'form active scs nodes pool';

  return rawNode;
};

module.exports = nodeScsPool;
