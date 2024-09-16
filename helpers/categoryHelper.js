const Category = require("../models/category.model");

module.exports.getSubCategory = async (parentID) => {
  const getCategories = async (parentID) => {
    const subs = await Category.find({
      parentID: parentID,
      status: "active",
      deleted: false,
    });

    let allSub = [...subs];

    for (const sub of subs) {
      const subSubs = await getCategories(sub.id);
      allSub = allSub.concat(subSubs);
    }

    return allSub;
  };

  const result = await getCategories(parentID);
  return result;
};
