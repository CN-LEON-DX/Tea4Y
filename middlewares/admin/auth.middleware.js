const jwt = require("jsonwebtoken");
const { accessTokenSecret } = require("../../helpers/jwtToken.helper");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Access denied, token missing!" });
  }

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token!" });
    }
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
