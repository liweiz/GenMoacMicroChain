const ensureReady = require('./ensure_node_w_rpc_ready');
const cfg = require('.././../../config.json');

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
      aDatadir = cfg.mac.vnode.datadir;
      break;
  }
  return ensureReady(aDatadir, mining);
};
