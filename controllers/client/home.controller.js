// [GET] /home
const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");
const productsHelper = require("../../helpers/products");

module.exports.index = async (req, res) => {
  // get featured products
  let productFeatured = await Product.find({
    featured: true,
    status: "active",
    deleted: false,
  })
    .limit(10)
    .sort({ position: -1 });

  productFeatured = productsHelper.productsDisplay(productFeatured);

  let newestProducts = await Product.find({
    status: "active",
    deleted: false,
  })
    .sort({ createdAt: -1 })
    .limit(10);

  newestProducts = productsHelper.productsDisplay(newestProducts);

  res.render("client/pages/home/index", {
    pageTitle: "Trang chu",
    products: productFeatured,
    newestProducts: newestProducts,
    layoutCategory: res.locals.layoutCategory,
  });
};
