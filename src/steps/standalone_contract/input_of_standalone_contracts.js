module.exports = state => ({
  vnodeProtocolBase: {
    path: state.vnode_protocol_base.sol_path,
    name: state.vnode_protocol_base.contract_name,
    params: [state.vnode_protocol_base.name, state.vnode_protocol_base.min_bond]
  },
  subChainProtocolBase: {
    path: state.subChain_protocol_base.sol_path,
    name: state.subChain_protocol_base.contract_name,
    params: [
      state.subChain_protocol_base.name,
      state.subChain_protocol_base.min_bond,
      state.subChain_protocol_base.protocol_type
    ]
  }
});
