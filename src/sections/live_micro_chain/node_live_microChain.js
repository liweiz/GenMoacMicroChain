const nodeCallAddFundFunc = require('../../steps/call_contract_method/node_call_addFund');
const nodeCallRegisterOpenFunc = require('../../steps/call_contract_method/node_call_registerOpen');
const nodeCallRegisterCloseFunc = require('../../steps/call_contract_method/node_call_registerClose');
const nodeWaitForMicroChainRegistration = require('../../steps/interval_check_till_scs_registration/node_interval_check_till_scs_registration');
const genRawNode = require('../../util/operation_tree/operation_tree_node');

const nodeLiveMicroChain = rawNode => {
  rawNode.genKids = () => {
    rawNode.kids.push(nodeCallAddFundFunc(genRawNode(rawNode)));
    rawNode.kids.push(nodeCallRegisterOpenFunc(genRawNode(rawNode)));
    rawNode.kids.push(nodeWaitForMicroChainRegistration(genRawNode(rawNode)));
    rawNode.kids.push(nodeCallRegisterCloseFunc(genRawNode(rawNode)));
  };

  rawNode.sideWorkDescription = 'form micro-chain';

  return rawNode;
};

module.exports = nodeLiveMicroChain;
