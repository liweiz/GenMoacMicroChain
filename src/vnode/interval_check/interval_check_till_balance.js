const intervalCheckTill = require('./interval_check_till_prepared');

// TO DO: more detailed comparison since gas fee comes into play here
/**
 * Interval check till the target balance reached
 *
 * when check receiver: balance shoud be >= before + delta
 * when check sender: balance shoud be <= before - delta
 *
 * @param {string} address - account address to check
 * @param {number} deltaInSha- target delta in sha
 * @param {number} [balanceBeforeInSha=0] - balance before check in sha
 * @return {Promise<boolean>}
 */
module.exports = (chain3, address, deltaInSha, balanceBeforeInSha = 0) =>
  intervalCheckTill(
    chain3,
    aChain3 => aChain3.mc.getBalance(address),
    balanceInSha => {
      console.log(
        `balance target moac, ${address}, ${(balanceBeforeInSha + deltaInSha) /
          10 ** 18}`
      );
      console.log(`balance now moac, ${address}, ${balanceInSha / 10 ** 18}`);
      return deltaInSha > 0
        ? balanceInSha >= balanceBeforeInSha + deltaInSha
        : balanceInSha <= balanceBeforeInSha + deltaInSha;
    }
  );
