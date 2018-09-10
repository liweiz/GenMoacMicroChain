const sleep = require('../../util/sleep');

const sideWork = async ctx => {
  await sleep(ctx.state.interval_between_rpc_calls_ms);
  ctx.vnode.chain3.personal.unlockAccount(
    ctx.vnode.sending_addr,
    ctx.state.default_password,
    30 * 60
  );
};

const nodeUnlockSendingAddrWDefault = rawNode => {
  rawNode.setSideWork(sideWork);
  rawNode.sideWorkDescription = 'unlock sending address for 30 mins';

  return rawNode;
};

module.exports = nodeUnlockSendingAddrWDefault;
