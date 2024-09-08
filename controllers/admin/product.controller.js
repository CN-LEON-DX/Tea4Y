const Product = require("../../models/product.model");
const filterProductHelper = require("../../helpers/filterProduct.helper");
const systemConfig = require("../../config/system");
const mongoose = require("mongoose");

module.exports.index = async (req, res) => {
  let query = filterProductHelper(req);
  const { priceRange, status, search } = req.query;

  const pagination = {
    limitItems: 5,
    currentPage: parseInt(req.query.page) || 1,
  };

  const totalProducts = await Product.countDocuments(query);

  const totalPages = Math.ceil(totalProducts / pagination.limitItems);

  if (pagination.currentPage > totalPages) {
    pagination.currentPage = totalPages;
  } else if (pagination.currentPage < 1) {
    pagination.currentPage = 1;
  }

  let skipPage = (pagination.currentPage - 1) * pagination.limitItems;

  const products = await Product.find(query)
    .limit(pagination.limitItems)
    .skip(skipPage > 0 ? skipPage : 0);

  pagination.pages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  pagination.totalPages = totalPages;

  res.render("admin/pages/products/index", {
    pageTitle: "List product",
    products: products,
    priceRange,
    status,
    search,
    pagination: pagination,
    prefixAdmin: systemConfig.prefixAdmin,
  });
};

module.exports.editFast = async (req, res) => {
  const { id, title, price, status } = req.params;
  try {
    await Product.findByIdAndUpdate(id, {
      title: title,
      price: price,
      status: status,
    });
    req.flash("success", "Product updated successfully");
    res.redirect("back");
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      await Product.updateOne(
        { _id: id },
        { deleted: true, deletedAt: new Date() }
      );
      res.redirect("back");
      req.flash("success", "Product delete successfully");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send("Error deleting product");
  }
};

module.exports.deleteMultiple = async (req, res) => {
  try {
    const ids = JSON.parse(req.body.ids);

    const formattedIds = ids.map(
      (id) => new mongoose.Types.ObjectId(id.trim())
    );

    await Product.updateMany(
      { _id: { $in: formattedIds } },
      { $set: { deleted: true, deletedAt: new Date() } }
    );
    req.flash("success", "Product updated successfully");
    res.redirect("back");
  } catch (error) {
    console.error("Error processing product IDs:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.changePosition = async (req, res) => {
  try {
    const products = JSON.parse(req.body.products);

    for (const product of products) {
      const { id, position } = product;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid product ID: ${id}`);
      }

      const positionAsInt = parseInt(position, 10);

      await Product.updateOne(
        { _id: new mongoose.Types.ObjectId(id) },
        { $set: { position: positionAsInt } }
      );
    }
    req.flash("success", "Product positions updated successfully");
    res.redirect("back");
  } catch (error) {
    console.error("Error processing product positions:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create", {
    pageTitle: "Create product",
    prefixAdmin: systemConfig.prefixAdmin,
  });
};

module.exports.createProduct = async (req, res) => {
  let totalProducts = await Product.countDocuments();

  req.body.title = req.body.name;
  req.body.status = "active";
  req.body.price = req.body.price ? parseFloat(req.body.price) : 0;
  req.body.stock = req.body.stock ? parseInt(req.body.stock) : 0;
  req.body.rating = req.body.rating ? parseFloat(req.body.rating) : 5;
  req.body.position = req.body.position
    ? parseFloat(req.body.position)
    : totalProducts + 1;
  req.body.discountPercentage = req.body.discountPercentage
    ? parseFloat(req.body.discountPercentage)
    : 0;

  console.log(req.body.thumbnail);
  try {
    const product = new Product(req.body);
    await product.save();

    req.flash("success", "Product created successfully");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.fastEditProduct = async (req, res) => {
  console.log(req.params.id);
  // find product by id
  try {
    const find = {
      deleted: false,
      _id: req.params.id,
    };
    const product = await Product.findOne(find);
    if (!product) {
      res.status(404).send("Product not found");
    }
    res.render("admin/pages/products/edit", {
      pageTitle: "Edit product",
      product: product,
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (error) {
    flash("error", "Product not found");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

module.exports.updateProduct = async (req, res) => {
  req.body.title = req.body.name;
  req.body.status = "active";
  req.body.price = req.body.price ? parseFloat(req.body.price) : 0;
  req.body.stock = req.body.stock ? parseInt(req.body.stock) : 1;
  req.body.rating = req.body.rating ? parseFloat(req.body.rating) : 5;
  req.body.position = req.body.position
    ? parseFloat(req.body.position)
    : totalProducts + 1;
  req.body.discountPercentage = req.body.discountPercentage
    ? parseFloat(req.body.discountPercentage)
    : 0;
  if (req.file) {
    req.body.thumbnail = `/admin/uploads/${req.file.filename}`;
  }
  try {
    await Product.findByIdAndUpdate(req.params.id, req.body);
    req.flash("success", "Product updated successfully");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.detailProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render("admin/pages/products/detail", {
      pageTitle: "Detail product",
      product: product,
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (error) {
    console.error("Error getting product detail:", error);
    res.status(500).send("Internal Server Error");
  }
};
