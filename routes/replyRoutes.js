const express = require("express");
const router = express.Router();
const replyController = require("../controllers/replyController");
const authController = require("../controllers/authController");

router
  .route("/products/:id/reviews/:reviewId/reply")
  .post(authController.isLoggedIn, replyController.createReply);

module.exports = router;
