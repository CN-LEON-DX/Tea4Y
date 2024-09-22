// [GET] /products

const productsHelper = require("../../helpers/products.helper");
const Product = require("../../models/product.model");
const Category = require("../../models/category.model");
const systemConfig = require("../../config/system");

const categoryHelpers = require("../../helpers/categoryHelper");

module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false,
    featured: true,
  }).sort({ position: 1 });

  const newProduct = productsHelper.productsDisplay(products);

  res.render("client/pages/products/index", {
    pageTitle: "List product",
    products: newProduct,
  });
};

module.exports.detailProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slugProduct,
      deleted: false,
      status: "active",
    });
    if (!product) {
      res.status(404).send("Product not found");
    }
    if (product.product_category_id) {
      const category = await Category.findById(product.product_category_id);

      product.categoryName = category.title;
    } else {
      product.categoryName = "None";
    }

    product.newPrice = (
      product.price *
      (1.0 - product.discountPercentage / 100)
    ).toFixed(2);

    res.render(`client/pages/products/detail`, {
      pageTitle: "Detail product",
      product: product,
    });
  } catch (error) {
    console.error("Error getting product detail:", error);
    res.status(500).send("404 Not Found");
  }
};

module.exports.category = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slugCategory,
      deleted: false,
    });

    const subCategories = await categoryHelpers.getSubCategory(category.id);

    let arrProducts = [];
    subCategories.forEach((sub) => {
      arrProducts.push(sub.id);
    });

    arrProducts.push(category.id);

    let products = await Product.find({
      product_category_id: { $in: arrProducts },
      status: "active",
      deleted: false,
    });

    products = productsHelper.productsDisplay(products);

    res.render("client/pages/products/category", {
      pageTitle: category.title,
      products: products,
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (error) {
    console.error("Error getting category:", error);
    res.status(500).send("Internal Server Error");
  }
};
