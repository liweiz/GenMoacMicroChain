const start = require('../../vnode/node_w_rpc/ensure_preset_node_w_rpc_ready');

const startVnode = rawNode => {
  /**
   * launch a vnode
   *
   * @param {object} ctx
   */
  const launchVnode = async ctx => {
    try {
      console.log(`vnode will perform mining: ${ctx.vnode.mining}`);
      const vnodeRpc = await start(ctx.vnode.mining);
      ctx.vnode.process = vnodeRpc.childProcess;
    } catch (err) {
      throw err;
    }
  };

  rawNode.sideWorkDescription = 'start vnode w RPC';
  rawNode.setSideWork(launchVnode);

  return rawNode;
};

module.exports = startVnode;
