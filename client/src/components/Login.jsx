import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <>
      <div className="container">
        <h1>Login</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            required
            onChange={handleInputChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            value={formData.password}
            onChange={handleInputChange}
          />

          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
