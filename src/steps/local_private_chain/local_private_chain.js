const newVnodeNCoinbase = require('../../vnode/new_node_from_genesis/create_node_n_first_account');

const sideWork = async ctx => {
  await newVnodeNCoinbase(ctx.state.default_password);
};

const newContractRequests = rawNode => {
  rawNode.sideWorkDescription = 'create local vnode from ./genesis.json file';
  rawNode.setSideWork(findNewContracts);
  return rawNode;
};

module.exports = newContractRequests;
