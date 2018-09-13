const cp = require('child_process');
const cpStdoToFile = require('../../util/child_process_stdo_to_file');

/**
 * @typedef FuelOfRPCRunnable
 * @property {string} moacDirPath - containing dir's path
 * @property {string} moacFileName - executable's file name
 * @property {string} chainId
 * @property {string} rpcApi
 * @property {boolean} mine
 */

/**
 * Run node with RPC
 *
 * @param {string} nodeDirPath - dir path of vnode datadir
 * @param {string} rpcAddr - RPC address
 * @param {number} rpcPort - RPC port
 * @param {FuelOfRPCRunnable} cfg - config object providing necessary information
 * @throws error produced by spawn's 'error' event
 * @return {Promise<VnodeRpc>}
 */
module.exports = (nodeDirPath, rpcAddr, rpcPort, cfg) =>
  new Promise(res => {
    let osMoacDirPath;
    let osNodeDirPath;
    let localMoacFileName;
    switch (process.platform) {
      // TO DO
      // case "win32":
      //   break;
      default:
        osMoacDirPath = cfg.moacDirPath;
        osNodeDirPath = nodeDirPath;
        localMoacFileName = cfg.moacFileName;
        break;
    }

    const argList = [
      '--datadir',
      osNodeDirPath,
      '--rpc',
      // '--nodiscover',
      '--verbosity',
      cfg.verbosity,
      '--rpcapi',
      cfg.rpcApi,
      '--rpcaddr',
      rpcAddr,
      '--rpcport',
      `${rpcPort}`
    ];

    switch (cfg.chainId) {
      // testnet
      case '101':
        console.log(`for testnet, use "--testnet"`);
        argList.push('--testnet');
        break;
      // mainnet
      case '99':
        console.log(`for mainnet, no "--networkid" needed`);
        break;
      // private net
      default:
        argList.push('--networkid');
        argList.push(cfg.chainId);
    }

    if (cfg.mine) {
      argList.push('--mine');
      // this indicates a private chain node, no connection need
      argList.push('--nodiscover');
    }

    const spawned = cp.spawn(osMoacDirPath + localMoacFileName, argList);

    cpStdoToFile().pipeToLogFile(spawned);

    spawned.on('error', err => {
      console(`vnode with datadir "${osNodeDirPath} failed to run"`);
      throw err;
    });

    res({
      datadirPath: osNodeDirPath,
      childProcess: spawned
    });
  });
