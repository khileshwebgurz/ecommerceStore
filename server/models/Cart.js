const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  title: { type: String },
  price: { type: Number },
  thumbnail: { type: String },
  quantity: {type: Number},
  ProductId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  UserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
