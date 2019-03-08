const initialStateProxy = require('../state/process_state_proxy');

// const stateProxy = new Proxy(initialState, )

module.exports = {
  state: initialStateProxy,
  vnode: {
    get mining() {
      // only mine when on controllable private and local chain
      return initialStateProxy.private_n_local_run;
    },
    sending_addr: '',
    // child process running process launched vnode
    process: null,
    chain3: null,
    sys_gas_price: 0,
    gas_price_to_use: 0
  },
  total_cost_in_sha: {
    original: 0,
    required_for_sending_addr: 0
  },
  scs_nodes: {
    total_num: 0,
    num_of_new: 0,
    need_funding: []
  },
  test_coin: {
    create_new: 0,
    instance: null
  },
  vnode_protocol_base: {
    create_new: 0,
    instance: null
  },
  subChain_protocol_base: {
    create_new: 0,
    instance: null
  },
  subChain_base: {
    create_new: 0,
    instance: null,
    blk_no_register_open: 0
  }
};
