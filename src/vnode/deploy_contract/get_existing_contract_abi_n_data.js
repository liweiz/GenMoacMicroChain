const inputStandalone = require('../../steps/standalone_contract/input_of_standalone_contracts');
const inputNon = require('../../steps/non_standalone_contracts/input_of_non_standalone_contracts');

module.exports = (state, contractName) => {
  var useSol;
  var abi;
  var data;
  switch (contractName) {
    case `:TestCoin`:
      useSol = !state.test_coin.use_existing_abi_n_data;
      abi = inputStandalone(state).testCoin.abi;
      data = inputStandalone(state).testCoin.data;
      break;
    case `:VnodeProtocolBase`:
      useSol = !state.vnode_protocol_base.use_existing_abi_n_data;
      abi = inputStandalone(state).vnodeProtocolBase.abi;
      data = inputStandalone(state).vnodeProtocolBase.data;
      break;
    case `:SubChainProtocolBase`:
      useSol = !state.subChain_protocol_base.use_existing_abi_n_data;
      abi = inputStandalone(state).subChainProtocolBase.abi;
      data = inputStandalone(state).subChainProtocolBase.data;
      break;
    case `:SubChainBase`:
      useSol = !state.subChain_base.use_existing_abi_n_data;
      abi = inputNon(state).subChainBase.abi;
      data = inputNon(state).subChainBase.data;
      break;
    default:
      throw Error(
        `contract name "${contractName}" is not among existing ones`
      );
  }
  return {
    useSol: useSol,
    abi: abi,
    data: data
  };
};