const express = require("express");
const checkoutController = require("../controllers/checkoutController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/checkout")
  .post(authController.isLoggedIn, checkoutController.checkout);

router
  .route("/buy-now/:productId")
  .post(authController.isLoggedIn, checkoutController.buyNow);

module.exports = router;
