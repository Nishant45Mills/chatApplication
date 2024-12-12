const generateToken = require("../config/token");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    const error = new Error("User already register");
    error.statusCode = 409;
    next(error);
  } else {
    const user = await userModel.create(req.body);
    user.password = undefined;
    res.json({ user, token: generateToken({ user }) });
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const userExist = await userModel.findOne({ email });
  if (userExist && (await userExist.matchPassword(password))) {
    userExist.password = undefined;
    res.json({ user: userExist, token: generateToken({ userExist }) });
  } else {
    const error = new Error("User not registered. Please sign up first.");
    error.statusCode = 404;
    next(error);
  }
});

module.exports = { registerUser, loginUser };
