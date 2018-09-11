const fs = require('fs');
const solc = require('solc');

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
 * @param {number} gasBudget - number of gas to use
 * @param {number} gasPrice - gas price to use
 * @param {string} solFilePath - file path of the sol file
 * @param {string} contractName - name of the contract to deploy
 * @param {string} fromAddr - address of account sending transaction
 * @param {any[]} paramList - parameters to pass before transaction obj
 * @return {Promise<T>}
 */
module.exports = async (
  chain3,
  gasBudget,
  gasPrice,
  solFilePath,
  contractName,
  fromAddr,
  paramList
) =>
  new Promise((res, rej) => {
    const solSource = fs.readFileSync(solFilePath, 'utf8');
    const compiledContract = solc.compile(solSource, 1);
    const abi = compiledContract.contracts[contractName].interface;
    const { bytecode } = compiledContract.contracts[contractName];
    const fromAddress = fromAddr === 'coinbase' ? chain3.mc.coinbase : fromAddr;
    const contractOfX = chain3.mc.contract(JSON.parse(abi));

    const aCallback = (err, contract) => {
      if (err === null && contract) {
        if (contract.address) {
          res(contract);
        } else {
          // TO DO
        }
      } else if (err) {
        rej(err);
      } else {
        // TO DO
      }
    };
    const txObj = {
      data: `0x${bytecode}`,
      from: fromAddress,
      gas: gasBudget,
      gasPrice
    };

    switch (paramList.length) {
      case 0:
        contractOfX.new(txObj, aCallback);
        break;
      case 1:
        contractOfX.new(paramList[0], txObj, aCallback);
        break;
      case 2:
        contractOfX.new(paramList[0], paramList[1], txObj, aCallback);
        break;
      case 3:
        contractOfX.new(
          paramList[0],
          paramList[1],
          paramList[2],
          txObj,
          aCallback
        );
        break;
      case 4:
        contractOfX.new(
          paramList[0],
          paramList[1],
          paramList[2],
          paramList[3],
          txObj,
          aCallback
        );
        break;
      case 5:
        contractOfX.new(
          paramList[0],
          paramList[1],
          paramList[2],
          paramList[3],
          paramList[4],
          txObj,
          aCallback
        );
        break;
      case 6:
        contractOfX.new(
          paramList[0],
          paramList[1],
          paramList[2],
          paramList[3],
          paramList[4],
          paramList[5],
          txObj,
          aCallback
        );
        break;
      default:
        throw new Error(
          `only supporting up to 6 params, too many params in new contract initialization, paramList.length, ${
            paramList.length
          }`
        );
    }
  });