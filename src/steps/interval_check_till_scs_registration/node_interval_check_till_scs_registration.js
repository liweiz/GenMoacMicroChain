const checkTill = require('../../vnode/interval_check/interval_check_till_scs_registration');

const sideWork = async ctx => {
  try {
    await checkTill(
      ctx.vnode.chain3,
      ctx.subChain_base.instance,
      ctx.scs_nodes.total_num
    );
  } catch (err) {
    throw err;
  }
};

const checkTillScsRegistration = rawNode => {
  rawNode.setSideWork(sideWork);
  rawNode.sideWorkDescription =
    'interval check till expected number of scs nodes registered to micro-chain';

  return rawNode;
};

module.exports = checkTillScsRegistration;
