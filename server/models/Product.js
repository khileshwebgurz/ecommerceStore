const mongoose = require("mongoose");

// Define Product Schema
const productSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number},
  thumbnail: { type: String },
  quantity:{type:Number}, //this is required from here bcz we will set to 1 by default and on increment/decrement this is updated on cart collection in db.

});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;



