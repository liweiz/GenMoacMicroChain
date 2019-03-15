const fs = require('fs');
const solc = require('solc');
const checkExisting = require('./get_existing_contract_abi_n_data');
const ctx = require('../../context/process_ctx_proxy');

/**
 * @typedef T
 * @type any
 */

/**
 * compile and deploy a contract from a local sol file
 * support up to 6 parameters before transaction obj
 * 'coinbase' is shorthand to pass for using coinbase as passed address
 *
 * @param {Chain3} chain3 - contains address and port parts
 * @param {string} solFilePath - file path of the sol file
 * @param {string} contractName - name of the contract to deploy
 * @return {Promise<T>}
 */
module.exports = async (chain3, solFilePath, contractName) =>
  new Promise(res => {
    var abi;
    const result = checkExisting(ctx.state, contractName);
    if (result.useSol) {
      const solSource = fs.readFileSync(solFilePath, 'utf8');
      const compiledContract = solc.compile(solSource, 1);
      abi = compiledContract.contracts[contractName].interface;
    } else {
      abi = result.abi;
    }
    const contractOfX = chain3.mc.contract(JSON.parse(abi));
    res(contractOfX);
  });
