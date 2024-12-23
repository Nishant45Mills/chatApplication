const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");

const verifyToken = (req, res, next) => {
  let tokenInfo = req.headers.authorization;

  if (tokenInfo) {
    const token = tokenInfo.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
      if (err) {
        throw new ApiError(
          403,
          "You do not have permission to access this resource."
        );
      }
      req.user = data.userExist;
      next();
    });
  } else {
    throw new ApiError(
      401,
      "Authentication required. Please log in to access this resource."
    );
  }
};

module.exports = verifyToken;
