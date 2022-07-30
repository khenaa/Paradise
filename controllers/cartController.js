const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  try {
    const cart = new Cart(req.session.cart ? req.session.cart : {});
    const foundProduct = await Product.findById(req.params.id);
    cart.add(foundProduct, foundProduct.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.status(200).redirect("/products/" + req.params.id);
  } catch (err) {
    res.status(400).redirect("/");
  }
};

exports.showCart = async (req, res) => {
  try {
    if (!req.session.cart) {
      return res.render("products/cart", { products: null });
    }
    let cart = new Cart(req.session.cart);
    res.status(200).render("products/cart", {
      currentUser: req.user,
      cart: req.session.cart,
      products: cart.generateArray(),
      totalPrice: cart.totalPrice,
    });
  } catch (err) {
    res.status(400).redirect("back");
    console.log(err);
  }
};
