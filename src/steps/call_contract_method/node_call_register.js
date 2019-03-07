const genOfNodeCallFunc = require('./gen_of_node_call_contract_func');
const ctx = require('../../context/process_ctx_proxy');

const nodeRegister = genOfNodeCallFunc(
  'register',
  ctx.state.vnode_protocol_base.contract_name,
  ctx.state.vnode_protocol_base.min_bond
);

module.exports = nodeRegister;
