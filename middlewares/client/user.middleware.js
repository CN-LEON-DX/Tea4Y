const User = require("../../models/user.model");

module.exports.infoUser = async (req, res, next) => {
  const tokenUser = req.cookies.tokenUser;
  if (tokenUser) {
    const user = await User.findOne({
      token: tokenUser,
      deleted: false,
    }).select("-password");
    if (user){
        res.locals.user = user; // views can use it
    }
  }
  next();
};
