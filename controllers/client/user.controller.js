const User = require("../../models/user.model");
const md5 = require("md5");

module.exports.register = async (req, res) => {
  res.render("client/pages/user/register", {
    pageTitle: "Register",
  });
};

module.exports.registerAccount = async (req, res) => {
  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  if (existEmail) {
    req.flash("error", "Email already exist !");
    res.redirect("back");
    return;
  }

  req.body.password = md5(req.body.password);

  const user = new User(req.body);
  await user.save();

  res.cookie("tokenUser", user.token); // save cookie for using another pages

  req.flash("success", "Login succes!");
  res.redirect("/");
};

module.exports.login = async (req, res) => {
  res.render("client/pages/user/login", {
    pageTitle: "Login account",
  });
};

module.exports.loginAccount = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const userExist = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!userExist) {
    req.flash("error", "This email doesn't exist !");
    res.redirect("back");
    return;
  }

  if (md5(password) != userExist.password) {
    req.flash("error", "email or password was wrong !");
    res.redirect("back");
    return;
  }

  if (userExist.status == "inactive") {
    req.flash("error", "Your account was blocked.");
    res.redirect("back");
    return;
  }

  res.cookie("tokenUser", userExist.token);
  res.redirect("/");
};
