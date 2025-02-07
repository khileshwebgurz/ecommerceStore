import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addToProduct } from "../features/cartSlice";
import { useDispatch } from "react-redux";
const Admin = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    thumbnail: "",
    quantity: 1,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview
        setFormData({ ...formData, thumbnail: reader.result }); // Store image as Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      toast.success("Product Added Successfully", {
        position: "bottom-right",
      });
      dispatch(addToProduct(formData))
      console.log("Product Data:", formData);
      setFormData({ title: "", price: "", thumbnail: "", quantity: 1 });
    } catch (error) {
      console.error('error',error)
    }
   
    // API call to store data in MongoDB
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #1c1c1c, #292929)",
      }}
    >
      <Container>
        <Card
          style={{
            maxWidth: "600px",
            margin: "auto",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
            color: "white",
          }}
        >
          <h2 className="text-center mb-4" style={{ fontWeight: "bold" }}>
            🛍️ Add New Product
          </h2>
          <Form onSubmit={handleSubmit}>
            {/* Product Name */}
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  color: "white",
                }}
              />
            </Form.Group>

            {/* Price */}
            <Form.Group className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  color: "white",
                }}
              />
            </Form.Group>

            {/* Thumbnail Upload */}
            <Form.Group className="mb-3">
              <Form.Label>Upload Thumbnail</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  color: "white",
                }}
              />
            </Form.Group>

            {/* Image Preview */}
            {imagePreview && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "15px",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Thumbnail Preview"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                  }}
                />
              </div>
            )}

            {/* Quantity */}
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                required
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  color: "white",
                }}
              />
            </Form.Group>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-100"
              style={{
                background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
                border: "none",
                padding: "12px",
                fontWeight: "bold",
                transition: "0.3s",
              }}
            >
              Add Product
            </Button>
          </Form>
        </Card>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Admin;
