const ctxOg = require('./process_ctx');
const logger = require('../util/logger');
const emitter = require('../state/state_update_emitter');

// TO DO: add defensive guard for accessing unset props
// const ctxNotReadyDefault = {
//   null: ['instance', 'chain3', 'process'],
//   emptyStr: ['sending_addr'],
//   zero: ['sys_gas_price', 'gas_price_to_use']
// };

// log after a value is set
const isSettingProp = {
  set(target, prop, value) {
    target[prop] = value;
    emitter.emit('ctx updated', prop, value);
    return true;
  }
};

const ctx = ctxOg;

const vnodeProxy = new Proxy(ctx.vnode, isSettingProp);
ctx.vnode = vnodeProxy;

const totalCostProxy = new Proxy(ctx.total_cost_in_sha, isSettingProp);
ctx.total_cost_in_sha = totalCostProxy;

const scsProxy = new Proxy(ctx.scs_nodes, isSettingProp);
ctx.scs_nodes = scsProxy;

const testCoinProxy = new Proxy(ctx.test_coin, isSettingProp);
ctx.test_coin = testCoinProxy;

const vnodeProtocolProxy = new Proxy(ctx.vnode_protocol_base, isSettingProp);
ctx.vnode_protocol_base = vnodeProtocolProxy;

const subChainProtocolProxy = new Proxy(
  ctx.subChain_protocol_base,
  isSettingProp
);
ctx.subChain_protocol_base = subChainProtocolProxy;

const subChainProxy = new Proxy(ctx.subChain_base, isSettingProp);
ctx.subChain_base = subChainProxy;

const ctxProxy = new Proxy(ctx, isSettingProp);

emitter.on('ctx updated', (prop, value) => {
  logger.info(`change in context: "${prop}" = "${value}"`);
});

module.exports = ctxProxy;
