const sequentPromises = require('../../util/sequently_run_promises');
const compileToGetContract = require('../../vnode/deploy_contract/compile_to_get_contract');

/**
 * @typedef SolToContract
 * @property {string} path
 * @property {string} name
 * @property {?Array<string, number>} params
 * @property {?string} addr
 */

/**
 * Contract objs of deployed standalone contracts from sol files
 *
 * @param {Chain3} chain3
 * @param {SolToContract[]} inputs
 * @returns {Contract[]} in same order of inputs
 */
const deployedContracts = async (chain3, inputs) =>
  (await sequentPromises(
    inputs.map(input => compileToGetContract(chain3, input.path, input.name))
  )).map((value, i) => value.at(inputs[i].addr));

module.exports = deployedContracts;
