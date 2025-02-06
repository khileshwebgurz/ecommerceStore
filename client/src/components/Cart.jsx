import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartFromDB,
  removeFromCartAndSync,
  updateCartQuantity,
} from "../features/cartSlice";
import PaymentBtn from "./PaymentBtn";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      dispatch(fetchCartFromDB());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCartAndSync(id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateCartQuantity(id, newQuantity));
    } else {
      handleRemoveFromCart(id);
    }
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }
  const total = cartItems.reduce((previousValue, currentItem) => {
    return previousValue + currentItem.price * currentItem.quantity;
  }, 0);


  return (
    <>
      <Container style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
        {cartItems.length > 0 ? (
          <>
          <h2 style={{ textAlign: "center", fontWeight: "bold", marginBottom: "20px" }}>Shopping Cart</h2>
          <Row >
            {cartItems.map((item, index) => (
              <Col key={index} md={4} style={{ marginBottom: "20px" }}>
                <Card style={{
                    width: "100%",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                    padding: "15px",
                  }}>
                  <Card.Img
                    variant="top"
                    src={
                      item.thumbnail || "../../public/ProductImg/product.avif"
                    }
                    alt={item.name}
                    style={{ height: "250px", objectFit: "cover", borderRadius: "10px" }}
                  />

                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Title style={{ fontSize: "18px", fontWeight: "bold" }}>{item.title}</Card.Title>
                    <Card.Text style={{ fontSize: "16px", fontWeight: "bold", color: "#007bff" }}>
                      ${item.price}
                    </Card.Text>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                    <button
                     style={{
                      height: "30px",
                      width: "30px",
                      border: "none",
                      borderRadius: "5px",
                      backgroundColor: "#ff6f61",
                      color: "#fff",
                      fontSize: "18px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span style={{ fontSize: "18px", fontWeight: "bold", minWidth: "40px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                    <button
                      style={{
                          height: "30px",
                          width: "30px",
                          border: "none",
                          borderRadius: "5px",
                          backgroundColor: "#4CAF50",
                          color: "#fff",
                          fontSize: "18px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          marginLeft: "10px",
                        }}
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                    </div>


                    <Button
                      variant="dark"
                     style={{
                        width: "100%",
                        backgroundColor: "#dc3545",
                        border: "none",
                        fontWeight: "bold",
                        padding: "10px",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c82333")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}
                      onClick={() => handleRemoveFromCart(item._id)}
                    >
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
            }}
          >
            <h3 style={{ fontWeight: "bold" }}>Subtotal</h3>
            <h4 style={{ color: "#007bff", fontSize: "20px" }}>Total: ${total.toFixed(2)}</h4>
            <p style={{ fontSize: "16px", color: "#666" }}>
              {`${cartItems.length} items are shipped, and taxes will be calculated at checkout.`}
            </p>
            <PaymentBtn />
          </div>
        </>
        ) : (
          <h3 style={{ textAlign: "center", padding: "40px", fontSize: "22px", fontWeight: "bold", color: "#777" }}>
            You cart is Empty...
          </h3>
        )}
        
      </Container>
    </>
  );
};

export default Cart;
