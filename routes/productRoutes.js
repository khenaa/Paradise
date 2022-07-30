const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

router.route("/").get(productController.getAllProducts);
router.route("/:id").get(productController.getProductDetail);

module.exports = router;
