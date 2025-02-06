// models/Address.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  type: { type: String, required: true },
  street: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"}
});

module.exports = mongoose.model("Address", addressSchema);
