const ctx = require('../../context/process_ctx_proxy');

/**
 * start depth first postorder traversal from given node to generate each node
 *
 * @param {OperationNode} node
 * @throws error thrown by traversed node's genKids
 */
const genKidsFrom = async node => {
  try {
    if (typeof node.genKids !== 'undefined') {
      await node.genKids(ctx);
      if (node.kids.length > 0) {
        for (let i = 0; i < node.kids.length; i += 1) {
          const kid = node.kids[i];
          await genKidsFrom(kid);
        }
      }
    }
  } catch (err) {
    throw err;
  }
};

module.exports = genKidsFrom;
