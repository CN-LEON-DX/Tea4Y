// middlewares/auth.middleware.js
const configSystem = require("../../config/system");
const Accounts = require("../../models/account.model");
const Roles = require("../../models/role.model");

module.exports.requireAuth = async (req, res, next) => {
  if (!req.signedCookies.token) {
    res.redirect(`${configSystem.prefixAdmin}/auth/login`);
    return;
  }

  const user = await Accounts.findOne({
    token: req.signedCookies.token,
  }).select("-password");
  if (!user) {
    res.redirect(`${configSystem.prefixAdmin}/auth/login`);
    return;
  }

  const roles = await Roles.findOne({ _id: user.roleID }).select(
    "permissions title"
  );
  res.locals.roles = roles;
  res.locals.user = user;
  next();
};

module.exports.checkPermission = (permission) => {
  return (req, res, next) => {
    const roles = res.locals.roles;
    if (roles && roles.permissions.includes(permission)) {
      next();
    } else {
      res.status(403).send("Forbidden");
    }
  };
};
