import { state } from '../context/process_ctx_proxy';

const logger = require('../util/logger');

const emitter = require('./state_update_emitter');
const saveToFile = require('./write_state_to_file');

let numOfUpdates = 0;
let numWriting = 0;

const triggerSaveToFile = () => {
  numWriting = numOfUpdates;
  if (numWriting > 0) {
    saveToFile(state);
    numOfUpdates -= numWriting;
    numWriting = 0;
    if (numWriting > 0) {
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
