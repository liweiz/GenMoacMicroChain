const nodePrivateChain = require('../local_private_chain/node_local_private_chain');
const nodeRpc = require('../rpc_connection/node_ensure_rpc');
const nodeSync = require('../sync_w_chain/node_sync_w_chain');
const nodeCost = require('../total_process_cost/node_total_process_cost');
const nodeSendingAddr = require('../sending_addr/node_select_sending_addr');
const waitForMiningTillBalance = require('../../steps/interval_check_balances_of_addrs_till/node_interval_check_balance_of_sending_addr');
const nodeUnlockAddrWDefault = require('../../steps/unlock_sending_addr_w_default_password/node_unlock_sending_addr_w_default_password');
const nodeNewScs = require('../new_scs_nodes/node_new_scs_nodes');
const nodeNewScsMonitor = require('../new_scs_monitor_node/node_new_scs_monitor_node');
const nodeDeployedContracts = require('../deployed_contracts/node_deployed_contracts');
const nodeScsFunded = require('../ensure_scsids_funded/node_ensure_scsids_funded');
const nodeScsPool = require('../scs_node_pool/node_scs_node_pool');
const nodeLiveChain = require('../live_micro_chain/node_live_microChain');
const waitForScsConnEnabled = require('../../steps/wait_till_blk_num_enable_scs/node_wait_till_blk_num_enable_scs');
const nodeCallRegisterAsMonitorFunc = require('../../steps/call_contract_method/node_call_registerAsMonitor');

const genRawNode = require('../../util/operation_tree/operation_tree_node');

const nodeRoot = rawNode => {
  rawNode.genKids = ctx => {
    if (ctx.state.private_n_local_run) {
      rawNode.kids.push(nodePrivateChain(genRawNode(rawNode)));
    }
    rawNode.kids.push(nodeRpc(genRawNode(rawNode)));
    if (!ctx.state.private_n_local_run) {
      // private chain node does not need to sync
      rawNode.kids.push(nodeSync(genRawNode(rawNode)));
    }
    rawNode.kids.push(nodeCost(genRawNode(rawNode)));
    if (ctx.state.private_n_local_run) {
      rawNode.kids.push(waitForMiningTillBalance(genRawNode(rawNode)));
      rawNode.kids.push(waitForScsConnEnabled(genRawNode(rawNode)));
      // private chain node unlock w/ default password
      rawNode.kids.push(nodeUnlockAddrWDefault(genRawNode(rawNode)));
    } else {
      // no need to select address for private chain node
      // private chain node has sending addr set when coinbase created already
      rawNode.kids.push(nodeSendingAddr(genRawNode(rawNode)));
    }
    if (ctx.state.subChain_protocol_base.addr === '') {
      rawNode.kids.push(nodeNewScs(genRawNode(rawNode)));
    }
    rawNode.kids.push(nodeDeployedContracts(genRawNode(rawNode)));
    if (ctx.state.subChain_protocol_base.addr === '') {
      rawNode.kids.push(nodeScsFunded(genRawNode(rawNode)));
      rawNode.kids.push(nodeScsPool(genRawNode(rawNode)));
    }
    rawNode.kids.push(nodeLiveChain(genRawNode(rawNode)));
    rawNode.kids.push(nodeNewScsMonitor(genRawNode(rawNode)));
    rawNode.kids.push(nodeCallRegisterAsMonitorFunc(genRawNode(rawNode)));
  };

  rawNode.sideWorkDescription = 'bring micro-chain to live';

  return rawNode;
};

module.exports = nodeRoot;
