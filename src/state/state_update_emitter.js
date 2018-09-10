const EventEmitter = require('events');

class PropSetEmitter extends EventEmitter {}

const propSetEmitter = new PropSetEmitter();

module.exports = propSetEmitter;
