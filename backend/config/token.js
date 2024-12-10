const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRRET, {
    expiresIn: "6d",
  });
};

module.exports = generateToken;
