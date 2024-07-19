const userModel = require("../models/user.model");
const ApiError = require("../util/ApiError");
const catchAsync = require("../util/catchAsync");
const jwt = require("jsonwebtoken");

const verifyToken = catchAsync(async (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRATE_KEY, async (err, decode) => {
    if (err) {
      //handle the error
      throw new ApiError(401, "Unauthorized error");
    }

    const user = await userModel.findOne({ _id: decode["_id"] });
    req.user = user;
    next();
  });
});

module.exports = { verifyToken };
