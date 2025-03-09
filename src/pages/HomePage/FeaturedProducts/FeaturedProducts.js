import React, { useState, useEffect } from "react";
import "./FeaturedProducts.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = () => {

    const [topRatedProductsList, setTopRatedProductsList] = useState([]);
  
    const getTopRatedProductsList = async () => {
      try {
        const response = await axios.get(`https://api.thevastracollections.com/products/getTopRatedProducts`);
        setTopRatedProductsList(response?.data);
  
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Re-throw the error for further handling
      }
    };
  
    useEffect(() => {
      getTopRatedProductsList();
    }, []);
  
    const navigate = useNavigate();
  
      const [showSnackbar, setShowSnackbar] = useState(false);
  
    const handleNavigationToProduct = (product) => { navigate(`/products/${product.id}`) }
  
    const handleNavigationToAddToCart = (product) => {
      console.log(`product id is ${product.id}`)
      let productIds = JSON.parse(localStorage.getItem("productIds")) || [];
  
      if (!productIds.includes(product.id)) {
        productIds.push(product.id);
        localStorage.setItem("productIds", JSON.stringify(productIds));
  
        // Show snackbar
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000); // Hide after 3s
      }
      if (productIds.includes(product.id)) {
        
        navigate(`/Cart`)
      }
    }
  
    return (
      <section className="featured-products">
        <div className="Features">
          <h2>Featured Products</h2>
          <a href className="view-all"
            onClick={() => navigate("/all-products")}>
            View All →
          </a>
        </div>
        <div className="featured-product-list">
{topRatedProductsList?.slice(0, 4).map((product) => (
  <div 
    className="product-card" 
    key={product.id} 
    onClick={() => handleNavigationToProduct(product)} 
    style={{ cursor: "pointer" }}
  >
    <img src={product?.imageUrls?.[0]} alt={product.name} />
    <h3>{product.name}</h3>
    <div className="product-info">
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
      {product.quantitiesAvailable > 0 ? (
        <button 
          className="btn"
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent div click event
            handleNavigationToAddToCart(product);
          }}
        >
          Add to Cart
        </button>
      ) : (
        <span style={{ fontWeight: "bold", color: "red" }}>Sold Out</span>
      )}
    </div>
  </div>
))}

  </div>
  
      </section>
    );
  };

  export default FeaturedProducts;