// [GET] /products

const Product = require("../../models/product.model");

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
  }).sort({ position: 1 });

  const newProduct = products.map((product) => {
    product.newPrice = (
      product.price *
      (1.0 - product.discountPercentage / 100)
    ).toFixed(2);

    return product;
  });

  res.render("client/pages/products/index", {
    pageTitle: "List product 123",
    products: newProduct,
  });
};

module.exports.detailProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      deleted: false,
      status: "active",
    });
    product.newPrice = (
      product.price *
      (1.0 - product.discountPercentage / 100)
    ).toFixed(2);
    if (!product) {
      res.status(404).send("Product not found");
    }
    res.render(`client/pages/products/detail`, {
      pageTitle: "Detail product",
      product: product,
    });
  } catch (error) {
    console.error("Error getting product detail:", error);
    res.status(500).send("404 Not Found");
  }
};
