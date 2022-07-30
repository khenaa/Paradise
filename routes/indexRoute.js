const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res
    .status(200)
    .render("landing", { currentUser: req.user, cart: req.session.cart });
});

module.exports = router;
