const systemConfig = require("../../config/system");
const Roles = require("../../models/role.model");

module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Roles.find(find);
  res.render("admin/pages/roles/index", {
    pageTitle: "Decentralized",
    records: records,
    prefixAdmin: systemConfig.prefixAdmin,
  });
};

module.exports.create = async (req, res) => {
  res.render("admin/pages/roles/create", {
    pageTitle: "New roles",
    prefixAdmin: systemConfig.prefixAdmin,
  });
};

module.exports.createRoles = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newRole = new Roles({
      title: title,
      description: description,
    });
    await newRole.save();

    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  } catch (error) {
    console.log(error);
    res.redirect(`${systemConfig.prefixAdmin}/roles/create`);
  }
};

module.exports.edit = async (req, res) => {
  const { id } = req.params;
  const record = await Roles.findById(id);
  res.render("admin/pages/roles/edit", {
    pageTitle: "Edit roles",
    record: record,
    prefixAdmin: systemConfig.prefixAdmin,
  });
};

module.exports.updateRoles = async (req, res) => {
  try {
    const { id } = req.params;
    await Roles.updateOne({ _id: id }, req.body);

    res.redirect(`${systemConfig.prefixAdmin}/roles`);
  } catch (error) {
    console.log(error);
    res.redirect(`${systemConfig.prefixAdmin}/roles/edit/${id}`);
  }
};

module.exports.permission = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await Roles.find(find);
  res.render("admin/pages/roles/permission", {
    pageTitle: "Permission",
    records: records,
    prefixAdmin: systemConfig.prefixAdmin,
  });
};

module.exports.changePermission = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions);
  try {
    for (const item of permissions) {
      const { id, permissions } = item;
      await Roles.updateOne({ _id: id }, { permissions: permissions });
    }
    req.flash("success", "Change permission successfully!");
    res.redirect(`${systemConfig.prefixAdmin}/roles/`);
  } catch (error) {
    console.log(error);
  }
};
