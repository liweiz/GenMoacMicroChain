const nurtureRootNode = require('./sections/root/node_root');
const genKids = require('./util/operation_tree/gen_operation_tree');
const traverseTree = require('./util/operation_tree/traverse_operation_tree');
const genRawNode = require('./util/operation_tree/operation_tree_node');

const rawRootNode = genRawNode(null, true);
const rootNode = nurtureRootNode(rawRootNode);

const growTree = async () => {
  await genKids(rootNode);
  await traverseTree(rootNode);
};

growTree();
