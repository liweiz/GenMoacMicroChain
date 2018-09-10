const checkTill = require('../../vnode/interval_check/interval_check_till_scs_pool');

const sideWork = async ctx => {
  try {
    await checkTill(
      ctx.vnode.chain3,
      ctx.subChain_protocol_base.instance,
      ctx.scs_nodes.total_num
    );
  } catch (err) {
    throw err;
  }
};

const checkTillScsPool = rawNode => {
  rawNode.setSideWork(sideWork);
  rawNode.sideWorkDescription =
    'interval check till expected number of scs nodes reached';

  return rawNode;
};

module.exports = checkTillScsPool;
