const chatModel = require("../models/chat.model");
const userModel = require("../models/user.model");
const catchAsync = require("../util/catchAsync");

//For one on one chat
const createChat = catchAsync(async (req, res) => {
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
    res.json(isChat);
  } else {
    const chat = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    const createdChat = await chatModel.create(chat);
    const fetchChat = await chatModel
      .findOne({ _id: createdChat["_id"] })
      .populate("users", "_id name email pic");
    res.json(fetchChat);
  }
});
{
  $sort: {
    createdAt: -1;
  }
}
const fetchChat = catchAsync(async (req, res) => {
  const fetchingChats = await chatModel
    .find({ users: { $elemMatch: { $eq: req.user._id } } })
    .sort({
      createdAt: -1,
    })
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage");

  res.json(fetchingChats);
});

const getChatById = catchAsync(async (req, res) => {
  const fetchingChats = await chatModel
    .findById(req.params.id)
    .populate("users", "-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage");
  res.json(fetchingChats);
});

const createGroupChat = catchAsync(async (req, res) => {
  const { chatName, user } = req.body;

  user.unshift(req.user._id);
  const chat = {
    active: false,
    chatName: chatName,
    isGroupChat: true,
    users: user,
    groupAdmin: req.user._id,
  };

  const group = await chatModel.create(chat);
  const groupChat = await chatModel
    .findOne({ _id: group._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  res.json(groupChat);
});

const renameGroup = catchAsync(async (req, res) => {
  const { chatName } = req.body;
  const renameGroup = await chatModel
    .findByIdAndUpdate(
      req.params.id,
      {
        chatName,
      },
      { new: true }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  res.json(renameGroup);
});

const removeFromGroup = catchAsync(async (req, res) => {
  const { userId } = req.body;
  console.log(userId);

  const groupData = await chatModel
    .findByIdAndUpdate(
      req.params.id,
      { $pull: { users: userId } },
      { new: true }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.json(groupData);
});

const addToGroup = catchAsync(async (req, res) => {
  const { userId } = req.body;

  const groupData = await chatModel
    .findByIdAndUpdate(
      req.params.id,
      { $push: { users: userId } },
      { new: true }
    )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  res.json(groupData);
});

const updateStatus = catchAsync(async (req, res) => {
  const { chatId } = req.body;
  console.log(chatId);
  await chatModel.findByIdAndUpdate(chatId, { active: true });
  await chatModel.updateMany(
    { _id: { $ne: chatId } }, // Exclude the target document
    { active: false }
  );
  const result = await chatModel
    .findOne({ _id: chatId })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  res.json(result);
});

module.exports = {
  createChat,
  fetchChat,
  createGroupChat,
  renameGroup,
  removeFromGroup,
  addToGroup,
  getChatById,
  updateStatus,
};
