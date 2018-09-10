/**
 * sleep N ms
 *
 * @param {number} ms
 * @returns {Promise.<any>}
 */
module.exports = ms =>
  new Promise(res => {
    setTimeout(() => {
      res();
    }, ms);
  });
