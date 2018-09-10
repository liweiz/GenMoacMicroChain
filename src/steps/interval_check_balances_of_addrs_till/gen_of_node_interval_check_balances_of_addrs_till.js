const sequentPromises = require('../../util/sequently_run_promises');
const intervalBalanceCheck = require('../../vnode/interval_check/interval_check_till_balance');
const logger = require('../../util/logger');

/**
 * generate a func returning node doing interval balance check till target met
 *
 * @param {sting} addrsName - name describing given addresses
 * @returns {function(OperationNode): OperationNode}
 */
const genNode = addrsName =>
  /**
   * node of interval checking each given address' balance till target met
   *
   * @param {OperationNode} rawNode
   * @throws some address balance not meeting required budget
   * @returns {OperationNode}
   */
  rawNode => {
    /**
     * interval check each address' balance till target met
     *
     */
    const sideWork = async ctx => {
      const { chain3 } = ctx.vnode;
      const { state } = ctx;
      let addrs;
      let targetInMoac;
      try {
        switch (addrsName) {
          case 'sending address':
            addrs = [ctx.vnode.sending_addr];
            targetInMoac =
              ctx.total_cost_in_sha.required_for_sending_addr / 10 ** 18;
            break;
          case 'scsids':
            addrs = ctx.scs_nodes.need_funding;
            targetInMoac =
              state.scs_nodes.min_disposable_balance_in_moac +
              state.subChain_base.min_registration_fee_in_moac +
              (ctx.vnode.gas_price_to_use / 10 ** 9) *
                state.gas.lv[state.gas.usage.contract_func_call];
            break;
          default:
            throw Error(
              `addresses set name "${addrsName}" is not among existing ones`
            );
        }
        await sequentPromises(
          addrs.map(addr =>
            intervalBalanceCheck(chain3, addr, targetInMoac * 10 ** 18)
          )
        );
      } catch (e) {
        logger.info(`some address balance not meeting target`);
        throw e;
      }
    };
    rawNode.setSideWork(sideWork);
    rawNode.sideWorkDescription = `interval check balances of ${addrsName} need funding till expected balance met`;

    return rawNode;
  };

module.exports = genNode;
