const systemConfig = require("../../config/system");

const Accounts = require("../../models/account.model");

module.exports.index = async (req, res) => {
  try {
    res.render("admin/pages/my-account/index", {
      pageTitle: "My Account",
      user: res.locals.user,
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};
