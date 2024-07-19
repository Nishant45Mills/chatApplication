const userModel = require("../models/user.model");
const ApiError = require("../util/ApiError");
const catchAsync = require("../util/catchAsync");

const getUser = catchAsync(async (req, res) => {
  const user = await userModel.find({
    $and: [
      {
        $or: [
          { name: { $regex: `/^${req.query.search}/` , $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      },
      { _id: { $ne: req.user._id } },
    ],
  });

  user.forEach((data) => {
    data.password = undefined;
  });

  res.json(user);
});

module.exports = { getUser };
