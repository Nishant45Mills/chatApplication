const generateToken = require("../config/token");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    const error = new Error("User already register");
    error.statusCode = 409;
    return next(error);
  }
  const user = await userModel.create(req.body);
  const token = generateToken({ user });
  res.json({ user, token });
});

module.exports = { registerUser };
