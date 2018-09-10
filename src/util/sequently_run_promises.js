module.exports = async promises => {
  const results = [];
  const counter = promises.length;
  for (let i = 0; i < counter; i += 1) {
    console.log(`promise, #${i}, start`);
    const result = await promises[i];
    console.log(`promise, #${i}, done`);
    results.push(result);
  }
  console.log(`promises all done`);
  return results;
};
