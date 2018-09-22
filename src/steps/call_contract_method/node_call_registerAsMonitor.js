const genOfNodeCallFunc = require('./gen_of_node_call_contract_func');
const ctx = require('../../context/process_ctx_proxy');

const nodeRegisterAsMonitorCall = genOfNodeCallFunc(
  'registerAsMonitor',
  ctx.state.subChain_base.contract_name,
  ctx.state.subChain_protocol_base.min_bond
);

module.exports = nodeRegisterAsMonitorCall;
