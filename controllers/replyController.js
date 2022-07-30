const Review = require("../models/reviewModel");
const Reply = require("../models/replyModel");

exports.createReply = async (req, res) => {
  try {
    const foundReview = await Review.findById(req.params.reviewId);
    //  get data from reply form
    const reply = req.body.reply;
    console.log(reply);
    // create new reply
    const newReply = await Reply.create(reply);
    console.log(newReply);
    // add author's username and id to reply
    newReply.author.username = req.user.username;
    newReply.author.id = req.user._id;
    // save reply
    newReply.save();
    // add new reply to replies array
    foundReview.replies.push(newReply);
    // save review with new reply
    foundReview
      .save()
      .then((doc) => console.log("REPLY SAVED TO DB"))
      .catch((err) => console.log(err));
    res.status(201).redirect("back");
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};
