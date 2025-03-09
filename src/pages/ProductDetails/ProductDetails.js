import React, { useState, useEffect } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.thevastracollections.com/products/getProductById?id=${id}`);
        const data = await response.json();
        setProduct(data);
        setMainImage(data.imageUrls && data.imageUrls.length > 0 ? data.imageUrls?.[0] : "");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  if (!product) {
    return <p>Loading product details...</p>;
  }

    const handleNavigationToAddToCart = (product) => {
        console.log(`product id is ${product.id}`)
      let productIds = JSON.parse(localStorage.getItem("productIds")) || [];
  
      if (!productIds.includes(product.id)) {
        productIds.push(product.id);
        localStorage.setItem("productIds", JSON.stringify(productIds));
  
        // Show snackbar
        // setShowSnackbar(true);
        // setTimeout(() => setShowSnackbar(false), 3000); // Hide after 3s
      }
      if (productIds.includes(product.id)) {
        
        navigate(`/Cart`)
      }
    };

  return (
    <div>
      <Header />
      <div className="product-details-container">
        {/* Left - Product Images */}
        <div className="image-gallery">
          {/* Main Image */}
          {mainImage && <img src={mainImage} alt="Main" className="main-image" />}

          {/* Thumbnails */}
          <div className="thumbnail-container">
            {product.imageUrls?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right - Product Details */}
        <div className="product-info">
          <p className="rating">⭐ {product.ratings}</p>
          <h2 className="product-title">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-additional-info">{product.additionalInfo}</p>
          <p>
      <span style={{ textDecoration: "line-through", color: "gray", marginRight: "8px" , fontSize: 18}}>
        ₹{product.price.toLocaleString()}
      </span>
      <span style={{ fontWeight: "bold", color: "red", marginRight: "8px" , fontSize: 20}}>
        ₹{(product.price - (product.price * product.discountInPercentage) / 100).toFixed(2)}
      </span>
      <span style={{ fontWeight: "bold", color: "green" , fontSize: 20}}>
        ({product.discountInPercentage}% OFF)
      </span>
    </p>   
          {/* Quantity Selector */}
          {/* <div className="quantity-container">
            <p>Quantity</p>
            <div className="quantity-box">
              <button onClick={() => handleQuantityChange("decrease")}>-</button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantityChange("increase")}>+</button>
            </div>
          </div> */}

          {/* Add to Cart Button */}
           {product.quantitiesAvailable > 0 ? (
        <button className="add-to-cart" 
          onClick={(e) => {
            e.stopPropagation(); // Prevent parent div click event
            handleNavigationToAddToCart(product);
          }}>
          ADD TO CART <span className="cart-icon">🛒</span>
        </button>
      ) : (
        <span style={{ fontWeight: "bold", color: "red" }}>Sold Out</span>
      )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails;