const mongoose = require("mongoose");

const covertObjectId = (id) => {
  return new mongoose.Types.ObjectId(id);
};

module.exports = covertObjectId;
