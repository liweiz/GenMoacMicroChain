const genOfNodeCallFunc = require('./gen_of_node_call_contract_func');
const ctx = require('../../context/process_ctx_proxy');

const nodeAddFundCall = genOfNodeCallFunc(
  'addFund',
  ctx.state.subChain_base.contract_name,
  ctx.state.subChain_base.min_op_balance_in_moac
);

module.exports = nodeAddFundCall;
