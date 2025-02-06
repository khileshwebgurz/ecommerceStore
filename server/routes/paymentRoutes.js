const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();




const razorpay = new Razorpay({
  key_id: "rzp_live_RZujvhNA6e4bSq",
  key_secret: "bRL8duW0yduTYbFTU8rVEVeZ",
});

// Create Razorpay Order
router.post("/", async (req, res) => {
  const { amount } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount, // Amount in smallest unit
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

module.exports = router;