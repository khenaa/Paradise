const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.checkout = async (req, res) => {
  //  Check if item(s) in cart
  try {
    //   if no item, redirect to cart page
    if (!req.session.cart) {
      return res.redirect("/cart");
    }
    let cart = new Cart(req.session.cart);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${req.protocol}://${req.get("host")}/`,
      cancel_url: `${req.protocol}://${req.get("host")}/product/`,
      customer_email: req.user.email,
      line_items: [
        {
          name: "Test Charge",
          amount: cart.totalPrice * 100,
          currency: "usd",
          quantity: cart.totalQty,
        },
      ],
    });
    res.redirect(303, session.url);
    cart = null;
  } catch (err) {
    res.status(400).redirect("back");
    console.log(err);
  }
};

exports.buyNow = async (req, res) => {
  try {
    // 1) Get currently purchased product
    const product = await Product.findById(req.params.productId);
    // 2) Create checkout session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${req.protocol}://${req.get("host")}/`,
      cancel_url: `${req.protocol}://${req.get("host")}/product/${product._id}`,
      customer_email: req.user.email,
      client_reference_id: req.params.productId,
      line_items: [
        {
          name: product.name,
          amount: product.price * 100,
          currency: "usd",
          quantity: 1,
        },
      ],
    });
    res.status(303).redirect(session.url);
  } catch (err) {
    console.log("SOMETHING WENT VERY VERY WRONG ");
    console.log(err);
  }
};
