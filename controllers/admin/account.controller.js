const md5 = require("md5");
const systemConfig = require("../../config/system");
const Accounts = require("../../models/account.model");
const Roles = require("../../models/role.model");

// GET /admin/account
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  try {
    const accounts = await Accounts.find(find);
    const roles = await Roles.find(find);
    let roleMap = {};
    roles.forEach((role) => {
      roleMap[role._id] = role.title;
    });

    res.render("admin/pages/accounts/index", {
      pageTitle: "Account",
      accounts: accounts,
      roleMap: roleMap,
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};
// GET /admin/account/create
module.exports.createAccount = async (req, res) => {
  let find = {
    deleted: false,
  };
  try {
    const roles = await Roles.find(find);
    res.render("admin/pages/accounts/create", {
      pageTitle: "Account",
      roles: roles,
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};

// POST /admin/account/create
module.exports.addAccount = async (req, res) => {
  try {
    req.body.password = md5(req.body.password);
    const data = req.body;
    const account = new Accounts(data);
    await account.save();
    req.flash("success", "Add account successfully");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  } catch (error) {
    req.flash("error", "Add account failed:");
    console.log(error);
  }
};

module.exports.editAccount = async (req, res) => {
  const data = await Accounts.findById(req.params.id);
  const roles = await Roles.find();
  res.render("admin/pages/accounts/edit", {
    pageTitle: "Account",
    data: data,
    roles: roles,
    prefixAdmin: systemConfig.prefixAdmin,
  });
};

module.exports.updateAccount = async (req, res) => {
  try {
    const data = req.body;
    if (req.body.password) {
      data.password = md5(req.body.password);
    }else {
        delete req.body.password;
    }

    await Accounts.updateOne({_id: req.params.id}, data);
    req.flash("success", "Update account successfully");
    res.redirect(`${systemConfig.prefixAdmin}/accounts`);
  } catch (error) {
    req.flash("error", "Update account failed:");
    console.log(error);
  }
};
