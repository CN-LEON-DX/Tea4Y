const systemConfig = require("../../config/system");
const md5 = require("md5");
const Accounts = require("../../models/account.model");

// GET /admin/auth/login
module.exports.login = async (req, res) => {
  if (req.signedCookies.token) {
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    return;
  }
  res.render("admin/pages/auth/login", {
    pageTitle: "Login",
    prefixAdmin: systemConfig.prefixAdmin,
  });
};

module.exports.postLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    password = md5(password);
    const user = await Accounts.findOne({
      email: email,
      status: "active",
      password: password,
    });
    if (!user) {
      req.flash("error", "Email or password is incorrect");
      res.redirect("back");
      return;
    }
    res.cookie("token", user.token, {
      signed: true,
    });
    res.render("admin/pages/dashboard/index", {
      pageTitle: "Dashboard",
      prefixAdmin: systemConfig.prefixAdmin,
    });
  } catch (error) {
    req.flash("error", "Login failed:");
    console.log(error);
  }
};

module.exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};
