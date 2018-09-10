const deployFromSols = require('./deploy_non_standalone_contracts_from_sol');
const solInputMap = require('./input_of_non_standalone_contracts');
const getInputsForNew = require('../new_contracts/filter_contract_instance_getter_input');

/**
 * deploy non-standalone contracts from sol files and set each contract instance
 *
 */
const sideWork = async ctx => {
  console.log(
    `ctx.state.vnode_protocol_base.addr: ${ctx.state.vnode_protocol_base.addr}`
  );
  console.log(
    `ctx.state.subChain_protocol_base.addr: ${
      ctx.state.subChain_protocol_base.addr
    }`
  );
  const solInputs = getInputsForNew(ctx, solInputMap(ctx.state), true);
  try {
    const contracts = await deployFromSols(
      ctx.vnode.chain3,
      ctx.state.gas.lv[ctx.state.gas.usage.contract_deployment],
      ctx.vnode.gas_price_to_use,
      ctx.vnode.sending_addr,
      solInputs
    );
    contracts.forEach((contract, i) => {
      switch (solInputs[i].name) {
        case ctx.state.subChain_base.contract_name:
          ctx.subChain_base.instance = contract;
          ctx.state.subChain_base.addr = contract.address;
          break;
        default:
          throw Error(
            `non-standalone contract deployed with unidendified contract name: ${
              solInputs[i].name
            }`
          );
      }
    });
  } catch (err) {
    throw err;
  }
};

const deploy = rawNode => {
  rawNode.setSideWork(sideWork);
  rawNode.sideWorkDescription =
    'deploy non-standalone contracts from sol files';

  return rawNode;
};

module.exports = deploy;
