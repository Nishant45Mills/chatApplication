const catchAsync = require("../util/catchAsync");
const messageModel = require("../models/message.model");
const ApiError = require("../util/ApiError");
const userModel = require("../models/user.model");
const chatModel = require("../models/chat.model");

const sendMessage = catchAsync(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    throw new ApiError(400, "Invalid data passed into the request");
  }

  const newMessage = await messageModel.create({
    sender: req.user._id,
    content: content,
    chat: chatId,
  });
  const newData = await newMessage.populate([
    { path: "sender", select: "name pic" },
    {
      path: "chat",
      populate: [
        {
          path: "users",
        },
        { path: "latestMessage" },
      ],
    },
  ]);

  await chatModel.findByIdAndUpdate(chatId, {
    latestMessage: newData,
  });

  res.json(newData);
});

const getAllMessage = catchAsync(async (req, res) => {
  const data = await messageModel.find({ chat: req.params.chatId }).populate([
    { path: "sender", select: "name email" },
    {
      path: "chat",
      populate: [
        {
          path: "latestMessage",
        },
        {
          path: "users",
          select: "name email",
        },
      ],
    },
  ]);
  res.json(data);
});

module.exports = { sendMessage, getAllMessage };
