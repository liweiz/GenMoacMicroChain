const genOfNodeCallFunc = require('./gen_of_node_call_contract_func_n_times');
const ctx = require('../../context/process_ctx_proxy');

const genOfNodeRegisterCall = genOfNodeCallFunc(
  'register',
  ctx.state.subChain_protocol_base.contract_name,
  ctx.state.subChain_protocol_base.min_bond
);

module.exports = genOfNodeRegisterCall;
