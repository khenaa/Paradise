const express = require("express");
const router = express.Router();

router.get("/about", (req, res) => {
  res
    .status(200)
    .render("about", { currentUser: req.user, cart: req.session.cart });
});

module.exports = router;
