const estimate = require('./estimated_process_total_cost_in_sha');

/**
 * estimate total cost
 *
 * @param {CTX} ctx
 * @param {boolean} forExpenditure - false when taking existing scsids' balances
 * into account
 * @returns {number} - in moac
 */
const costEstimated = (ctx, forExpenditure) => {
  const { state } = ctx;
  const numOfNewContracts =
    ctx.vnode_protocol_base.create_new +
    ctx.subChain_protocol_base.create_new +
    ctx.subChain_base.create_new;
  // This is called before new scs nodes are created. need_funding only contains
  // existing scsids require funding.
  const numOfScsidsOk =
    ctx.scs_nodes.total_num -
    ctx.scs_nodes.num_of_new -
    ctx.scs_nodes.need_funding.length;
  return estimate(
    ctx.vnode.gas_price_to_use,
    state.vnode.min_disposable_balance_in_moac,
    state.scs_nodes.min_disposable_balance_in_moac,
    state.subChain_base.min_op_balance_in_moac,
    state.subChain_protocol_base.min_bond,
    numOfNewContracts,
    state.subChain_base.min_registration_fee_in_moac,
    ctx.scs_nodes.total_num,
    state.gas.lv[state.gas.usage.send_value],
    state.gas.lv[state.gas.usage.contract_deployment],
    state.gas.lv[state.gas.usage.contract_func_call],
    forExpenditure ? 0 : numOfScsidsOk
  );
};

const nodeTotalCostInSha = rawNode => {
  /**
   * get total cost in moac
   *
   */
  const sideWork = ctx => {
    ctx.total_cost_in_sha.original = costEstimated(ctx, true) * 10 ** 18;

    ctx.total_cost_in_sha.required_for_sending_addr =
      costEstimated(ctx, false) * 10 ** 18;
  };

  rawNode.setSideWork(sideWork);
  rawNode.sideWorkDescription = 'work out total process cost';

  return rawNode;
};

module.exports = nodeTotalCostInSha;
