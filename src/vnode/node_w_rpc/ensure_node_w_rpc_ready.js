const cfg = require('../../../config.json');
const ctx = require('../../context/process_ctx_proxy');
const sleep = require('../../util/sleep');
const start = require('./start_node_w_rpc');

/**
 * Run node with RPC
 *
 * @param {string} datadirPath - dir path of vnode datadir
 * @param {boolean} [mining=false] - to mine or not
 * @param {number} [ms=8000] - ms to wait for RPC ready
 * @return {Promise<VnodeRpc>}
 */
module.exports = async (datadirPath, mining = false, ms = 8000) => {
  const { vnode } = ctx.state;
  let dirPathMoac;
  let fileNameMoac;
  switch (process.platform) {
    case 'win32':
      // TO DO

      break;
    default:
      dirPathMoac = cfg.mac.moac_executable_to_run.dir_path;
      fileNameMoac = cfg.mac.moac_executable_to_run.name;
      break;
  }
  const nodeRpc = await start(datadirPath, vnode.rpc.addr, vnode.rpc.port, {
    moacDirPath: dirPathMoac,
    moacFileName: fileNameMoac,
    chainId: `${vnode.chain_id}`,
    rpcApi: vnode.rpc.api,
    mine: mining,
    verbosity: `${vnode.log_verbosity}`
  });
  console.log(`wait ${ms / 1000} seconds for vnode ready`);
  await sleep(ms);
  return nodeRpc;
};
