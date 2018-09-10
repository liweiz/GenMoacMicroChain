const ctx = require('../../context/process_ctx_proxy');
const styledIntro = require('../styled_intro');

/**
 * start depth first postorder traversal from given node, run sideWork to turn
 * traversed node green
 *
 * @param {OperationNode} node
 * @throws error thrown by traversed node's sideWork
 */
const traverseFrom = async node => {
  try {
    if (!node.isGreen) {
      styledIntro(node);
      if (node.kids.length > 0) {
        for (let i = 0; i < node.kids.length; i += 1) {
          const kid = node.kids[i];
          await traverseFrom(kid);
        }
      }
      await node.sideWork(ctx);
    }
  } catch (err) {
    throw err;
  }
};

module.exports = traverseFrom;
