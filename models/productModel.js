const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: [true, "A product must have a name"],
  },
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  summary: {
    type: String,
    required: [true, "A product must have a brief description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A product must have a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Ratings average should not be less than 1"],
    max: [5, "Ratings average should not be above 5"],
  },

  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

// Populate Reviews on products
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "reviews",
    // show only these reviews props
    select: "text author",
  });
  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
