const multipleBalanceCheck = require('../../vnode/balance_n_target/multiple_balance_check');

/**
 * find scsids need funding
 *
 */
const filterScsids = async ctx => {
  const { state } = ctx;
  try {
    const scsidsToFund = await multipleBalanceCheck(
      ctx.vnode.chain3,
      state.scs_nodes.scsids.map(scsid => ({
        addr: scsid,
        balanceInMoac:
          state.scs_nodes.min_disposable_balance_in_moac +
          state.subChain_base.min_registration_fee_in_moac +
          (ctx.vnode.gas_price_to_use / 10 ** 9) *
            state.gas.lv[state.gas.usage.contract_func_call]
      }))
    );
    scsidsToFund.forEach(scsid => {
      ctx.scs_nodes.need_funding.push(scsid);
    });
  } catch (err) {
    throw err;
  }
};

module.exports = filterScsids;
