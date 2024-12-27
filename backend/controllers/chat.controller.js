const asyncHandler = require("express-async-handler");
const chatModel = require("../models/chatModel");
const convertObjectId = require("../config/covertObjectId");

const createChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

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

const fetchChat = asyncHandler(async (req, res) => {
  const chat = await chatModel
    .find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
    .populate("users", "-password")
    .sort({ updatedAt: -1 });
  console.log(chat);

  res.json({ chats: chat });
});

const createGroupChat = asyncHandler(async (req, res) => {
  const { name, user } = req.body;
  const groupChat = await chatModel.create({
    chatName: name,
    isGroupChat: true,
    users: [...user, req.user._id],
    isGroupAdmin: req.user._id,
  });
  const chat = await chatModel.findOne({ _id: groupChat._id }).populate([
    { path: "users", select: "-password" },
    { path: "isGroupAdmin", select: "-password" },
  ]);
  res.json({ chat: chat });
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const groupChat = await chatModel
    .findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      { new: true }
    )
    .populate([
      { path: "users", select: "-password" },
      { path: "isGroupAdmin", select: "-password" },
    ]);
  res.json({ chat: groupChat });
});

module.exports = { createChat, fetchChat, createGroupChat, renameGroup };
