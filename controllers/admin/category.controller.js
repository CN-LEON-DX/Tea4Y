// [GET] /admin/category
const slugify = require("slugify");
const systemConfig = require("../../config/system");
const Category = require("../../models/category.model");
const createTreeHelper = require("../../helpers/createTree.helper");

module.exports.index = async (req, res) => {
  try {
    const categories = await Category.find({
      deleted: false,
    });

    const newCategories = createTreeHelper.tree(categories);
    res.render("admin/pages/category/index", {
      pageTitle: "Category",
      newCategories,
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("An error occurred while fetching categories.");
  }
};

//- note model need to be created:
// {_id, title, description, status, thumbnail, position, createdAt, updatedAt, deleted, deletedAt, slug}
module.exports.create = async (req, res) => {
  try {
    const categories = await Category.find({ deleted: false });

    const newCategories = createTreeHelper.tree(categories);

    res.render("admin/pages/category/create", {
      pageTitle: "Add category",
      newCategories,
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("An error occurred while fetching categories.");
  }
};

module.exports.createCategory = async (req, res) => {
  let totalCategories = await Category.countDocuments();

  req.body.title = req.body.name;
  req.body.status = "active";
  req.body.position = req.body.position
    ? parseFloat(req.body.position)
    : totalCategories + 1;

  if (req.body.title) {
    req.body.slug = slugify(req.body.title + totalCategories, { lower: true });
  }

  try {
    const category = new Category(req.body);
    await category.save();

    req.flash("success", "Category created successfully");
    res.redirect(`${systemConfig.prefixAdmin}/category`);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.edit = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      deleted: false,
    });

    const originalCategory = await Category.find({ deleted: false });
    const newCategories = createTreeHelper.tree(originalCategory);

    res.render("admin/pages/category/edit", {
      pageTitle: "Edit category",
      category,
      newCategories,
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).send("Not found.");
  }
};

module.exports.update = async (req, res) => {
  let totalCategories = await Category.countDocuments();

  req.body.title = req.body.name;
  req.body.status = "active";
  req.body.position = req.body.position
    ? parseFloat(req.body.position)
    : totalCategories + 1;

  if (req.body.title) {
    req.body.slug = slugify(req.body.title, { lower: true });
  }
  console.log(req.body);
  try {
    await Category.updateOne({ _id: req.params.id }, req.body);

    req.flash("success", "Category updated successfully");
    res.redirect(`${systemConfig.prefixAdmin}/category`);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).send("Internal Server Error");
  }
};
