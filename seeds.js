const mongoose = require("mongoose");
const Product = require("./models/productModel");
const Review = require("./models/reviewModel");

const data = [
  {
    name: "Spring Sofa",
    price: 457,
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate adipisci laborum iusto omnis? Neque fugiat autem quisquam perferendis obcaecati error a quam laboriosam magni explicabo sequi vero accusamus, at repellat!",
    imageCover: "http://localhost:5000/img/chair.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Spring Bed",
    price: 328,
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate adipisci laborum iusto omnis? Neque fugiat autem quisquam perferendis obcaecati error a quam laboriosam magni explicabo sequi vero accusamus, at repellat!",
    imageCover: "http://localhost:5000/img/bed.jpg",

    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    name: "Swing Chair",
    price: 289,
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate adipisci laborum iusto omnis? Neque fugiat autem quisquam perferendis obcaecati error a quam laboriosam magni explicabo sequi vero accusamus, at repellat!",
    imageCover: "http://localhost:5000/img/basket.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },

  {
    name: "Sofa",
    price: 400,
    summary:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate adipisci laborum iusto omnis? Neque fugiat autem quisquam perferendis obcaecati error a quam laboriosam magni explicabo sequi vero accusamus, at repellat!",
    imageCover: "http://localhost:5000/img/chair2.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

function seedDB() {
  // remove all products
  Product.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    } else {
      // add a few products to DB
      data.forEach((seed) => {
        Product.create(seed, (err, product) => {
          if (err) {
            console.log(err);
          } else {
            console.log("added product");
            // create a comment
            Review.create(
              {
                text: "I love this product",
                author: "khena",
              },
              (err, review) => {
                if (err) {
                  console.log(err);
                } else {
                  product.reviews.push(review);
                  product.save();
                  console.log("Created new comment");
                }
              }
            );
          }
        });
      });
    }
  });
}

module.exports = seedDB;
