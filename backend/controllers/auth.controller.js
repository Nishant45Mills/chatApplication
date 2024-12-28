const generateToken = require("../config/token");
const userModel = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/ApiError");

const registerUser = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    next(new ApiError(409, "User already register"));
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
    next(new ApiError(401, "Incorrect email or password"));
  }
});

module.exports = { registerUser, loginUser };
