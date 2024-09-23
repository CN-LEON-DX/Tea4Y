module.exports.registerValid = async (req, res, next) => {
  const user = req.body;

  const emailPattern = /^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,}$/;

  const phonePattern = /^0[1-9]{8, }$/;

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#?!%&*]{8,}$/;

  if (!emailPattern.test(user.email)) {
    req.flash("error", "Please enter a valid email.");
    return res.redirect("back");
  }

  if (!passwordPattern.test(user.password)) {
    req.flash(
      "error",
      "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, and a number."
    );
    return res.redirect("back");
  }

  if (user.password !== user.passwordConfirm) {
    req.flash("error", "Password and confirmation must be the same!");
    return res.redirect("back");
  }

  next();
};

module.exports.loginValid = async (req, res, next) => {
  const user = req.body;

  if (!user.email) {
    req.flash("error", "Email is required.");
    return res.redirect("back");
  }

  if (!user.password) {
    req.flash("error", "Password is required.");
    return res.redirect("back");
  }

  const emailPattern = /^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(user.email)) {
    req.flash("error", "Please enter a valid email.");
    return res.redirect("back");
  }

  next();
};

module.exports.forgotPassword = async (req, res, next) => {
  const emailPattern = /^[0-9a-zA-Z._%+-]+@[0-9a-zA-Z.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(req.body.email)) {
    req.flash("error", "Please enter a valid email.");
    return res.redirect("back");
  }
  next();
};

module.exports.passwordMatch = async (req, res, next) => {
  const { password, passwordConfirm } = req.body;

  const passwordPattern = /^[A-Za-z\d@#?!%&*]{8,}$/;
  if (!passwordPattern.test(password)) {
    req.flash("error", "Password must be at least 8 characters long.");
    return res.redirect("back");
  }

  if (password !== passwordConfirm) {
    req.flash("error", "Password and confirmation must be the same!");
    return res.redirect("back");
  }

  next();
};
