const sendSha = require('../../vnode/send_tx_n_ensure/send_tx_n_ensure_receipt');
const logger = require('../../util/logger');

/**
 * generate a func returning node sending same amount to addresses by same
 * account
 *
 * @param {sting} addrsName - name describing given addresses
 * @returns {function(OperationNode): OperationNode}
 */
const genOfNode = addrsName =>
  /**
   * node of sending same amount fund to each address
   *
   * @param {OperationNode} rawNode
   * @returns {OperationNode}
   */
  rawNode => {
    /**
     * send same amount of fund to each address
     *
     */
    const sideWork = async ctx => {
      const { state } = ctx;
      let amountInMoac;
      let addrs;
      let sendingAddr;
      try {
        switch (addrsName) {
          case 'scsids':
            sendingAddr = ctx.vnode.sending_addr;
            addrs = ctx.scs_nodes.need_funding;
            amountInMoac =
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
        console.log(`sendingAddr: ${sendingAddr}`);
        console.log(`amountInMoac: ${amountInMoac}`);
        const fundInSha = amountInMoac * 10 ** 18;
        for (let i = 0; i < addrs.length; i += 1) {
          logger.info(`funding address, ${i}, start`);
          await sendSha(ctx.vnode.chain3, {
            passcode: '',
            api: {
              from: sendingAddr,
              to: addrs[i],
              value: fundInSha,
              gas: state.gas.lv[state.gas.usage.send_value]
            }
          });
          logger.info(`funding address, ${i}, done`);
        }
      } catch (err) {
        throw err;
      }
    };

    rawNode.setSideWork(sideWork);

    rawNode.sideWorkDescription = `send fund to addresses of ${addrsName} do not meet target balance`;

    return rawNode;
  };

module.exports = genOfNode;
