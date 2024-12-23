const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: "6d",
  });
};

module.exports = generateToken;
