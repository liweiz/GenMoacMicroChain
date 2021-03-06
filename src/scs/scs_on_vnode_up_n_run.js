const cp = require('child_process');
const fs = require('fs');
const path = require('path');
const cfg = require('../../config.json');
const ensureDirsOnPath = require('../util/ensure_dirs_on_path_exist');
const genUserconfig = require('./gen_userconfig');
const cpStdoToFile = require('../util/child_process_stdo_to_file');
const catchScsids = require('../util/watch_n_report_new_addrs.js');
const ctx = require('../context/process_ctx_proxy');

let scsserverDirPath;
let scsNodesDirPath;
let scsserverFileName;
let currentDirRelativeForm;
switch (process.platform) {
  case 'win32':
    // TO DO
    scsserverFileName = cfg.win32.scsserver_file_name;
    currentDirRelativeForm = cfg.win32.current_dir_relative_form;
    break;
  default:
    scsserverDirPath = cfg.mac.scsserver_executable_to_copy.dir_path;
    scsNodesDirPath = cfg.mac.scs_nodes.dir_path;
    scsserverFileName = cfg.mac.scsserver_executable_to_copy.name;
    currentDirRelativeForm = cfg.mac.current_dir_relative_form;
    break;
}

/**
 * Setup scs node from scratch and run
 *
 * @param {string} scsNodeName - name of the scs node
 * @param {string} address - account address of beneficiary
 * @param {int} monitorType - zero, if the scs node is not used as a monitor.
 *                            one, if the scs node is used as a normal monitor.
 *                            two, if the scs node is used as a debug monitor.
 *                            default is zero.
 * @returns {Promise<string>}
 */
module.exports = async (scsNodeName, address, monitorType = 0) => {
  // generate userconfig.json
  // 1. create dir for a specific scs and its config respectively
  const nodeDirPath = scsNodesDirPath + scsNodeName + path.sep;
  const nodeBinDirPath = `${nodeDirPath}bin${path.sep}`;
  const nodeLogDirPath = `${nodeBinDirPath}_logs${path.sep}`;
  const userconfigDirPath = `${nodeDirPath}config${path.sep}`;
  const scsKeystorePart = `${path.sep}bin${path.sep}scskeystore${path.sep}`;
  ensureDirsOnPath(nodeBinDirPath);
  ensureDirsOnPath(userconfigDirPath);
  await genUserconfig(address, `${userconfigDirPath}userconfig.json`);
  // 2. copy scsserver to scs node specific dir
  fs.copyFileSync(
    scsserverDirPath + scsserverFileName,
    nodeBinDirPath + scsserverFileName
  );
  fs.copyFileSync(
    `${userconfigDirPath}userconfig.json`,
    `${nodeBinDirPath}userconfig.json`
  );

  const keystoreDirPath = scsNodesDirPath + scsNodeName + scsKeystorePart;

  return new Promise((res, rej) => {
    catchScsids(keystoreDirPath).then(ssids => {
      console.log(
        `new local scs node created at '${path.resolve(nodeDirPath)}'`
      );
      console.log(
        `log file for new local scs node is at '${path.resolve(
          nodeLogDirPath
        )}'`
      );
      res(ssids[0]);
    });

    // 3. has to get into the node's bin dir and run
    var argList;
    switch (monitorType) {
      case 0:
        argList = [];
        break;
      case 1:
        argList = [
          '--rpc',
          '--rpcaddr',
          ctx.state.scs_nodes.monitor_rpc_addr,
          '--rpcport',
          ctx.state.scs_nodes.monitor_rpc_port
        ];
        break;
      case 2:
        argList = [
          '--rpcdebug',
          '--rpcaddr',
          ctx.state.scs_nodes.monitor_rpcdebug_addr,
          '--rpcport',
          ctx.state.scs_nodes.monitor_rpcdebug_port
        ];
        break;
      default:
        throw Error(
          `monitor type "${monitorType}" is not among existing ones. Available options: 0, 1, 2.`
        );
    }

    const spawned = cp.spawn(
      currentDirRelativeForm + scsserverFileName,
      argList,
      {
        cwd: nodeBinDirPath
      }
    );
    cpStdoToFile().pipeToLogFile(spawned);
    spawned.on('exit', () => {
      // TO DO
    });
    spawned.on('error', e => {
      rej(e);
    });
  });
};
