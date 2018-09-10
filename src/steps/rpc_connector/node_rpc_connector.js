const rpc = require('../../vnode/rpc_connector');

const rpcConn = rawNode => {
  /**
   * node getting working Chain3 instance
   *
   * @param {CTX} ctx
   * @throws Chain3 connection error
   */
  const getChain3 = async ctx => {
    const endpoint = `${ctx.state.vnode.rpc.addr}:${ctx.state.vnode.rpc.port}`;
    try {
      const chain3 = await rpc(endpoint);
      ctx.vnode.chain3 = chain3;
    } catch (err) {
      throw err;
    }
  };

  rawNode.sideWorkDescription = 'connect to RPC endpoint';
  rawNode.setSideWork(getChain3);

  return rawNode;
};

module.exports = rpcConn;
