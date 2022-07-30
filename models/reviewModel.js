const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
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

  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// populate Reply on Reviews
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "replies",
    select: "text author",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
