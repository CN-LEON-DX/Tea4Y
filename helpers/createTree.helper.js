const createTree = (arr, parentID = "") => {
  const tree = [];
  arr.forEach((item) => {
    if (item.parentID === parentID) {
      const children = createTree(arr, item.id);
      if (children.length) {
        item.children = children;
      }
      tree.push(item);
    }
  });
  return tree;
};

module.exports.createTreeRef = (arr, parentID = "") => {
    const tree = [];
    arr.forEach((item) => {
      if (item.parentID === parentID) {
        const children = createTree(arr, item.id);
        if (children.length) {
          item.children = children;
        }
        tree.push(item);
      }
    });
    return tree;
  }