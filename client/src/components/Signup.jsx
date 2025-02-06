import React, { useState } from "react";
import { addUserAndSync } from "../features/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    dispatch(addUserAndSync(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
    });
    navigate("/login");
  };
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card
        className="shadow-lg p-4 border-0"
        style={{ maxWidth: "400px", width: "100%" }}
      >
        <h2 className="text-center fw-bold mb-3">Sign Up</h2>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              style={{ padding: "10px" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Email</Form.Label>
            <Form.Control
              type="text"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              style={{ padding: "10px" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              style={{ padding: "10px" }}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="dark"
            className="w-100 py-2"
            onClick={handleSignup}
          >
            Sign Up
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Signup;
