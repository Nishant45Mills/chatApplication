const asyncHandler = require("express-async-handler");
const messageModel = require("../models/messageModel");
const ApiError = require("../utils/ApiError");
const chatModel = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res, next) => {
  const { chatId, content } = req.body;

  if (!content || !chatId) {
    next(new ApiError(400, "Invalid data passed to request"));
  }

  const message = await messageModel.create({
    sender: req.user._id,
    content: content,
    chat: chatId,
  });

  const messageData = await messageModel
    .findOne({ _id: message._id })
    .populate([
      {
        path: "sender",
      },
      {
        path: "chat",
        populate: {
          path: "users",
        },
      },
    ]);

  await chatModel.findByIdAndUpdate(
    { _id: chatId },
    {
      latestMessage: message,
    }
  );

  res.json({ message: messageData });
});

const fetchMessage = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  const message = await messageModel.find({ chat: chatId }).populate([
    {
      path: "sender",
      select: "-password",
    },
    {
      path: "chat",
      populate: {
        path: "users latestMessage",
      },
    },
  ]);

  res.json(message);
});

module.exports = { sendMessage, fetchMessage };
