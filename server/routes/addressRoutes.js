// routes/addressRoutes.js
const express = require("express");
const Address = require("../models/Address");
const router = express.Router();

// Add a new address
router.post("/", async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).json({ message: "Address added successfully", address });
  } catch (error) {
    res.status(500).json({ message: "Error adding address", error });
  }
});

// Fetch all addresses
router.get("/", async (req, res) => {
  try {
    const addresses = await Address.find();
    res.json({ addresses });
  } catch (error) {
    res.status(500).json({ message: "Error fetching addresses", error });
  }
});

module.exports = router;
