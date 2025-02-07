import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";

import { addToCartAndSync } from "../features/cartSlice";

function ProductCards({ products }) {
  const dispatch = useDispatch();

  const dataIs = sessionStorage.getItem('token')


  const handleAddToCart = async (e, product) => {
    try {
      if(dataIs){
        dispatch(addToCartAndSync(product));
        toast.success("Item added to cart", {
          position: "bottom-right",
        });
      }else{
        e.preventDefault();
      }

      
    } catch (error) {
      console.error("Failed to save product:", error);
    }
  };

  return (
    <Container>
      <Row style={{ paddingTop: "15px" }}>
        {products.map((product, index) => (
          <Col key={index} md={4} style={{ marginBottom: "15px" }}>
            <Card
              style={{
                width: "18rem",
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                transition: "transform 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <Card.Img
                variant="top"
                style={{ height: "250px", objectFit: "cover" }}
                src={
                  product.thumbnail || "../../public/ProductImg/product.avif"
                }
                alt={product.name}
              />
              <Card.Body style={{ textAlign: "center" }}>
                <Card.Title style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {product.title}
                </Card.Title>
                <Card.Text
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#007bff",
                  }}
                >
                  ${product.price}
                </Card.Text>

                <Button
                  variant="primary"
                  onClick={(e) => handleAddToCart(e ,product)}
                  style={{
                    width: "100%",
                    backgroundColor: "#ff6f61",
                    border: "none",
                    fontWeight: "bold",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#e65550")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#ff6f61")
                  }
                >
                  Add To Cart
                </Button>

               
              </Card.Body>
            
            </Card>
            <ToastContainer />
          </Col>
          
        ))}
      </Row>
    </Container>
  );
}

export default ProductCards;
