module.exports = state => ({
  subChainBase: {
    path: state.subChain_base.sol_path,
    name: state.subChain_base.contract_name,
    params: [
      state.subChain_protocol_base.addr,
      state.vnode_protocol_base.addr,
      state.subChain_base.min_num_nodes,
      state.subChain_base.max_num_nodes,
      state.subChain_base.thousandth,
      state.subChain_base.flush_round
    ]
  }
});
