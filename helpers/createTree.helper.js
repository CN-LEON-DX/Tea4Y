let count = 0;
const createTree = (arr, parentID = "") => {
  const tree = [];
  arr.forEach((item) => {
    if (item.parentID === parentID) {
        count++;
        item.index = count;
      const children = createTree(arr, item.id);
      if (children.length) {
        item.children = children;
      }
      tree.push(item);
    }
  });
  return tree;
};

module.exports.tree = (arr) => {
  count = 0;
  const treeRef = createTree(arr, (parentID = ""));
  return treeRef;
};
