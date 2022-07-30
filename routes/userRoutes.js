const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router
  .route("/signup")
  .get(authController.signupForm)
  .post(authController.signup);

router.route("/login").get(authController.loginForm).post(authController.login);

router.route("/logout").get(authController.logout);

module.exports = router;
