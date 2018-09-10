const findNewContracts = require('./find_new_contract_requests');

const newContractRequests = rawNode => {
  rawNode.sideWorkDescription = 'find out the need to deploy new contracts';
  rawNode.setSideWork(findNewContracts);
  return rawNode;
};

module.exports = newContractRequests;
