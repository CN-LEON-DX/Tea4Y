const Category = require("../../models/category.model");
const createTreeHelper = require("../../helpers/createTree.helper");

module.exports.category = async (req, res, next) => {
  const productCategory = await Category.find({ deleted: false });
  const newProductCategory = createTreeHelper.tree(productCategory);
  res.locals.layoutCategory = newProductCategory;
  next();
};
