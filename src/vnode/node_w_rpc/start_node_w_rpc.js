const cp = require('child_process');
const cpStdoToFile = require('../../util/child_process_stdo_to_file');

/**
 * @typedef FuelOfRPCRunnable
 * @property {string} moacDirPath
 * @property {string} moacFileName
 * @property {string} chainId
 * @property {string} rpcApi
 * @property {boolean} mine
 */

/**
 * Run node with RPC and mining
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
        osMoacDirPath = cfg.moacDirPath; // cfgObj.mac.moac_dir_path;
        osNodeDirPath = nodeDirPath;
        localMoacFileName = cfg.moacFileName; // cfgObj.mac.moac_file_name;
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
      cfg.rpcApi, // cfgObj.rpc.api
      '--rpcaddr',
      rpcAddr,
      '--rpcport',
      `${rpcPort}`
    ];

    switch (cfg.chainId) {
      case 101:
        argList.push('--testnet');
        break;
      case 99:
        break;
      default:
        argList.push('--networkid');
        argList.push(cfg.chainId);
    }

    if (cfg.mine) {
      argList.push('--mine');
      // this indicates a private chain node
      argList.push('--nodiscover');
    }

    const spawned = cp.spawn(osMoacDirPath + localMoacFileName, argList);

    cpStdoToFile().pipeToLogFile(spawned);

    spawned.on('error', err => {
      throw err;
    });

    res({
      datadirPath: osNodeDirPath,
      childProcess: spawned
    });
  });
