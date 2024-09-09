// [GET] /admin/category
const systemConfig = require("../../config/system");
const Category = require("../../models/category.model");

module.exports.index = async (req, res) => {
  try {
    const categories = await Category.find({
      deleted: false,
    });

    res.render("admin/pages/category/index", {
      pageTitle: "Category",
      categories,
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send("An error occurred while fetching categories.");
  }
};

//- note model need to be created:
// {_id, title, description, status, thumbnail, position, createdAt, updatedAt, deleted, deletedAt, slug}
module.exports.create = (req, res) => {
  res.render("admin/pages/category/create", {
    pageTitle: "Add category",
    prefixAdmin: systemConfig.prefixAdmin,
  });
};

module.exports.createCategory = async (req, res) => {
  let totalCategories = await Category.countDocuments();

  req.body.title = req.body.name;
  req.body.status = "active";
  req.body.position = req.body.position
    ? parseFloat(req.body.position)
    : totalCategories + 1;

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
