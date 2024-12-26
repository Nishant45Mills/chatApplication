const asyncHandler = require("express-async-handler");
const chatModel = require("../models/chatModel");
const convertObjectId = require("../config/covertObjectId");

const createChat = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const isChat = await chatModel
    .findOne({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  if (isChat) {
    res.json({ chat: isChat });
  } else {
    const chat = await chatModel.create({
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    });

    const userChat = await chatModel
      .findOne({ _id: chat._id })
      .populate("users", "-password");
    res.json({ chat: userChat });
  }
});

module.exports = { createChat };
