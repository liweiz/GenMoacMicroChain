const emitter = require('./state_update_emitter');
const initialState = require('../../process_state.json');

// save to file after a value is set
const isSettingProp = {
  set(target, prop, value) {
    console.log(`state updated: ${prop} = ${value}`);
    target[prop] = value;
    emitter.emit('state updated', prop, value);
    return true;
  }
};

const state = initialState;

const scsNodesProxy = new Proxy(initialState.scs_nodes, isSettingProp);
state.scs_nodes = scsNodesProxy;

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

module.exports = stateProxy;
