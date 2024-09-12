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

module.exports.updateAcc = async (req, res, next) => {
  if (!req.body.fullName) {
    req.flash("error", "Please enter a name");
    res.redirect("back");
    return;
  }
  if (!req.body.email) {
    req.flash("error", "Please enter a email");
    res.redirect("back");
    return;
  }
  // check email has exist
  const account = await Accounts.findOne({
    email: req.body.email,
    _id: { $ne: req.params.id }, // Exclude the account with the current ID
  });

  if (account) {
    req.flash("error", "This email is exist ! Please enter another email");
    res.redirect("back");
    return;
  }
  next();
};
