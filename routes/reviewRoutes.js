const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

// router.route("/products/:id/reviews/new").get(reviewController.getReviewForm);

router
  .route("/products/:id/reviews")
  .post(authController.isLoggedIn, reviewController.createReview);

module.exports = router;
