const cp = require('child_process');
const cfg = require('../../../config.json');
const cpStdoToFile = require('../../util/child_process_stdo_to_file');

/**
 * Initialize a vnode
 *
 * @returns {Promise<VnodeRpcUp>} - resolve: object with datadirPath field
 */
module.exports = () =>
  new Promise((res, rej) => {
    let moacPath;
    let datadirPath;
    let genesisPath;
    switch (process.platform) {
      // TO DO
      case 'win32':
        break;
      default:
        moacPath =
          cfg.mac.moac_executable_to_run.dir_path +
          cfg.mac.moac_executable_to_run.name;
        datadirPath = cfg.mac.vnode.datadir.user_supplied;
        genesisPath = `${cfg.mac.vnode.genesis_dir_path}genesis.json`;
        break;
    }

    const spawned = cp.spawn(moacPath, [
      '--datadir',
      datadirPath,
      'init',
      genesisPath
    ]);

    cpStdoToFile().pipeToLogFile(spawned);

    spawned.on('exit', code => {
      switch (code) {
        case 0:
          res({
            datadirPath
          });
          break;
        default:
          rej(
            new Error(
              `vnode init Failed for: ${datadirPath}, exit code: ${code}`
            )
          );
          break;
      }
    });
  });
