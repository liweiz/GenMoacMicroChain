const fs = require('fs');
const logger = require('../util/logger');

const writeStateToFile = state => {
  const content = JSON.stringify(state);
  fs.writeFileSync('./process_state.json', content, 'utf8');
  logger.info('updated process state saved to file');
};

module.exports = writeStateToFile;
