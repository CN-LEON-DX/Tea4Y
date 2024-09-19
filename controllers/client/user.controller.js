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

module.exports.signup = async (req, res) => {
  res.send("Signup");
};
