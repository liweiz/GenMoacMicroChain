/**
 * find out the need to deploy new contract
 *
 * @param {*} ctx
 */
const findNewContracts = ctx => {
  const { state } = ctx;
  ctx.test_coin.create_new =
    state.test_coin.addr !== '' ? 0 : 1;
  ctx.vnode_protocol_base.create_new =
    state.vnode_protocol_base.addr !== '' ? 0 : 1;
  ctx.subChain_protocol_base.create_new =
    state.subChain_protocol_base.addr === '' ? 1 : 0;
  ctx.subChain_base.create_new = state.subChain_base.addr === '' ? 1 : 0;
};

module.exports = findNewContracts;
