import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        formData
      );

      // Save the token to SessionStorage or cookies
      sessionStorage.setItem("token", response.data.token);

      // Clear form fields and error message
      setFormData({ email: "", password: "" });
      setError("");

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
    <Card className="shadow-lg p-4 border-0" style={{ maxWidth: "400px", width: "100%" }}>
      <h2 className="text-center fw-bold mb-3">Login</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={formData.email}
            required
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

        <Button type="submit" variant="dark" className="w-100 py-2">
          Login
        </Button>
      </Form>
    </Card>
  </Container>
  );
};

export default Login;
