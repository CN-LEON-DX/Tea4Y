const Category = require("../../models/category.model");

module.exports.categoryMiddleware = async (req, res, next) => {
    const productCategory = await Category.find({ deleted: false });
    const newProductCategory = createTreeHelper.tree(productCategory);
    res.locals.layoutCategory = newProductCategory;
};