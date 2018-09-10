const sequentPromises = require('../../util/sequently_run_promises');
const deployContract = require('../../vnode/deploy_contract/deploy_sol_contract');
const logger = require('../../util/logger');

/**
 * @typedef SolToContract
 * @property {string} path
 * @property {string} name
 * @property {?Array<string, number>} params
 * @property {?string} addr
 */

/**
 * sequently deploy standalone contracts
 *
 * @param {Chain3} chain3
 * @param {number} gasBudget - number of gas to use
 * @param {number} gasPrice - gas price to use
 * @param {string} sendingAddr
 * @param {SolToContract[]} inputs
 * @throws some standalone smart contract deployment failed
 * @returns {Contract[]}
 */
const deployContracts = async (
  chain3,
  gasBudget,
  gasPrice,
  sendingAddr,
  inputs
) => {
  try {
    return sequentPromises(
      inputs.map(
        // sol: SolInput
        (input, i) => {
          logger.info(`deploying #${i} contract`);
          return deployContract(
            chain3,
            gasBudget,
            gasPrice,
            input.path,
            input.name,
            sendingAddr,
            input.params
          );
        }
      )
    );
  } catch (e) {
    logger.info(`some standalone smart contract deployment failed`);
    throw e;
  }
};

module.exports = deployContracts;
