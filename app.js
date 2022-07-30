const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/userModel");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const passportLocalMongoose = require("passport-local-mongoose");
const MongoStore = require("connect-mongo");

const indexRoute = require("./routes/indexRoute");
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const replyRoutes = require("./routes/replyRoutes");
const userRoutes = require("./routes/userRoutes");
const aboutRoute = require("./routes/aboutRoute");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoute = require("./routes/checkoutRoute");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.cart = req.session;
  return next();
});

// app.use((req, res, next) => {
//   req.requestTime = new Date().toLocaleTimeString();
//   next();
// });

// passport config
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    cookie: { maxAge: 100 * 60 * 1000 },
  })
);

// Initializing Passport
app.use(passport.initialize());
// Starting the session
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.use(indexRoute);
app.use("/products", productRoutes);
app.use(reviewRoutes);
app.use(replyRoutes);
app.use(userRoutes);
app.use(aboutRoute);
app.use(cartRoutes);
app.use(checkoutRoute);

module.exports = app;
