const cfg = require('../../../config.json');
const sleep = require('../../util/sleep');
const start = require('../../vnode/node_w_rpc/start_node_w_rpc');

/**
 * Run node with RPC and mining
 *
 * @param {object} state
 * @param {boolean} [mining=false] - to mine or not
 * @param {number} [ms=8000] - ms to wait for RPC ready
 * @throws vnode start error
 * @return {Promise<VnodeRpc>}
 */
module.exports = async (state, mining = false, ms = 8000) => {
  let datadirPath;
  switch (process.platform) {
    case 'win32':
      // TO DO

      break;
    default:
      datadirPath = cfg.mac.datadir_path;
      break;
  }
  try {
    const nodeRpc = await start(
      datadirPath,
      state.vnode.rpc.addr,
      state.vnode.rpc.port,
      {
        moacDirPath: cfg.mac.moac_dir_path,
        moacFileName: cfg.mac.moac_file_name,
        chainId: `${state.vnode.chain_id}`,
        rpcApi: state.vnode.rpc.api,
        verbosity: `${state.vnode.log_verbosity}`,
        mine: mining
      }
    );
    console.log(`wait ${ms / 1000} seconds for vnode ready`);
    await sleep(ms);
    return nodeRpc;
  } catch (err) {
    throw err;
  }
};
