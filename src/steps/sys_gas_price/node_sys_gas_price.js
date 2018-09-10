const sysPrice = require('./gas_price_checker');

const getPrice = async ctx => {
  try {
    const price = await sysPrice(ctx.vnode.chain3);
    ctx.vnode.sys_gas_price = price;
  } catch (err) {
    throw err;
  }
};

const setPrice = rawNode => {
  rawNode.sideWorkDescription = 'get system gas price on chain';
  rawNode.setSideWork(getPrice);
  return rawNode;
};

module.exports = setPrice;
