const Product = require("../models/productModel");
const Review = require("../models/reviewModel");

// exports.getReviewForm = async (req, res) => {
//   try {
//     // find product by ID
//     // const foundProduct = await Product.findById(req.params.id);
//     // send response & render template
//     res.status(200).render("reviews/new", { product_id: req.params.id });
//     // console.log(foundProduct);
//   } catch (err) {
//     res.status(404).json({
//       status: "fail",
//       message: err,
//     });
//   }
// };

exports.createReview = async (req, res) => {
  try {
    // find product with provided ID
    const foundProduct = await Product.findById(req.params.id);
    // get data from review form
    const review = req.body.review;
    // create new review
    const newReview = await Review.create(review);
    // add author's username & id to review
    newReview.author.username = req.user.username;
    newReview.author.id = req.user._id;
    // save review
    newReview.save();
    // add new review to reviews array
    foundProduct.reviews.push(newReview);
    // save product with new review
    foundProduct
      .save()
      .then((doc) => console.log("REVIEW SAVED TO DB"))
      .catch((err) => console.log(err));
    // redirect to show page
    res.status(201).redirect("/products/" + req.params.id);
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
