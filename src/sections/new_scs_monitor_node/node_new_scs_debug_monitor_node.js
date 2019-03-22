const upNRunScsNode = require('../../scs/scs_on_vnode_up_n_run');
const logger = require('../../util/logger');

const newScsNode = async ctx => {
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
    logger.info(`creating scs debug monitor node`);
    const scsid = await upNRunScsNode(`scs_debug_monitor`, bene, 2);
    logger.info(`scsid caught, scs_debug_monitor, ${scsid}`);
    logger.info(`scs debug monitor node created`);
    logger.info(
      `please open the log file under above mentioned directory to monitor micro-chain block generation`
    );
    // to trigger 'state updated' event
    ctx.state.scs_nodes.debug_monitor = scsid;
  } catch (err) {
    throw err;
  }
};

const nodeNewScs = rawNode => {
  rawNode.setSideWork(newScsNode);
  rawNode.sideWorkDescription = 'create and run local scs debug monitor node';
  return rawNode;
};

module.exports = nodeNewScs;
