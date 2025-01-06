const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");

const getUser = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          {
            username: { $regex: `^${req.query.search}`, $options: "i" },
          },
          { email: { $regex: `^${req.query.search}`, $options: "i" } },
        ],
      }
    : {};

  const user = await userModel
    .find(keyword)
    .find({ _id: { $ne: req.user._id } });
  res.json({ user });
});

const uploadImage = asyncHandler(async (req, res) => {
  const { filename, path } = req.file;

  res.json({ name: filename, image: path });
});

module.exports = { getUser, uploadImage };
