const upNRunScsNode = require('../../scs/scs_on_vnode_up_n_run');
const logger = require('../../util/logger');

const newScsNodes = async ctx => {
  let bene;
  if (ctx.state.scs_nodes.beneficiary === '') {
    if (ctx.vnode.sending_addr === '') {
      throw Error('ctx.vnode.sending_addr not set');
    }
    bene = ctx.vnode.sending_addr;
  } else {
    bene = ctx.state.scs_nodes.beneficiary;
  }
  try {
    // newScsids: string[]
    const newScsids = [];
    for (let i = 0; i < ctx.scs_nodes.num_of_new; i += 1) {
      logger.info(`creating scs node, ${i + 1}, scs_${i}`);
      const scsid = await upNRunScsNode(`scs_${i}`, bene);
      newScsids.push(scsid);
      ctx.scs_nodes.need_funding.push(scsid);
      ctx.state.scs_nodes.scsids.push(scsid);
      logger.info(`scsid caught, ${i + 1}, scs_${i}, ${scsid}`);
      logger.info(`scs node created, ${i + 1}, scs_${i}`);
    }
  } catch (err) {
    throw err;
  }
};

const nodeNewScs = rawNode => {
  rawNode.setSideWork(newScsNodes);
  rawNode.sideWorkDescription =
    'create and run local scs nodes to meet scsid number requirement';
  return rawNode;
};

module.exports = nodeNewScs;
