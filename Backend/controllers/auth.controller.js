const { user } = require(".");
const userModel = require("../models/user.model");
const { tokenService } = require("../services");
const ApiError = require("../util/ApiError");
const catchAsync = require("../util/catchAsync");

const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are mandetory");
  }

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    throw new ApiError(409, "A user with this email already exists");
  }

  const user = await userModel.create({
    name,
    email,
    password,
  });

  const token = await tokenService.generateToken(user);
  user.password = undefined;

  res.json({ user, token });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const userExist = await userModel.findOne({ email });
  console.log(userExist);
  if (!userExist || !(await userExist.matchPassword(password))) {
    throw new ApiError(400, "Incorrect email or password");
  }
  const token = await tokenService.generateToken(userExist);
  userExist.password = undefined;
  res.json({ user: userExist, accessToken: token });
});

module.exports = { register, login };
