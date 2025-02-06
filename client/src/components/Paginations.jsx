import Pagination from "react-bootstrap/Pagination";

const Paginations = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <Pagination style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <Pagination.Prev
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ fontWeight: "bold", color: "#007bff" }}
      />
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
          style={{
            fontWeight: "bold",
            backgroundColor: page === currentPage ? "#ff6f61" : "#fff",
            color: page === currentPage ? "#fff" : "#333",
            borderRadius: "5px",
          }}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        style={{ fontWeight: "bold", color: "#007bff" }}
      />
    </Pagination>
  );
};

export default Paginations;
