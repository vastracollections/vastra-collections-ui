import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./AllProduct.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const AllProductsPage = () => {
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [showAvailable, setShowAvailable] = useState(true);
  
  const location = useLocation();
  const { state } = location;
  const searchParameter = state?.searchParameter || null;
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async (query) => {
      try {
        const url = query
          ? `https://api.thevastracollections.com/products/search?query=${query}`
          : "https://api.thevastracollections.com/products/getAllProducts";
        const response = await axios.get(url);
        setProductList(response?.data);
        setFilteredProducts(response?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts(searchParameter);
  }, [searchParameter]);

  useEffect(() => {
    let updatedProducts = [...productList];
    
    if (showAvailable) {
      updatedProducts = updatedProducts.filter(product => product.quantitiesAvailable > 0);
    }
    
    if (sortOrder === "lowToHigh") {
      updatedProducts.sort((a, b) => 
        (a.price - (a.price * a.discountInPercentage) / 100) - 
        (b.price - (b.price * b.discountInPercentage) / 100)
      );
    } else if (sortOrder === "highToLow") {
      updatedProducts.sort((a, b) => 
        (b.price - (b.price * b.discountInPercentage) / 100) - 
        (a.price - (a.price * a.discountInPercentage) / 100)
      );
    }

    setFilteredProducts(updatedProducts);
  }, [sortOrder, showAvailable, productList]);

  const handleNavigation = (product) => {
    navigate(`/products/${product.id}`);
  };

  const handleAddToCart = (product) => {
    let productIds = JSON.parse(localStorage.getItem("productIds")) || [];
    if (!productIds.includes(product.id)) {
      productIds.push(product.id);
      localStorage.setItem("productIds", JSON.stringify(productIds));
    }
    navigate(`/Cart`);
  };

  return (
    <div>
      <Header />
      <div className="all-products-container">
        <h1 className="page-title">{searchParameter || "ALL PRODUCTS"}</h1>
        <div className="filter-sort-container">
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Sort By Price</option>
            <option value="lowToHigh">Lowest to Highest</option>
            <option value="highToLow">Highest to Lowest</option>
          </select>
          <label>
            <input
              type="checkbox"
              checked={showAvailable}
              onChange={() => setShowAvailable(!showAvailable)}
            />
            Show Only Available Products
          </label>
        </div>
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="products" key={product.id}>
              <div onClick={() => handleNavigation(product)}>
                <img src={product?.imageUrls?.[0]} alt={product.name} className="product-image" />
                <h3 className="product-name">{product.name}</h3>
                <p>
                  <span style={{ textDecoration: "line-through", color: "gray", marginRight: "8px" }}>
                    ₹{product.price.toLocaleString()}
                  </span>
                  <span style={{ fontWeight: "bold", color: "red", marginRight: "8px" }}>
                    ₹{(product.price - (product.price * product.discountInPercentage) / 100).toFixed(2)}
                  </span>
                  <span style={{ fontWeight: "bold", color: "green" }}>
                    ({product.discountInPercentage}% OFF)
                  </span>
                </p>
              </div>
             {product.quantitiesAvailable > 0 ? (
  <button
    className="addcart"
    onClick={(e) => {
      e.stopPropagation(); // Prevent parent div click event
      handleAddToCart(product);
    }}
  >
    Add to Cart
  </button>
) : (
  <span style={{ fontWeight: "bold", color: "red" }}>Sold Out</span>
)}

            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProductsPage;