const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const User = require("../models/User");

// GET all products
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to get users' });
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;


  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the password
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "james", // Use an environment variable for the secret key
      { expiresIn: "1h" } // Token expiration time
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = await User(req.body);
    await user.save();
  } catch (error) {
    res.status(500).json({ message: "Error user" });
  }
});

module.exports = router;
