// [GET] /home
const Category = require("../../models/category.model");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
  console.log(res.locals.layoutCategory);
  res.render("client/pages/home/index", {
    pageTitle: "Trang chu",
    layoutCategory: res.locals.layoutCategory,
  });
};
