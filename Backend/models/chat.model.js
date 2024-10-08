const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
    },

    isGroupChat: {
      type: Boolean,
      default: false,
    },

    users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],

    latestMessage: {
      type: mongoose.Types.ObjectId,
      ref: "Message",
    },

    groupAdmin: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },

    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chat", chatModel);
