const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    // get all products from DB
    const allProducts = await Product.find();
    // send response
    res.status(200).render("products/index", {
      products: allProducts,
      currentUser: req.user,
      cart: req.session.cart,
    });
  } catch (err) {
    res.status(404).redirect("back");
    console.log(err);
  }
};

exports.getProductDetail = async (req, res) => {
  try {
    //  find product with provided ID
    const foundProduct = await Product.findById(req.params.id);
    // send response
    res.status(200).render("products/product-details", {
      product: foundProduct,
      currentUser: req.user,
      cart: req.session.cart,
    });
  } catch (err) {
    res.status(404).redirect("back");
    console.log(err);
  }
};

// const testProduct = new Product({
//   name: "Modular coffee table",
//   price: 695,
//   summary: "Best coffee table, availabe in different sizes",
//   imageCover:
//     "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/4Coffee_Table.jpg/640px-4Coffee_Table.jpg",
// });

// testProduct
//   .save()
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log("ERROR💥 :", err));

// const testReview = new Review({
//   review: "I love this product.",
//   author: "khena"
// })

// testReview.save().then((doc)=> console.log(doc)).catch((err)=> console.log("ERROR💥:", err))
