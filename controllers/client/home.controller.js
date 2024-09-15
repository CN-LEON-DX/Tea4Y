// [GET] /home
const Category = require("../../models/category.model");
const createTreeHelper = require("../../helpers/createTree.helper");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
  res.render("client/pages/home/index", {
    pageTitle: "Trang chu",
    layoutCategory: res.locals.layoutCategory,
  });
};
