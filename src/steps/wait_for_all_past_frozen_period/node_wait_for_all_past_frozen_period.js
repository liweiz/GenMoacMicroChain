const waitPastFrozen = require('./wait_for_all_past_frozen_period');

const sideWork = async ctx => {
  try {
    await waitPastFrozen(
      ctx.state.scs_nodes.scsids,
      ctx.vnode.chain3,
      ctx.subChain_protocol_base.instance
    );
  } catch (err) {
    throw err;
  }
};

const setPrice = rawNode => {
  rawNode.sideWorkDescription = 'wait for all scsids past frozen period';
  rawNode.setSideWork(sideWork);
  return rawNode;
};

module.exports = setPrice;
