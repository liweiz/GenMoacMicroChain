const ensureReady = require('./ensure_node_w_rpc_ready');
const cfg = require('.././../../config.json');
const ctx = require('../../context/process_ctx_proxy');

/**
 * launch vnode with RPC in preset datadir in ./config.json
 *
 * @param {boolean} [mining=false] - mining or not
 */
module.exports = async (mining = false) => {
  let aDatadir;
  switch (process.platform) {
    case 'win32':
      // TO DO
      break;
    default:
      switch (ctx.state.vnode.datadir_setting) {
        case 'mainnet':
          aDatadir = process.env.HOME + cfg.mac.vnode.datadir.default_mainnet;
          break;
        case 'testnet':
          aDatadir = process.env.HOME + cfg.mac.vnode.datadir.default_testnet;
          break;
        case 'user_supplied':
          aDatadir = cfg.mac.vnode.datadir.user_supplied;
          break;
        default:
          throw Error(
            `"vnode.datadir_setting" in state_process.json has to be "mainnet"/"testnet"/"user_supplied", "${
              ctx.state.vnode.datadir_setting
            }" is not defined`
          );
      }

      break;
  }
  console.log(`vnode datadir: ${aDatadir}`);
  return ensureReady(aDatadir, mining);
};
