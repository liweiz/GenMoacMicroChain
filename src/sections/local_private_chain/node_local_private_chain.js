const create = require('../../vnode/new_node_from_genesis/create_node_n_first_account');
const genesis = require('../../../genesis.json');

const sideWork = async ctx => {
  if (ctx.state.vnode.chain_id === 101 || ctx.state.vnode.chain_id === 99) {
    throw Error(
      `${
        ctx.state.vnode.chain_id
      } is reserved for mainnet or testnet, please pick another chain id for your private chain`
    );
  }
  if (ctx.state.vnode.chain_id !== genesis.config.chainId) {
    throw Error(
      `${
        ctx.state.vnode.chain_id
      } has to be the same as the "chainId" set in genesis.json`
    );
  }
  try {
    const { coinbase } = await create(ctx.state.default_password);
    ctx.vnode.sending_addr = coinbase;
  } catch (err) {
    throw err;
  }
};

const nodeEnsureRequiredContractsAvailable = rawNode => {
  rawNode.setSideWork(sideWork);
  rawNode.sideWorkDescription =
    'create vnode by initializing local genesis block and create first account';
  return rawNode;
};

module.exports = nodeEnsureRequiredContractsAvailable;
