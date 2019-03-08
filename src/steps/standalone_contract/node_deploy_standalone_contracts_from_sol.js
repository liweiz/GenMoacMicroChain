const deployFromSols = require('./deploy_standalone_contracts_from_sol');
const solInputMap = require('./input_of_standalone_contracts');
const getInputsForNew = require('../new_contracts/filter_contract_instance_getter_input');

/**
 * deploy standalone contracts from sol files and set each contract instance
 *
 */
const sideWork = async ctx => {
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
        case ctx.state.test_coin.contract_name:
          ctx.test_coin.instance = contract;
          ctx.state.test_coin.addr = contract.address;
          break;
        case ctx.state.vnode_protocol_base.contract_name:
          ctx.vnode_protocol_base.instance = contract;
          ctx.state.vnode_protocol_base.addr = contract.address;
          // TO DO: assign url, which is a must for this to work
          break;
        case ctx.state.subChain_protocol_base.contract_name:
          ctx.subChain_protocol_base.instance = contract;
          ctx.state.subChain_protocol_base.addr = contract.address;
          break;
        default:
          throw Error(
            `standalone contract deployed with unidendified contract name: ${
              solInputs[i].name
            }`
          );
      }
      console.log(
        `ctx.state.test_coin.addr: ${
          ctx.state.test_coin.addr
        }`
      );
      console.log(
        `ctx.state.vnode_protocol_base.addr: ${
          ctx.state.vnode_protocol_base.addr
        }`
      );
      console.log(
        `ctx.state.subChain_protocol_base.addr: ${
          ctx.state.subChain_protocol_base.addr
        }`
      );
    });
  } catch (err) {
    throw err;
  }
};

/**
 * node deploying standalone contracts from sol files
 *
 */
const deploy = rawNode => {
  rawNode.setSideWork(sideWork);
  rawNode.sideWorkDescription = 'deploy standalone contracts from sol files';

  return rawNode;
};

module.exports = deploy;
