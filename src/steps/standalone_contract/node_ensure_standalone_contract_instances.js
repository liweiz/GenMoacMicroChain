const genRawNode = require('../../util/operation_tree/operation_tree_node');
const nodeDeployNew = require('./node_deploy_standalone_contracts_from_sol');
const nodeGetExisting = require('./node_deployed_standalone_contracts');

const nodeEnsureRequiredContractsAvailable = rawNode => {
  rawNode.genKids = () => {
    rawNode.kids.push(nodeGetExisting(genRawNode(rawNode)));
    rawNode.kids.push(nodeDeployNew(genRawNode(rawNode)));
  };
  rawNode.sideWorkDescription =
    'ensure required standalone contract instances available';
  return rawNode;
};

module.exports = nodeEnsureRequiredContractsAvailable;
