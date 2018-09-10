const genOfNodeCallFunc = require('./gen_of_node_call_contract_func');
const ctx = require('../../context/process_ctx_proxy');

const nodeRegisterCloseCall = genOfNodeCallFunc(
  'registerClose',
  ctx.state.subChain_base.contract_name,
  0
);

module.exports = nodeRegisterCloseCall;
