const finalPrice = ctx => {
  const sysPrice = ctx.vnode.sys_gas_price;
  const userPriceMin = ctx.state.gas_price_gsha.min;
  const userPriceMax = ctx.state.gas_price_gsha.max;
  if (sysPrice > userPriceMax) {
    return userPriceMax;
  }

  if (sysPrice < userPriceMin) {
    return sysPrice;
  }

  return userPriceMin;
};

module.exports = ctx => {
  ctx.vnode.gas_price_to_use = finalPrice(ctx);
};
