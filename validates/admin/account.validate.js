const Accounts = require("../../models/account.model");

module.exports.createAcc = async (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Please enter a name");
    res.redirect("back");
    return;
  }
  // check email has exist
  const email = await Accounts.findOne({ email: req.body.email });
  if (!req.body.email) {
    req.flash("error", "Please enter a email");
    res.redirect("back");
    return;
  }
  if (email) {
    req.flash("error", "Email has exist ! Please enter another email");
    res.redirect("back");
    return;
  }
  next();
};
