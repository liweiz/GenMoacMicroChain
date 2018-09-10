const logger = require('../../util/logger');

/**
 * find out max number of scs nodes on micro-chain and number of new scs nodes
 * to create locally
 *
 * @param {object} state - state object from process_state.json
 * @returns {{expected: number, new: number}}
 */
const expectedAndNewScsNum = state => {
  const minNumScs = state.subChain_base.min_num_nodes;
  const maxNumScs = state.subChain_base.max_num_nodes;

  const potentialAvailableScsNum = state.scs_nodes.scsids.length;

  const numNewScsToMin = minNumScs - potentialAvailableScsNum;

  let result;

  if (numNewScsToMin > 0) {
    // new scs nodes needed
    result = { expected: minNumScs, new: numNewScsToMin };
  } else {
    result = {
      expected:
        potentialAvailableScsNum >= maxNumScs
          ? maxNumScs
          : potentialAvailableScsNum,
      new: 0
    };
  }

  logger.info(
    `no more than ${result.expected} scs nodes expected on microChain`
  );
  logger.info(
    `${result.new} new local scs nodes will be created in the process`
  );
  return result;
};

module.exports = expectedAndNewScsNum;
