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
    logger.info(`creating scs monitor node`);
    const scsid = await upNRunScsNode(`scs_monitor`, bene, true);
    logger.info(`scsid caught, scs_monitor, ${scsid}`);
    logger.info(`scs monitor node created`);
    logger.info(
      `please open the log file under above mentioned directory to monitor micro-chain block generation`
    );
    // to trigger 'state updated' event
    ctx.state.scs_nodes.monitor = scsid;
  } catch (err) {
    throw err;
  }
};

const nodeNewScs = rawNode => {
  rawNode.setSideWork(newScsNode);
  rawNode.sideWorkDescription = 'create and run local scs monitor node';
  return rawNode;
};

module.exports = nodeNewScs;
