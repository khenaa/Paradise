const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.route("/add-to-cart/:id").get(cartController.addToCart);
router.route("/cart").get(cartController.showCart);

module.exports = router;
