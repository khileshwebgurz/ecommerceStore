import { Link, useNavigate } from "react-router-dom";

import { Navbar, Container, Nav, Form, FormControl,InputGroup,Button } from "react-bootstrap";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

function Navb({ setSearchQuery }) {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleLogout = () => {
    sessionStorage.removeItem("token"); // Clear the token
    navigate("/login"); // Redirect to login page
  };

  const handleSearch = (e) => {

    if (e.key === "Enter") {
      e.preventDefault();
      setSearchQuery(search.trim());
    }
  };

  const handleClear = () => {
    setSearch("");
    setSearchQuery("");
  };

  return (
    <Navbar expand="lg" className="bg-dark navbar-dark py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-light">
          MERN-shop
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Form className="d-flex">
              <InputGroup>
                <FormControl
                  type="input"
                  placeholder="Search products..."
                  className="me-2"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleSearch} // Search on Enter key
                  style={{ width: "250px", borderRadius: "5px" }}
                />
                {search && (
                  <Button variant="outline-secondary" onClick={handleClear}>
                    ✕
                  </Button>
                )}
              </InputGroup>
            </Form>
          </Nav>

          {/* Login/Logout Button */}
          {token ? (
            <Navbar.Brand
              onClick={handleLogout}
              style={{ cursor: "pointer", color: "#fff" }}
            >
              Logout
            </Navbar.Brand>
          ) : (
            <>
              <Navbar.Brand as={Link} to="/login" className="text-light">
                Login
              </Navbar.Brand>
              <Navbar.Brand as={Link} to="/signup" className="text-light">
                Signup
              </Navbar.Brand>
            </>
          )}

          {/* Cart Icon */}
          <Link to="/cart" className="ms-3 position-relative">
            <img src="/cart.png" alt="Cart" width="40" />
            {cartItems.length > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "12px" }}
              >
                {cartItems.length}
              </span>
            )}
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navb;
