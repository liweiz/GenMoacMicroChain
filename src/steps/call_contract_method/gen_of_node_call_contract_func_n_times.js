const callFunc = require('../../vnode/call_contract_method/call_contract_func');

/**
 * generate a func returning node calling a func on a deployed contract
 *
 * @param {sting} funcNameInContract - func name in contract
 * @param {sting} contractName - name of contract
 * @param {number} amountInMoac - amount in moac to send with func call
 * @param {any[][]} arrayOfParams - each element sequently contains params for a
 * call
 * @returns {function(OperationNode): OperationNode}
 */
const genOfNode = (
  funcNameInContract,
  contractName,
  amountInMoac,
  arrayOfParams
) =>
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
      const amountInSha = amountInMoac * 10 ** 18;
      const { chain3 } = ctx.vnode;
      let contractInstance;
      const sendingAddr = ctx.vnode.sending_addr;
      switch (contractName) {
        case ctx.state.subChain_base.contract_name:
          switch (funcNameInContract) {
            case 'addFund':
              contractInstance = ctx.subChain_base.instance;
              break;
            case 'registerOpen':
              contractInstance = ctx.subChain_base.instance;
              break;
            case 'registerClose':
              contractInstance = ctx.subChain_base.instance;
              break;
            default:
              throw Error(
                `method name "${funcNameInContract}" on contract "${contractName}" is not among existing ones`
              );
          }
          break;
        case ctx.state.subChain_protocol_base.contract_name:
          switch (funcNameInContract) {
            case 'register':
              contractInstance = ctx.subChain_protocol_base.instance;
              arrayOfParams = ctx.scs_nodes.need_funding.map(scsid => [scsid]);
              break;
            default:
              throw Error(
                `method name "${funcNameInContract}" on contract "${contractName}" is not among existing ones`
              );
          }
          break;
        default:
          throw Error(
            `contract name "${contractName}" is not among existing ones`
          );
      }
      const txKnowledge = {
        passcode: '',
        api: {
          from: sendingAddr,
          to: contractInstance.address,
          value: amountInSha,
          gas: ctx.state.gas.lv[ctx.state.gas.usage.contract_func_call]
          // gasPrice: ctx.vnode.gas_price_to_use
        }
      };

      for (let i = 0; i < arrayOfParams.length; i += 1) {
        const params = arrayOfParams[i];
        let txReceipt;
        try {
          switch (params.length) {
            case 0:
              txReceipt = await callFunc(
                chain3,
                txKnowledge,
                funcNameInContract,
                contractInstance
              );

              break;
            case 1:
              txReceipt = await callFunc(
                chain3,
                txKnowledge,
                funcNameInContract,
                contractInstance,
                params[0]
              );

              break;
            case 2:
              txReceipt = await callFunc(
                chain3,
                txKnowledge,
                funcNameInContract,
                contractInstance,
                params[0],
                params[1]
              );

              break;
            case 3:
              txReceipt = await callFunc(
                chain3,
                txKnowledge,
                funcNameInContract,
                contractInstance,
                params[0],
                params[1],
                params[2]
              );

              break;
            case 4:
              txReceipt = await callFunc(
                chain3,
                txKnowledge,
                funcNameInContract,
                contractInstance,
                params[0],
                params[1],
                params[2],
                params[3]
              );

              break;
            case 5:
              txReceipt = await callFunc(
                chain3,
                txKnowledge,
                funcNameInContract,
                contractInstance,
                params[0],
                params[1],
                params[2],
                params[3],
                params[4]
              );

              break;
            case 6:
              txReceipt = await callFunc(
                chain3,
                txKnowledge,
                funcNameInContract,
                contractInstance,
                params[0],
                params[1],
                params[2],
                params[3],
                params[4],
                params[5]
              );

              break;
            case 7:
              txReceipt = await callFunc(
                chain3,
                txKnowledge,
                funcNameInContract,
                contractInstance,
                params[0],
                params[1],
                params[2],
                params[3],
                params[4],
                params[5],
                params[6]
              );

              break;
            case 8:
              txReceipt = await callFunc(
                chain3,
                txKnowledge,
                funcNameInContract,
                contractInstance,
                params[0],
                params[1],
                params[2],
                params[3],
                params[4],
                params[5],
                params[6],
                params[7]
              );

              break;
            default:
              throw new Error(
                `too many params of called method, supporting up to 8, received, ${
                  params.length
                }`
              );
          }
          const funcCallOk = txReceipt.status === '0x1';
          // 1st elem is params array, 2nd is boolean indicates successful call
          // true is successful
          const result = [params, funcCallOk];
          switch (contractName) {
            case ':SubChainProtocolBase':
              switch (funcNameInContract) {
                case 'register':
                  ctx.state.subChain_protocol_base.successful_func_call.register = ctx.state.subChain_protocol_base.successful_func_call.register.concat(
                    [result]
                  );
                  break;
                default:
                  throw Error(
                    `func name "${funcNameInContract}" of contract "${contractName}" at address "${
                      contractInstance.address
                    }" not among supported list`
                  );
              }
              break;
            case ':SubChainBase':
              switch (funcNameInContract) {
                case 'addFund':
                  ctx.state.subChain_base.successful_func_call.addFund.push(
                    result
                  );
                  break;
                case 'registerOpen':
                  ctx.state.subChain_base.successful_func_call.registerOpen.push(
                    result
                  );
                  break;
                case 'registerClose':
                  ctx.state.subChain_base.successful_func_call.registerClose.push(
                    result
                  );
                  break;
                default:
                  throw Error(
                    `func name "${funcNameInContract}" of contract "${contractName}" at address "${
                      contractInstance.address
                    }" not among supported list`
                  );
              }
              break;
            default:
              throw Error(
                `name "${contractName}" of contract at address "${
                  contractInstance.address
                }" not among supported list`
              );
          }
        } catch (err) {
          throw err;
        }
      }
    };

    rawNode.setSideWork(sideWork);

    rawNode.sideWorkDescription = `call func w name "${funcNameInContract}" of contract "${contractName}" with amount in moac: ${amountInMoac}`;

    return rawNode;
  };

module.exports = genOfNode;
