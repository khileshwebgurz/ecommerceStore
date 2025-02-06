import React, { useEffect, useState } from "react";
import axios from "axios";

import Banner from "./Banner";
import PriceFilter from "./PriceFilter";
import ProductCards from "./ProductCards";
import Paginations from "./Paginations";
import '../App.css'
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products?page=${currentPage}&limit=9`
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

  if (error) {
    return <p>{error}</p>;
  }

  const handleSortProduct = (newSortedProducts) => {
    setProducts(newSortedProducts);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };



  return (
    <>
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}></div>
      <Banner />
      <PriceFilter sortProduct={handleSortProduct} />
      {loading ? (
        <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", margin: "20px 0" }}>Loading products...</p>
      ) : (
        <ProductCards products={products} />
      )}

      <Paginations
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Home;
