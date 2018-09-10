const upNRunScs = require('./up_n_run_scs_nodes');

/**
 * create and run new scs nodes
 *
 */
const sideWork = async ctx => {
  if (ctx.state.scs_nodes.beneficiary === '') {
    ctx.state.scs_nodes.beneficiary = ctx.vnode.sending_addr;
  }
  if (ctx.scs_nodes.num_of_new > 0) {
    const benes = [];
    for (let i = 0; i < ctx.scs_nodes.num_of_new; i += 1) {
      benes.push(ctx.state.scs_nodes.beneficiary);
    }
    try {
      const scsids = await upNRunScs(benes);
      scsids.forEach(scsid => {
        ctx.scs_nodes.need_funding.push(scsid);
        ctx.state.scs_nodes.scsids.push(scsid);
      });
    } catch (err) {
      throw err;
    }
  }
};

/**
 * node creating and run new scs nodes
 *
 * @param {OperationNode} rawNode
 * @param {boolean} scsNodeCreationNeeded - true while scs node creation needed
 * @returns {OperationNode}
 */
const nodeUpNRunScsNodes = rawNode => {
  rawNode.setSideWork(sideWork);
  rawNode.siwdeWorkDescription = 'create and run requested scs nodes';

  return rawNode;
};

module.exports = nodeUpNRunScsNodes;
