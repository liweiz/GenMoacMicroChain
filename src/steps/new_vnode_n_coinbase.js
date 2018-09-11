const cp = require('child_process');
const cpStdoToFile = require('../util/child_process_stdo_to_file');
const preCfg = require('../../config.json');
const ctx = require('../context/process_ctx_proxy');
const rpc = require('../vnode/rpc_connector');
const sleep = require('../util/sleep');

/**
 * @typedef FuelOfRPCRunnable
 * @property {string} moacDirPath
 * @property {string} moacFileName
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
 * @return {Promise<VnodeRpc>}
 */
const runVnode = (nodeDirPath, rpcAddr, rpcPort, cfg) =>
  new Promise(res => {
    let osMoacDirPath;
    let osNodeDirPath;
    let fileNameMoac;
    switch (process.platform) {
      // TO DO
      // case "win32":
      //   break;
      default:
        osMoacDirPath = cfg.moacDirPath; // cfgObj.mac.moac_dir_path;
        osNodeDirPath = nodeDirPath;
        fileNameMoac = cfg.moacFileName; // cfgObj.mac.moac_file_name;
        break;
    }

    const argList = [
      '--datadir',
      osNodeDirPath,
      '--rpc',
      '--nodiscover',
      '--verbosity',
      ctx.state.vnode.log_verbosity,
      '--rpcapi',
      cfg.rpcApi, // cfgObj.rpc.api
      '--rpcaddr',
      rpcAddr,
      '--rpcport',
      `${rpcPort}`,
      '--rpccorsdomain',
      'http://wallet.moac.io'
    ];

    switch (ctx.state.vnode.chain_id) {
      case 101:
        argList.push('--testnet');
        break;
      case 99:
        break;
      default:
        argList.push('--networkid');
        argList.push(ctx.state.vnode.chain_id);
    }

    if (cfg.mine) {
      argList.push('--mine');
    }

    const spawned = cp.spawn(osMoacDirPath + fileNameMoac, argList);

    cpStdoToFile().pipeToLogFile(spawned);

    res({
      datadirPath: osNodeDirPath,
      childProcess: spawned
    });
  });

const preconfigured = nodeDirPath =>
  runVnode(nodeDirPath, ctx.state.vnode.rpc.addr, ctx.state.vnode.rpc.port, {
    moacDirPath: preCfg.mac.moac_dir_path,
    moacFileName: preCfg.mac.moac_file_name,
    rpcApi: ctx.state.vnode.rpc.api,
    mine: false
  });

const run = async () => {
  const output = await preconfigured(preCfg.mac.datadir_path);
  await sleep(8000);
  const chain3 = await rpc(
    `${ctx.state.vnode.rpc.addr}:${ctx.state.vnode.rpc.port}`
  );
  const coinbase = chain3.personal.newAccount(ctx.state.default_password);
  console.log(`coinbase, ${coinbase}, created for newly created vnode`);
  return new Promise(res => {
    output.childProcess.on('exit', () => {
      console.log(`vnode closed`);
      res({
        coinbase,
        datadir: preCfg.mac.datadir_path
      });
    });
    output.childProcess.kill('SIGINT');
  });
};

run();
