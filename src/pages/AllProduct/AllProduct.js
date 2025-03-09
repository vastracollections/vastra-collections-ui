import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./AllProduct.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProductsPage = () => {
  const [productList, setProductList] = useState([]);
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
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts(searchParameter);
  }, [searchParameter]);

  /*changes**/
  const handleNavigation = (product) => { navigate(`/products/${product.id}`) }
  const handleAddToCart = (product) => {
       let productIds = JSON.parse(localStorage.getItem("productIds")) || [];
  
      if (!productIds.includes(product.id)) {
        productIds.push(product.id);
        localStorage.setItem("productIds", JSON.stringify(productIds));

      }
      if (productIds.includes(product.id)) {
        
        navigate(`/Cart`)
      }
  };


  return (
    <div>
      <Header />
      <div className="all-products-container">
        <h1 className="page-title">{searchParameter || "ALL PRODUCTS"}</h1>
        <div className="products-grid">
          {productList.map((product) => (
            <div className="products"
              key={product.id}

            >
              <div onClick={() => handleNavigation(product)}><img src={product?.imageUrls?.[0]} alt={product.name} className="product-image" />
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
              <button className="addcart" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <Popular handleAddToCart={handleAddToCart} />
      </div>
      {/* <div className="promo-container">
        <div className="promo-box">
          <div className="image-section">
            <img src="https://i.pinimg.com/236x/e0/d3/df/e0d3df8eea55125dda908b0c59c9e456.jpg" alt="Saree 1" className="promo-image" />
            <img src="https://i.pinimg.com/236x/f8/89/14/f889145d1b7b202adf21d8767bac8a31.jpg" alt="Saree 2" className="promo-image" />
            <img src="https://i.pinimg.com/236x/a1/b4/83/a1b4831ff5b4c21e40a00f96ac021cb3.jpg" alt="Saree 3" className="promo-image" />
          </div>

          <div className="text-section">
            <p className="new-arrival">New Arrival</p>
            <h2 className="promo-title">
              Where Every Saree <br /> Tells a Story of <br /> Tradition and Grace
            </h2>
            <Link to="/all-products">
              <button className="shop-button">Shop Now</button>
            </Link>
          </div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

const Popular = ({ handleAddToCart }) => {
  const products = [
    { id: 1, name: "Demo Silk Saree", price: 7500, img: "https://i.pinimg.com/236x/e3/30/6a/e3306afbf7e3cad140666c0a761f0dd2.jpg" },
    { id: 2, name: "Demo Silk Saree", price: 25.700, img: "https://i.pinimg.com/474x/bd/ce/c4/bdcec4687a17510ba62eb22ec642c221.jpg" },
    { id: 3, name: "Demo Silk Saree", price: 22.500, img: "https://i.pinimg.com/736x/d7/40/fa/d740fa7bcb4f4326e7c48c3a40a1607e.jpg" },
    { id: 4, name: "Demo Silk Saree", price: 11.150, img: "https://i.pinimg.com/474x/95/6f/eb/956febeb9eee5f06804270d563bca111.jpg" },
  ];

  const navigate = useNavigate();

  const handleNavigation = (product) => {
    navigate(`/products/${product.id}`)
  }
  return (
    <div className="pro-container">
      {/* <h2>Popular Products</h2> */}
      <div className="popular-products">
        {/* {products.map((product) => (
          <div key={product.id}
            className="product-card" onClick={() => handleNavigation(product)}
          >
            <img src={product.img} alt={product.name} className="product-image" />
            <div className="title">{product.name}</div>
            <div className="price">{product.price}</div>
            <button className="btn" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default AllProductsPage;
