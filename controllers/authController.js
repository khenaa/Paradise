const User = require("../models/userModel");
const passport = require("passport");

// const jwt = require("jsonwebtoken");

// SHOW SIGN-UP FORM
exports.signupForm = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("back");
    }
    res.status(200).render("signup", { cart: req.session.cart });
  } catch (err) {
    res.status(404).redirect("back");
    console.log(err);
  }
};

// HANDLE USER SING-UP
exports.signup = async (req, res) => {
  try {
    // get data from form
    let username = req.body.username;
    let email = req.body.email;
    let role = req.body.role;
    let password = req.body.password;
    // register new user to DB
    await User.register(new User({ username, email, role }), password);
    // console.log(newUser);

    // authenticate user and log them in
    passport.authenticate("local")(req, res, () => {
      res.status(200).redirect("/products");
    });
  } catch (err) {
    console.log(err);
    res.status(400).redirect("/signup");
  }
};

// SHOW LOGIN FORM
exports.loginForm = async (req, res) => {
  try {
    if (req.isAuthenticated()) {
      return res.redirect("back");
    }
    res.status(200).render("login", { cart: req.session.cart });
  } catch (err) {
    res.status(404).redirect("back");
    console.log(err);
  }
};

// HANDLE USER LOGIN
exports.login = async (req, res) => {
  try {
    console.log(req.body);

    const userInfo = new User({
      username: req.body.username,
      password: req.body.password,
    });

    req.login(userInfo, (err) => {
      passport.authenticate("local")(req, res, async () => {
        await User.find({ email: req.user.email });
        console.log("user logged in successfully");
        // // AFTER USER LOGIN, REDIRCET BACK TO INTITIAL ROUTE USER WANTED TO ACCESS
        // if (req.session.oldUrl) {
        //   let oldUrl = req.session.oldUrl;
        //   req.session.oldUrl = null;
        //   res.status(200).redirect(oldUrl);
        //   // ELSE, REDIRECT USER TO PRODUCTS PAGE
        // } else {
        //   res.status(200).redirect("/products");
        // }
        res.status(200).redirect("/products");
      });
    });
  } catch (err) {
    res.status(400).redirect("/login");
  }
};

exports.isLoggedIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // STORE ROUTE IN SESSION AS 'oldUrl'
  // req.session.oldUrl = req.url;
  res.redirect("/login");
};

// LOGOUT
exports.logout = async (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("back");
  }
  req.logout();
  res.status(200).redirect("back");
};
