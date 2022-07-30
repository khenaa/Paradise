const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Review cannot be empty"],
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
