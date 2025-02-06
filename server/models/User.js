const mongoose = require("mongoose");

// Define Product Schema
const userSchema = new mongoose.Schema({
  username: {type: String},
  email: {type: String},
  password: {type: String}

});

const User = mongoose.model("User", userSchema);
module.exports = User;
