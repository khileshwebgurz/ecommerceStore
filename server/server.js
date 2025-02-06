const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const CartRoutes = require("./routes/cartRoutes");
const AddressRoutes = require("./routes/addressRoutes")
const UserRoutes = require("./routes/userRoutes")
const PaymentRoutes = require("./routes/paymentRoutes")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/cartDB")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
// here api for productRoutes bcz they are being shown on home page and coming from server
app.use("/api", productRoutes);
// this is being shown at /cart page
app.use("/cart", CartRoutes);

// this is being shown at /address page
app.use("/address",AddressRoutes)

// this is for user page
app.use("/users",UserRoutes)

// this is for payment page
app.use('/createOrder',PaymentRoutes)


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
