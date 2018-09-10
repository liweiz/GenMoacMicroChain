const intro = require('./step_intro_w_pause');
const styleIntro = require('./style_intro');

const styledIntro = async operationTreeNode =>
  intro(operationTreeNode, operationTreeNode.sideWorkDescription, styleIntro);

module.exports = styledIntro;
