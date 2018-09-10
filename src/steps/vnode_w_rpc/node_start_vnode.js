const start = require('./start_vnode');

const startVnode = rawNode => {
  /**
   * launch a vnode
   *
   * @param {object} ctx
   */
  const launchVnode = async ctx => {
    try {
      console.log(`ctx.vnode.mining: ${ctx.vnode.mining}`);
      const vnodeRpc = await start(ctx.state, ctx.vnode.mining);
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
