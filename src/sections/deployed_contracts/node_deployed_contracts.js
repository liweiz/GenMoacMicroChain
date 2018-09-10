const genRawNode = require('../../util/operation_tree/operation_tree_node');
const nodeEnsuringStandalone = require('../../steps/standalone_contract/node_ensure_standalone_contract_instances');
const nodeEnsuringNonStandalone = require('../../steps/non_standalone_contracts/node_ensure_non_standalone_contract_instances');

const nodeEnsureRequiredContractsAvailable = rawNode => {
  rawNode.genKids = () => {
    rawNode.kids.push(nodeEnsuringStandalone(genRawNode(rawNode)));
    rawNode.kids.push(nodeEnsuringNonStandalone(genRawNode(rawNode)));
  };
  rawNode.sideWorkDescription = 'ensure required contract instances available';
  return rawNode;
};

module.exports = nodeEnsureRequiredContractsAvailable;
