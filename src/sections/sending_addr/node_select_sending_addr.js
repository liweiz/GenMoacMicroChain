const selectSendingAddr = require('../../util/select_n_unlock_account');

const sideWork = async ctx => {
  const { chain3 } = ctx.vnode;
  try {
    if (chain3 !== null) {
      const sendingAddr = await selectSendingAddr(chain3);
      ctx.vnode.sending_addr = sendingAddr;
    } else {
      throw Error('Chain3 instance not set at ctx.vnode.chain3');
    }
  } catch (err) {
    throw err;
  }
};

const nodeSendingAddr = rawNode => {
  rawNode.setSideWork(sideWork);
  rawNode.sideWorkDescription = 'select account operating in process';
  return rawNode;
};

module.exports = nodeSendingAddr;
