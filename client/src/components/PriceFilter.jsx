import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';

function PriceFilter({ sortProduct }) {
  const [selectedPrice, setSelectedPrice] = useState('');
 



  const handleLowToHigh = () => {
    setSelectedPrice('Low');
    sortProduct((prevProducts) =>
      [...prevProducts].sort((a, b) => a.price - b.price)
    );
  };

  const handleHighToLow = () => {
    setSelectedPrice('High');
    sortProduct((prevProducts) =>
      [...prevProducts].sort((a, b) => b.price - a.price)
    );
  };

  return (
    <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px 20px", marginBottom: "20px" }}>

      <Dropdown>
        <Dropdown.Toggle
          as="input"
          variant="success"
          id="dropdown-basic"
          readOnly
          value={selectedPrice || 'Sort by Price'}
          style={{
            width: "200px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            cursor: "pointer",
            backgroundColor: "#fff",
            fontWeight: "bold",
          }}
        />

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleLowToHigh}>Price Low to High</Dropdown.Item>
          <Dropdown.Item onClick={handleHighToLow}>Price High to Low</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default PriceFilter;

