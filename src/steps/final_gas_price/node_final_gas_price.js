const finalPrice = require('./final_gas_price');

const setPrice = rawNode => {
  rawNode.sideWorkDescription = 'choose gas price to use on chain';
  rawNode.setSideWork(ctx => {
    finalPrice(ctx);
  });
  return rawNode;
};

module.exports = setPrice;
