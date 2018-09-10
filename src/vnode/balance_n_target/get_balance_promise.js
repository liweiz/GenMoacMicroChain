/**
 * promise wrapper of Chain3.getBalance
 *
 * @param {Chain3} chain3
 * @param {string} addr
 * @returns {Promise<number>}
 */
const getBalanceInSha = (chain3, addr) =>
  new Promise((res, rej) => {
    chain3.mc.getBalance(addr, (err, value) => {
      if (err !== null || err) {
        rej(err);
      } else {
        res(value);
      }
    });
  });

module.exports = getBalanceInSha;
