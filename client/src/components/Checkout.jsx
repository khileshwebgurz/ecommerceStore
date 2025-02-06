import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";
import { addAddressAndSync } from "../features/cartSlice";
import Cart from "./Cart";

function BasicExample() {
  const dispatch = useDispatch();
  // const addressItems = useSelector((state) => state.cart.addresses);
  const [formData, setFormData] = useState({
    type: "",
    street: "",
    country: "",
    phone: "",
    city: "",
    state: "",
    postalCode: "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();

    dispatch(addAddressAndSync(formData));
    setFormData({
      type: "",
      street: "",
      country: "",
      phone: "",
      city: "",
      state: "",
      postalCode: "",
    });
  };

  return (
    <>
    <Container className="py-5">
    <h2 className="mb-4 text-center">Checkout</h2>
    <Form className="border p-4 rounded shadow-sm bg-white" onSubmit={handleAdd}>
    <h5 className="fw-bold">Shipping Address</h5>

        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Home, Business"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={formData.street}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="number"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
          />
        </Form.Group>

       <Button variant="dark" className="w-100" type="submit">
          ADD ADDRESS
        </Button>
      </Form>


{/* Address Selection */}
      <div className="mt-4">
      <h5 className="fw-bold">Select Delivery Address</h5>
        <Form.Check
          inline
          name="group1"
          type="radio"
          id="home-radio"
          label="Home Side"
          className="mb-2"
        />
        </div>
      
      {/* order Summary */}
      <div className="p-4 bg-light rounded mt-4">
        <h5 className="fw-bold">Order Summary</h5>
        <Cart />
      </div>
      </Container>
    </>
  );
}

export default BasicExample;
