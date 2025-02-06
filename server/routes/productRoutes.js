const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// GET all products
router.get("/products", async (req, res) => {
  try {
    
    const { page = 1, limit = 9, search = "" } = req.query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const query = search ? { title: { $regex: `.*${search}.*`, $options: "i" } } : {}; // Case-insensitive search
   

    const products = await Product.find(query).skip((pageNumber - 1) * limitNumber).limit(limitNumber);
   

    const totalProducts = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(totalProducts / limitNumber),
      currentPage: pageNumber,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
