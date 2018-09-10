const numOfScs = require('./num_of_scs_nodes');

const sideWork = ctx => {
  const results = numOfScs(ctx.state);
  ctx.scs_nodes.total_num = results.expected;
  ctx.scs_nodes.num_of_new = results.new;
};

const nodeNumOfScsids = rawNode => {
  rawNode.setSideWork(sideWork);
  rawNode.sideWorkDescription =
    'find out max numbers of scs nodes expected on micro-chain and new ones to create locally';

  return rawNode;
};

module.exports = nodeNumOfScsids;
