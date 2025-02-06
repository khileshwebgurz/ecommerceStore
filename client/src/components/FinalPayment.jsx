import React from "react";
import { Container, Card, Button } from "react-bootstrap";
const FinalPayment = () => {
  const handlePayment = async () => {
    try {
      // Fetch order details from backend
      const response = await fetch("http://localhost:5000/createOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 500 }), // Pass amount in smallest unit, e.g., 500 paise for ₹5
      });

      const orderData = await response.json();

      if (!orderData.id) {
        alert("Failed to create order");
        return;
      }

      const options = {
        key: "rzp_live_RZujvhNA6e4bSq", // Replace with your Razorpay key
        amount: orderData.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: orderData.id,
        handler: (response) => {
          // Handle successful payment
          console.log(response);
          alert("Payment Successful");
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", (response) => {
        // Handle payment failure
        console.error(response);
        alert("Payment Failed");
      });

      rzp1.open();
    } catch (error) {
      console.error(error);
      alert("Error during payment initialization");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="shadow-lg border-0 text-center p-4" style={{ maxWidth: "400px" }}>
        <h2 className="fw-bold mb-3">Final Payment</h2>
        <p className="text-muted">Complete your purchase securely</p>
        {/* <h4 className="fw-bold text-success">${total.toFixed(2)}</h4> */}
        <Button 
          variant="dark" 
          className="w-100 mt-3 py-2 fs-5"
          onClick={handlePayment}
        >
          Pay Now
        </Button>
      </Card>
    </Container>
  );
};

export default FinalPayment;
