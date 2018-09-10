// const styledIntro = require('../styled_intro');
const ctx = require('../../context/process_ctx_proxy');

/**
 * @typedef OperationNode
 * @property {OperationNode | null} parent
 * @property {OperationNode[]} kids
 * @property {function(CTX): void} genKids - create all kids, add them to kids
 * @property {boolean} isGreen
 * @property {boolean} isRoot
 * @property {function(string, function(CTX): void): void} setSideWork -
 * sideWork setter
 * @property {string} [sideWorkDescription=''] - description of what sideWork does
 * @property {function(): void} sideWork - turn node green after passed in work
 * done
 */

/**
 * @typedef CTX
 * the object from process_ctx.json
 */

/**
 * create a node without minimun properties which make the node still raw
 *
 * @param {OperationNode | null} parentNode
 * @param {boolean} [isRoot=false]
 * @returns
 */
const genRawNode = (parentNode, isRoot = false) => {
  const someNode = {
    parent: parentNode,
    isGreen: false,
    kids: [],
    isRoot
  };

  someNode.sideWorkDescription = '';

  const defaultSideWork = async () => {
    // styledIntro(someNode);

    console.log(`${someNode.sideWorkDescription}, DONE`);
    someNode.isGreen = true;
  };

  someNode.sideWork = defaultSideWork;

  /**
   * set sideWork
   *
   * @param {string} content - intro describing what the node do to users
   * @param {function(CTX): void} work - function to run with process context
   */
  const setSideWork = work => {
    someNode.sideWork = async () => {
      // styledIntro(someNode);
      try {
        await work(ctx);
      } catch (err) {
        throw err;
      }

      console.log(`${someNode.sideWorkDescription}, DONE`);
      someNode.isGreen = true;
    };
  };

  someNode.setSideWork = setSideWork;

  return someNode;
};

module.exports = genRawNode;
