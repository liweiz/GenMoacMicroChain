const fs = require('fs');
const path = require('path');

/**
 *
 *
 * @param {string} targetDir
 * @param {boolean} [isRelativeToScript=false]
 */
const mkDirByPathSync = (targetDir, isRelativeToScript = false) => {
  const { sep } = path;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    return curDir;
  }, initDir);
};

module.exports = mkDirByPathSync;