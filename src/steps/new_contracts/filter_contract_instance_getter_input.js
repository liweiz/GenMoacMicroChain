/**
 * @typedef SolToContract
 * @property {string} path
 * @property {string} name
 * @property {?Array<string, number>} params
 * @property {?string} addr
 */

/**
 * convert SolToContract as member type object into same member type array and
 * only keep members for new or existing contracts
 *
 * @param {CTX} ctx
 * @param {{anyKey: SolToContract}} objWithAllInputs - each member is type of
 * SolToContract
 * @param {boolean} forNew - false while only keep existing deployed contract
 */
const objInArrayOut = (ctx, objWithAllInputs, forNew) =>
  // convert members in obj into members in array
  Array.from(Object.keys(objWithAllInputs))
    .map(key => objWithAllInputs[key])
    .filter(input => {
      const contractName = input.name;
      let toCreateNew;
      switch (contractName) {
        case ctx.state.test_coin.contract_name:
          toCreateNew = ctx.test_coin.create_new;
          break;
        case ctx.state.vnode_protocol_base.contract_name:
          toCreateNew = ctx.vnode_protocol_base.create_new;
          break;
        case ctx.state.subChain_protocol_base.contract_name:
          toCreateNew = ctx.subChain_protocol_base.create_new;
          break;
        case ctx.state.subChain_base.contract_name:
          toCreateNew = ctx.subChain_base.create_new;
          break;
        default:
          throw Error(`contract name "${contractName}" not recognized`);
      }
      if (forNew) {
        return toCreateNew;
      }
      return !toCreateNew;
    });

module.exports = objInArrayOut;
