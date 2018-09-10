const genRawNode = require('../../util/operation_tree/operation_tree_node');
const nodeNewContractRequests = require('../../steps/new_contracts/node_find_new_contract_request');
const nodeExistingScsidsToFund = require('../../steps/filter_scsids_to_fund/node_filter_scsids_to_fund');
const sysGasPrice = require('../../steps/sys_gas_price/node_sys_gas_price');
const finalGasPrice = require('../../steps/final_gas_price/node_final_gas_price');
const totalScsids = require('../../steps/num_scs_nodes/node_num_of_scs_nodes');
const totalCostInSha = require('../../steps/estimated_proccess_total_cost_in_sha/node_estimated_process_total_cost_in_sha');

const nodeTotalCost = rawNode => {
  rawNode.genKids = () => {
    rawNode.kids.push(totalScsids(genRawNode(rawNode)));
    rawNode.kids.push(sysGasPrice(genRawNode(rawNode)));
    rawNode.kids.push(finalGasPrice(genRawNode(rawNode)));
    rawNode.kids.push(nodeNewContractRequests(genRawNode(rawNode)));
    rawNode.kids.push(nodeExistingScsidsToFund(genRawNode(rawNode)));
    rawNode.kids.push(totalCostInSha(genRawNode(rawNode)));
  };

  rawNode.sideWorkDescription = 'work out process total cost in sha';

  return rawNode;
};

module.exports = nodeTotalCost;
