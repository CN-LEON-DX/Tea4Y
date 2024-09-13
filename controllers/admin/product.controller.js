const Product = require("../../models/product.model");
const filterProductHelper = require("../../helpers/filterProduct.helper");
const paginationHelper = require("../../helpers/pagination.helper");
const sortOptionHelper = require("../../helpers/sortProduct.helper");
const systemConfig = require("../../config/system");

const Category = require("../../models/category.model");
const Accounts = require("../../models/account.model");
const createTreeHelper = require("../../helpers/createTree.helper");

const mongoose = require("mongoose");

module.exports.index = async (req, res) => {
  const { priceRange, status, search, sortSelection, page } = req.query;

  let query = filterProductHelper(req);

  const pagination = paginationHelper.getPagination(
    page,
    await Product.countDocuments(query)
  );

  const sortOption = sortOptionHelper.getSortOption(sortSelection);

  let skipPage = (pagination.currentPage - 1) * pagination.limitItems;
  const products = await Product.find(query)
    .limit(pagination.limitItems)
    .skip(skipPage > 0 ? skipPage : 0)
    .sort(sortOption);

  const productsWithCreators = await Promise.all(
    products.map(async (product) => {
      const creator = await Accounts.findOne({
        _id: product.createdBy.accountID,
        deleted: false,
      })
        .select("fullName")
        .lean();

      product.whoCreated = creator ? creator.fullName : "Unknown";
      return product;
    })
  );

  res.render("admin/pages/products/index", {
    pageTitle: "List product",
    products: productsWithCreators,
    priceRange,
    status,
    search,
    pagination,
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
      await Product.findByIdAndUpdate(id, {
        $set: {
          deleted: true,
          deletedBy: {
            accountID: res.locals.user.id,
            deletedAt: new Date(),
          },
        },
      });
      req.flash("success", "Product delete successfully");
      res.redirect("back");
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
      {
        $set: {
          deleted: true,
          deletedBy: {
            accountID: res.locals.user.id,
            deletedAt: new Date(),
          },
        },
      }
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
  const categories = await Category.find({ deleted: false });

  const newCategories = createTreeHelper.tree(categories);

  res.render("admin/pages/products/create", {
    pageTitle: "Create product",
    newCategories,
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

  req.body.createdBy = { accountID: res.locals.user.id };
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

module.exports.editProduct = async (req, res) => {
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

    const categories = await Category.find({ deleted: false });

    const newCategories = createTreeHelper.tree(categories);

    res.render("admin/pages/products/edit", {
      pageTitle: "Edit product",
      product: product,
      newCategories,
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
    if (!product) {
      res.status(404).send("Product not found");
      return;
    }
    let category;
    if (product.product_category_id) {
      const category = await Category.findOne({
        _id: product.product_category_id,
        deleted: false,
      });
    }

    res.render("admin/pages/products/detail", {
      pageTitle: "Detail product",
      product: product,
      category: category ? category : "None",
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (error) {
    console.error("Error getting product detail:", error);
    res.status(500).send("Internal Server Error");
  }
};
