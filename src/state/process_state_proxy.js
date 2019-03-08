const emitter = require('./state_update_emitter');
const initialState = require('../../process_state.json');
const saveToFile = require('./write_state_to_file');
const logger = require('../util/logger');

// save to file after a value is set
const isSettingProp = {
  set(target, prop, value) {
    target[prop] = value;
    emitter.emit('state updated', prop, value);
    return true;
  }
};

const state = initialState;

const scsNodesProxy = new Proxy(initialState.scs_nodes, isSettingProp);
state.scs_nodes = scsNodesProxy;

const scsTestCoinFuncCallProxy = new Proxy(
  initialState.test_coin.successful_func_call,
  isSettingProp
);
state.test_coin.successful_func_call = scsTestCoinFuncCallProxy;

const scsTestCoinProxy = new Proxy(
  initialState.test_coin,
  isSettingProp
);
state.test_coin = scsTestCoinProxy;

const scsVnodeProtocolBaseFuncCallProxy = new Proxy(
  initialState.vnode_protocol_base.successful_func_call,
  isSettingProp
);
state.vnode_protocol_base.successful_func_call = scsVnodeProtocolBaseFuncCallProxy;

const scsVnodeProtocolBaseProxy = new Proxy(
  initialState.vnode_protocol_base,
  isSettingProp
);
state.vnode_protocol_base = scsVnodeProtocolBaseProxy;

const scsSubChainProtocolBaseFuncCallProxy = new Proxy(
  initialState.subChain_protocol_base.successful_func_call,
  isSettingProp
);
state.subChain_protocol_base.successful_func_call = scsSubChainProtocolBaseFuncCallProxy;

const scsSubChainProtocolBaseProxy = new Proxy(
  state.subChain_protocol_base,
  isSettingProp
);
state.subChain_protocol_base = scsSubChainProtocolBaseProxy;

const scsSubChainBaseFuncCallProxy = new Proxy(
  initialState.subChain_base.successful_func_call,
  isSettingProp
);
state.subChain_base.successful_func_call = scsSubChainBaseFuncCallProxy;

const scsSubChainBaseProxy = new Proxy(state.subChain_base, isSettingProp);
state.subChain_base = scsSubChainBaseProxy;

const stateProxy = new Proxy(state, isSettingProp);

if (stateProxy.auto_state_save) {
  // number of updates received via 'state updated' event
  let numOfUpdates = 0;
  // number of updates is being written to file
  let numWriting = 0;

  const triggerSaveToFile = () => {
    numWriting = numOfUpdates;
    if (numWriting > 0) {
      saveToFile(stateProxy);
      numOfUpdates -= numWriting;
      numWriting = 0;
      if (numOfUpdates > 0) {
        triggerSaveToFile();
      }
    }
  };

  emitter.on('state updated', (prop, value) => {
    logger.info(`change in state: "${prop}" = "${value}"`);
    numOfUpdates += 1;
    if (numWriting === 0) {
      triggerSaveToFile();
    }
  });
}

module.exports = stateProxy;
