const User = require("../../models/user.model");
const md5 = require("md5");

const ForgotPassword = require("../../models/forgotPassword.model");
const genOTP = require("../../helpers/generateToken.helper");
const Cart = require("../../models/cart.model");
// sendMail helpers
const sendMailHelpers = require("../../helpers/sendMail.helper");

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

  // save user_id to cart collection
  console.log(userExist.id);
  console.log(req.cookies.cartID);

  await Cart.updateOne({
    _id: req.cookies.cartID
  }, {
    userID: userExist.id,
  });
  res.redirect("/");
};

module.exports.logoutAccount = async (req, res) => {
  res.clearCookie("tokenUser");
  res.redirect("/user/login"); //index
};

module.exports.forgot = async (req, res) => {
  res.render("client/pages/user/forgot-password", {
    pageTitle: "Forgot password",
  });
};

module.exports.forgotPasswordPost = async (req, res) => {
  const email = req.body.email;
  const userExist = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!userExist) {
    req.flash("error", "This email doesn't exist !");
    res.redirect("back");
    return;
  }

  const objForgotPassword = {
    email: email,
    otp: genOTP.genOTP(6),
    expireAt: Date.now(),
  };

  const forgotPassword = new ForgotPassword(objForgotPassword);
  forgotPassword.save();

  // send OTP via email

  const subject = `OTP verification code`;
  const html = `
      Your OTP code is valid in 3 minutes: ${forgotPassword.otp}. Don't reveal this code to another one.
  `;
  sendMailHelpers.sendMail(email, subject, html);

  res.redirect(
    `/user/password/otp-password?email=${encodeURIComponent(email)}`
  );
};

module.exports.otpPassword = async (req, res) => {
  const email = req.query.email;
  res.render("client/pages/user/otp-password", {
    pageTitle: "OTP confirm",
    email: email,
  });
};

module.exports.otpPasswordPost = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
  });

  if (!result) {
    req.flash("error", "OTP is not valid !");
    res.redirect("back");
    return;
  }

  const user = await User.findOne({
    email: email,
  });

  res.cookie("tokenUser", user.token);
  res.redirect("/user/password/reset");
};

module.exports.resetPassword = (req, res) => {
  res.render("client/pages/user/reset-password", {
    pageTitle: "Reset password",
  });
};

module.exports.resetPasswordPost = async (req, res) => {
  const password = req.body.password;
  const tokenUser = req.cookies.tokenUser;

  // update password for user
  await User.updateOne(
    {
      token: tokenUser,
    },
    {
      password: md5(password),
    }
  );

  req.flash("success", "Change password successfully !");
  res.redirect("/");
};

module.exports.infoUser = async (req, res) => {
  res.render("client/pages/user/infor", {
    pageTitle: "Info user",
  });
};
