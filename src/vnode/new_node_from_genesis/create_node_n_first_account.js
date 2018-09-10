const ctx = require('../../context/process_ctx_proxy');
const lanuchRPC = require('../node_w_rpc/ensure_node_w_rpc_ready');
const rpc = require('../rpc_connector');
const createNode = require('./create_new_node');

/**
 * @typedef NodeDatadirNCoinbase
 * @property {string} coinbase
 * @property {string} datadir
 */

/**
 * Create vnode and an account
 *
 * @param {string} passcode
 * @returns {Promise<NodeDatadirNCoinbase>}
 */
module.exports = async passcode => {
  try {
    const objWDatadirPath = await createNode(ctx.state.vnode.name);

    const rpcNoMining = await lanuchRPC(objWDatadirPath.datadirPath);
    const chain3 = await rpc(
      `${ctx.state.vnode.rpc.addr}:${ctx.state.vnode.rpc.port}`
    );
    const coinbase = chain3.personal.newAccount(passcode);
    return new Promise(res => {
      rpcNoMining.childProcess.on('exit', () => {
        console.log(`vnode closed`);
        res({
          coinbase,
          datadir: objWDatadirPath.datadirPath
        });
      });
      rpcNoMining.childProcess.kill('SIGINT');
    });
  } catch (err) {
    throw err;
  }
};
