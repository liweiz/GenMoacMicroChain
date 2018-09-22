const nodeCallAddFundFunc = require('../../steps/call_contract_method/node_call_addFund');
const nodeCallRegisterOpenFunc = require('../../steps/call_contract_method/node_call_registerOpen');
const nodeCallRegisterCloseFunc = require('../../steps/call_contract_method/node_call_registerClose');
const nodeWaitForMicroChainRegistration = require('../../steps/interval_check_till_scs_registration/node_interval_check_till_scs_registration');
const nodeWaitForMin = require('../../steps/wait_till_blk_num_for_scs_on_chain/node_wait_till_blk_num_for_min_scs_on_chain');
const nodeWaitForMax = require('../../steps/wait_till_blk_num_for_scs_on_chain/node_wait_till_blk_num_for_max_scs_on_chain');
const genRawNode = require('../../util/operation_tree/operation_tree_node');

const nodeLiveMicroChain = rawNode => {
  rawNode.genKids = ctx => {
    rawNode.kids.push(nodeCallAddFundFunc(genRawNode(rawNode)));
    rawNode.kids.push(nodeCallRegisterOpenFunc(genRawNode(rawNode)));
    if (
      ctx.state.vnode_protocol_base.addr !== '' &&
      ctx.state.subChain_protocol_base.addr !== ''
    ) {
      rawNode.kids.push(nodeWaitForMin(genRawNode(rawNode)));
      rawNode.kids.push(nodeWaitForMax(genRawNode(rawNode)));
    } else {
      rawNode.kids.push(nodeWaitForMicroChainRegistration(genRawNode(rawNode)));
    }
    rawNode.kids.push(nodeCallRegisterCloseFunc(genRawNode(rawNode)));
  };

  rawNode.sideWorkDescription = 'form micro-chain';

  return rawNode;
};

module.exports = nodeLiveMicroChain;
