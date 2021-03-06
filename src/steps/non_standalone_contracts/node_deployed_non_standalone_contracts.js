const deployed = require('./deployed_non_standalone_contracts');
const solInputMap = require('./input_of_non_standalone_contracts');
const getInputsForExisting = require('../new_contracts/filter_contract_instance_getter_input');

/**
 * get instances of deployed non-standalone contracts from sol files
 *
 */
const sideWork = async ctx => {
  const solInputs = getInputsForExisting(ctx, solInputMap(ctx.state), false);
  try {
    const contracts = await deployed(ctx.vnode.chain3, solInputs);
    contracts.forEach((contract, i) => {
      switch (solInputs[i].name) {
        case ctx.state.subChain_base.contract_name:
          ctx.subChain_base.instance = contract;
          break;
        default:
          throw Error(
            `existing deployed non-standalone contract name "${
              solInputs[i].name
            }" not matching any known names`
          );
      }
    });
  } catch (err) {
    throw err;
  }
};

/**
 * node getting Contract objs of deployed non-standalone contracts from sol files
 *
 * @param {OperationNode} rawNode
 * @returns {OperationNode}
 */
const getContract = rawNode => {
  rawNode.setSideWork(sideWork);
  rawNode.sideWorkDescription =
    'get Contract objs of deployed non-standalone contracts from sol files';

  return rawNode;
};

module.exports = getContract;
