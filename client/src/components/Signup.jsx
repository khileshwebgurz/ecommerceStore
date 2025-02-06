import React, { useState } from "react";
import {addUserAndSync} from '../features/cartSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
    navigate('/login')
  };
  return (
    <>
      <h1>SignUp</h1>

      <label>Full Name</label>
      <input
        type="text"
        name="name"
        required
        value={formData.name}
        onChange={handleInputChange}
      />

      <label>Email</label>
      <input
        type="text"
        name="email"
        required
        value={formData.email}
        onChange={handleInputChange}
      />

      <label>Password</label>
      <input
        type="text"
        name="password"
        required
        value={formData.password}
        onChange={handleInputChange}
      />

      <button type="submit" onClick={handleSignup}>
        Signup
      </button>
    </>
  );
};

export default Signup;
