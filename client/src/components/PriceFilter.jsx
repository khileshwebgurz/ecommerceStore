import Dropdown from "react-bootstrap/Dropdown";


function PriceFilter({ setSortOrder }) {

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 20px",
        marginBottom: "20px",
      }}
    >
      <Dropdown>
        <Dropdown.Toggle
          as="input"
          variant="success"
          id="dropdown-basic"
          readOnly
          // value={selectedPrice || 'Sort by Price'}
          value="Sort by Price"
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
          <Dropdown.Item onClick={() => setSortOrder("lowToHigh")}>
            Price Low to High
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSortOrder("highToLow")}>
            Price High to Low
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default PriceFilter;
