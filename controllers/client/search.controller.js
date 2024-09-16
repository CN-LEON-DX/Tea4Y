const Product = require("../../models/product.model");
const productDisplayHelper = require("../../helpers/products");
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;

  const keywordRegex = new RegExp(keyword, "i");
  try {
    let products = await Product.find({
      title: keywordRegex,
      status: "active",
      deleted: false,
    });
    products = productDisplayHelper.productsDisplay(products);

    res.render("client/pages/search/index", {
      pageTitle: "Result of searching :",
      keywordSearch: keyword,
      products: products,
    });
  } catch (e) {
    console.log(e);
  }
};
