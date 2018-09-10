const upNRunScs = require('../../scs/scs_on_vnode_up_n_run');
const logger = require('../../util/logger');

/**
 * create new scs nodes based on number of beneficiaries provided
 *
 * @param {string[]} scsBeneficiaries - each address triggers one scs node
 * creation, same address showing up multiple times leads to using it for
 * multiple scs nodes to be created
 * @returns {string[]} - scsids of created scs nodes
 */
const upNRunScsNodes = async scsBeneficiaries => {
  // scsid: string[]
  const scsids = [];

  for (let i = 0; i < scsBeneficiaries.length; i += 1) {
    logger.info(`creating scs node, #${i + 1}, scs_${i}`);
    const scsid = await upNRunScs(`scs_${i}`, scsBeneficiaries[i]);
    scsids.push(scsid);
    logger.info(`scsid caught, #${i + 1}, scs_${i}, ${scsid}`);
    logger.info(`scs node created, ${i + 1}, scs_${i}`);
  }

  logger.info(`local scs nodes created`);

  return scsids;
};

module.exports = upNRunScsNodes;
