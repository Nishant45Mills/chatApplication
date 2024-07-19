const jwt = require("jsonwebtoken");

const generateToken = async (user) => {
  return jwt.sign({ _id: user._id }, process.env.JWT_SECRATE_KEY, {
    expiresIn: "1d",
  });
};

module.exports = { generateToken };
