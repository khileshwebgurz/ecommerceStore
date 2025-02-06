import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function Navb() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login page
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MERN-shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>

          {/* Login/Logout Button */}
          {token ? (
            <Navbar.Brand onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </Navbar.Brand>
          ) : (
            <Navbar.Brand as={Link} to="/login">
              Login
            </Navbar.Brand>
          )}

          {/* Signup Button (only visible if not logged in) */}
          {!token && (
            <Navbar.Brand as={Link} to="/signup">
              Signup
            </Navbar.Brand>
          )}

          {/* Cart Button */}
          <Button as={Link} to="/cart" variant="primary">
            Cart <Badge bg="secondary">{cartItems.length}</Badge>
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;
