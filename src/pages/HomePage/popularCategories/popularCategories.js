import React, { useState, useEffect } from "react";
import Footer from "../../../components/Footer/Footer";
import "./popularCategories.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi"; // Import an icon for better UI

const PopularCategories = () => {

    const [allCategoriesList, setAllCategoriesList] = useState([]);
    const [topRatedProductsList, setTopRatedProductsList] = useState([]);
  
  
    const getAllCategoriesList = async () => {
      try {
        const response = await axios.get(`https://api.thevastracollections.com/categories/getAllCategories`);
        setAllCategoriesList(response?.data);
  
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Re-throw the error for further handling
      }
    };
  
    useEffect(() => {
      getAllCategoriesList();
      getTopRatedProductsList();
    }, []);
  
    const getTopRatedProductsList = async () => {
      try {
        const response = await axios.get(`https://api.thevastracollections.com/products/getTopRatedProducts`);
        setTopRatedProductsList(response?.data?.reverse() || []);
  
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error; // Re-throw the error for further handling
      }
    };
  
  
    //*changes*/
    const navigate = useNavigate();
  
    const handleNavigationToProduct = (product) => {
      navigate(`/products/${product.id}`)
    }
  
    const [showSnackbar, setShowSnackbar] = useState(false);
  
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
    };
  
  
    return (
      <div className="page-container">
        {/* Popular Categories Section */}
        <div className="container">
  <h2 className="section-cat">Popular Categories</h2>
  <div className="popular-categories">
    {allCategoriesList.slice(0, 8).map((category, index) => (
      <div key={index} className="category-card">
        <img 
          src={category?.imageUrl} 
          height="20px" 
          width="15px" 
          alt={category.name} 
          className="category-image" 
        />
        <div className="title">{category.name}</div>
      </div>
    ))}
  </div>
</div>

  
        {/* Popular Products Section */}
        <h2 className="section-pro">Popular Products</h2>
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
        
  <div class="contact-container">
  <h2>Contact Us</h2>
  <div class="contact-form">
    <div class="input-group">
      <input type="text" placeholder="Name" class="input-box" />
      <input type="text" placeholder="Phone number" class="input-box" />
    </div>
    <div class="input-group">
      <input type="email" placeholder="Email" class="input-box" />
      <input type="text" placeholder="Query" class="input-box" />
    </div>
  </div>
  <button class="send-btn">Send</button>
</div>
        <Footer />
      </div>
    );
  };

  export default PopularCategories;