const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// post the products
router.post("/products", async (req, res) => {
  try {
    const { title, price, thumbnail, quantity } = req.body.product;
    const newProduct = new Product({
      title,
      price,
      thumbnail,
      quantity,
    });
    await newProduct.save();
    res.json({ message: "Product added to cart successfully!" });
  } catch (error) {
    console.error("Error Adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// GET all products
router.get("/products", async (req, res) => {
  try {
    const { page = "1", limit = 9, search = "", sort = "" } = req.query;

    const pageNumber = parseInt(page, 10);

    const limitNumber = parseInt(limit, 10);

    //  $options: "i" will make sure that laptop and Laptop are same ,making case insensitive for search.
    const query = search
      ? { title: { $regex: `.*${search}.*`, $options: "i" } }
      : {};

    // Define sorting condition
    let sortCondition = {};
    if (sort === "lowToHigh") sortCondition = { price: 1 }; // Ascending
    if (sort === "highToLow") sortCondition = { price: -1 }; // Descending

    const products = await Product.find(query)
      .sort(sortCondition)
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

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
