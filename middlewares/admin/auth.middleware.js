const configSystem = require("../../config/system");
const accounts = require("../../models/account.model");

module.exports.requireAuth = (req, res, next) => {
  console.log(req.signedCookies.token);
  if (!req.signedCookies.token) {
    res.redirect(`${configSystem.prefixAdmin}/auth/login`);
    return;
  }else {
    const user = accounts.findOne({ token: req.signedCookies.token });
    if (!user) {
      res.redirect(`${configSystem.prefixAdmin}/auth/login`);
      return;
    }else {
      next();
    }
  }
};
