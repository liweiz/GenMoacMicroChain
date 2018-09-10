// const enterToContinue = require('../../unused/src/enter_to_continue');
const logger = require('../util/logger');
const ctx = require('../context/process_ctx_proxy');

/**
 * Recursively get node's index path starting from the top non-root node.
 *
 * @param {OperationNode} nodeNow
 * @returns {number[]}
 */
const reachRootFromNode = currentNode => {
  // indiceOfEachLv: number[]
  const indiceOfEachLv = [];
  // not work on root node
  const reach = nodeNow => {
    if (!nodeNow.isRoot) {
      const parentNode = nodeNow.parent;
      const i = parentNode.kids.findIndex(elem => elem === nodeNow);
      if (i > -1) {
        indiceOfEachLv.push(i);
        reach(parentNode);
      } else {
        throw new Error(
          `operation tree error, no such elem: ${JSON.stringify(
            nodeNow
          )} as kid of ${JSON.stringify(parentNode)}`
        );
      }
    }
  };

  reach(currentNode);
  return indiceOfEachLv.reverse();
};

/**
 * Segment logs intro and marks done for each step with press Enter to continue
 *
 * @param {OperationNode} operationTreeNode
 * @param {string} content
 * @param {function(string): stirng} [stylingContentFunc]
 * @returns {Promise<boolean>}
 */
const stepIntroNPause = async (
  operationTreeNode,
  content,
  stylingContentFunc = string => string,
  pauseEnabled = false
) => {
  console.log();

  let stepStr = '';

  if (operationTreeNode.isRoot) {
    logger.info(stylingContentFunc(`${content}`));
  } else {
    const indiceOfEachLv = reachRootFromNode(operationTreeNode);
    const sequenceNos = indiceOfEachLv.map(value => value + 1);

    stepStr = `${sequenceNos[0]}`;
    if (sequenceNos.length > 1) {
      stepStr = `${stepStr}.`;
      for (let i = 1; i < sequenceNos.length; i += 1) {
        stepStr = `${stepStr}${sequenceNos[i]}`;
      }
    }
    logger.info(stylingContentFunc(`STEP ${stepStr}, ${content}`));
  }

  if (pauseEnabled) {
    // await enterToContinue();
  }

  return true;
};

module.exports = async (
  operationTreeNode,
  content,
  stylingContentFunc = string => string
) => {
  await stepIntroNPause(
    operationTreeNode,
    content,
    stylingContentFunc,
    ctx.state.step_pause_enabled
  );
};
