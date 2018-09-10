/**
 * Moac needed for the whole process
 *
 * @param {number} gasPrice - gas price used here. unit: gsha
 * @param {number} addrBase - min disposable balance requirement of sending
 * address excluding fund sent out during the process. unit: moac
 * @param {number} scsidBase - min balance requirement of single scsid excluding
 * fund sent out during the process. unit: moac
 * @param {number} subChainBaseBase - min balance requirement of address of
 * deployed subChainBase. unit: moac
 * @param {number} singleScsPoolDeposit - min fund sending out requirement of
 * single scsid in scs pool registration process. unit: moac
 * @param {number} numOfContractToDeploy - number of contracts to deploy
 * @param {number} singleScsidSubChainDeposit - moac needed for a scsid to
 * register to micro-chain
 * @param {number} totalNumOfScsids - number of all scsids
 * @param {number} maxGas - gas cap for single transaction
 * @param {number} midGas - mid lv gas for single transaction
 * @param {number} lowGas - min lv gas for single transaction
 * @param {number} [numOfScsidOk=0] - number of scsids not require funding
 * @returns {number} in moac
 */
module.exports = (
  gasPrice,
  addrBase,
  scsidBase,
  subChainBaseBase,
  singleScsPoolDeposit,
  numOfContractToDeploy,
  singleScsidSubChainDeposit,
  totalNumOfScsids,
  singleValueTransferGas,
  singleContractDeploymentGas,
  singleContractFuncCallGas,
  numOfScsidOk = 0
) => {
  const singleValueTransferGasFee =
    (singleValueTransferGas * gasPrice) / 10 ** 9;
  const singleCostOfNewContract =
    (singleContractDeploymentGas * gasPrice) / 10 ** 9;
  const singleFuncCallGasFee = (singleContractFuncCallGas * gasPrice) / 10 ** 9;
  // func call on contract to send deposit of a ssid to register to pool
  const singleCostOfPoolregistration =
    singleFuncCallGasFee + singleScsPoolDeposit;
  // contains func call on contract to send deposit to register to micro-chain
  const singleScsidCost =
    singleFuncCallGasFee + scsidBase + singleScsidSubChainDeposit;
  return (
    addrBase +
    singleCostOfNewContract * numOfContractToDeploy +
    (singleValueTransferGasFee + subChainBaseBase) +
    singleCostOfPoolregistration * totalNumOfScsids +
    (singleFuncCallGasFee +
      singleScsidCost * (totalNumOfScsids - numOfScsidOk)) +
    singleFuncCallGasFee
  );
};
