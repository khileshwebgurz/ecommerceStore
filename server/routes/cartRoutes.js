const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.post("/", async (req, res) => {
  try {
    const { title, price, thumbnail, quantity, _id,userId } = req.body;
    const ProductId = _id;
    const UserId = userId;
 
    // Check if the product already exists in the user's cart
    const existingItem = await Cart.findOne({ ProductId });
    if (existingItem) {
      // If the item exists, increment its quantity
      existingItem.quantity += quantity; // You can adjust this logic to add specific quantity
      await existingItem.save();
      res.json({ message: "Product quantity updated in cart" });
    } else {
      // Create and save a new cart item
      const newItem = new Cart({
        title,
        price,
        thumbnail,
        quantity,
        ProductId,
        UserId
      });
      await newItem.save();

      res.json({ message: "Product added to cart successfully!" });
    }
  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the cart item by ID
    const deletedItem = await Cart.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json({ message: "Deleted Cart Item" });
  } catch (err) {
    console.error("Error deleting cart item:", err);
    res.status(500).json({ message: "Failed to delete cart item" });
  }
});

// extracting only those items in a cart based on logged in user.
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const cartItems = await Cart.find({ UserId: userId });
    res.json({ items: cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // Update the quantity in the database
    await Cart.findByIdAndUpdate(id, { quantity });

    res.status(200).json({ message: "Quantity updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update quantity" });
  }
});

module.exports = router;


