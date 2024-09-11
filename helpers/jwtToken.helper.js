const jwt = require('jsonwebtoken');

const accessTokenSecret = "yourAccessTokenSecret"; // Replace with a secret key
const refreshTokenSecret = "yourRefreshTokenSecret"; // Replace with a secret key
const accessTokenExpiration = "15m"; // 15 minutes or any desired time
const refreshTokenExpiration = "7d"; // 7 days or more

const generateAccessToken = (account) => {
  return jwt.sign({ id: account._id, role: account.roleID }, accessTokenSecret, {
    expiresIn: accessTokenExpiration,
  });
};

const generateRefreshToken = (account) => {
  return jwt.sign({ id: account._id }, refreshTokenSecret, {
    expiresIn: refreshTokenExpiration,
  });
};

const verifyToken = (token, secret) => {
  return jwt.verify(token, secret);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
};