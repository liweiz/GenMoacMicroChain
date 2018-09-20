const inquirer = require('inquirer');
const ctx = require('../context/process_ctx_proxy');
const sleep = require('./sleep');
const getBalance = require('../vnode/balance_n_target/get_balance_promise');
const checkSendingAddrQualification = require('../vnode/balance_n_target/single_balance_check');

const accountSelection = async chain3 => {
  try {
    await sleep(ctx.state.interval_between_rpc_calls_ms);
    const accounts = await new Promise(res => {
      chain3.mc.getAccounts((err, addrs) => {
        if (err !== null || err) {
          throw err;
        }
        res(addrs);
      });
    });
    // balancesInMoac: number[]
    if (accounts.length > 0) {
      console.log(`checking each account balance on vnode, please be patient`);
    } else {
      throw Error(
        `there is no account on the vnode, please create one with enough fund and restart the process`
      );
    }
    const balancesInMoac = [];
    for (let i = 0; i < accounts.length; i += 1) {
      const account = accounts[i];
      await sleep(ctx.state.interval_between_rpc_calls_ms);
      const balance = await getBalance(chain3, account);
      balancesInMoac.push(balance / 10 ** 18);
    }
    const toDisplay = [];
    for (let i = 0; i < accounts.length; i += 1) {
      toDisplay.push({
        name: `${accounts[i]}: ${balancesInMoac[i]}`,
        value: accounts[i]
      });
    }
    const selection = async () => {
      const answers0 = await inquirer.prompt([
        {
          name: 'select_sending_account',
          type: 'list',
          message: 'Please select the account for sending all trasactions.',
          choices: toDisplay
        }
      ]);
      const sendingAccount = answers0.select_sending_account;

      const answers1 = await inquirer.prompt([
        {
          name: 'confirm_sending_account_selection',
          type: 'confirm',
          message: `Please confirm account ${sendingAccount} will be used.`,
          default: false
        }
      ]);
      if (answers1.confirm_sending_account_selection) {
        return sendingAccount;
      }
      return selection();
    };

    const sendingAccount = await selection();

    await checkSendingAddrQualification(
      chain3,
      sendingAccount,
      ctx.total_cost_in_sha.required_for_sending_addr
    );

    const unlock = async () => {
      const answers2 = await inquirer.prompt([
        {
          name: 'unlock_sending_account',
          type: 'password',
          message: `Please input your password here to unlock account ${sendingAccount} for 30 minutes.`
        }
      ]);
      await sleep(ctx.state.interval_between_rpc_calls_ms);
      if (
        chain3.personal.unlockAccount(
          sendingAccount,
          answers2.unlock_sending_account,
          30 * 60
        )
      ) {
        return true;
      }
      return unlock();
    };

    if (await unlock()) {
      return sendingAccount;
    }
    throw Error(`account ${sendingAccount} unlock failed`);
  } catch (err) {
    throw err;
  }
};

module.exports = accountSelection;
