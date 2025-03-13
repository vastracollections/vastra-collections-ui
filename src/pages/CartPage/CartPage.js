import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Cartpage.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import { Link } from "react-router-dom";


const CartPage = () => {
  const location = useLocation();
  const [cartProductsList, setCartProductsList] = useState([]);
  const [subtotal, setSubtotal] = useState([]);
  const [totalWithoutGST, setTotalWithoutGST] = useState([]);
  const [gstAmount, setGstAmount] = useState([]);

  useEffect(() => {
    getStoredProductsId();
  }, []);

  const  getStoredProductsId = async () => {
    const storedProductId = JSON.parse(localStorage.getItem("productIds")) || [];
    if (storedProductId) {
      console.log(`value added in cart page is : ${storedProductId}`)
      if (storedProductId.length > 0) {
      getProductsByListOfIds(storedProductId);
        
      }
    }

  }

  const gstPercentage = 12;


  const getProductsByListOfIds = async (productIds) => {
      try {
          // Ensure productIds is properly formatted for the API request
          const queryString = productIds.map(id => `ids=${id}`).join("&");
          
          const response = await axios.get(`https://api.thevastracollections.com/products/getProductsByListOfIds?${queryString}`);
          const products = response?.data || [];
          
          setCartProductsList(products);
  
          // Calculate subtotal using the fetched products
          const itemsSubtotal = products.reduce(
              (sum, item) => sum + Number(item.price), 
              0
          );
  
          setSubtotal(itemsSubtotal);

  
          // Corrected GST calculation (limited to 2 decimal places)
          const totalWithoutGST = parseFloat((itemsSubtotal / (1 + gstPercentage / 100)).toFixed(2));
          setTotalWithoutGST(totalWithoutGST);

          const gstAmount = (itemsSubtotal - totalWithoutGST).toFixed(2)
          setGstAmount(gstAmount);
  
      } catch (error) {
          console.error("Error fetching products:", error);
          throw error; // Re-throw for further handling
      }
  };
  
  


  // const handleQuantityChange = (id, newQuantity) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, quantity: Math.max(newQuantity, 1) } : item
  //     )
  //   );
  // };


  const removeProductId = (productId) => {
    let productIds = JSON.parse(localStorage.getItem("productIds")) || [];

    // Filter out the product ID to remove
    productIds = productIds.filter(id => id !== productId);

    // Save updated list back to localStorage
    localStorage.setItem("productIds", JSON.stringify(productIds));

    getStoredProductsId();
};



  return (
    <>
      <Header />
      <h1 className="cart-title">CART</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartProductsList.length > 0 ? (
            cartProductsList.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.imageUrls?.[0]} alt={item.name} className="item-image" />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="product-price">{item.price}</p>
                  {/* <div className="quantity-control">
                    <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
                  </div> */}
                  <button className="delete-btn" onClick={() => removeProductId(item.id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className="empty-cart-message">Your cart is empty.</p>
          )}
        </div>
        <div className="shopping-info">
          <h2>SHOPPING INFO</h2>
          <p>Items cost: <strong>₹{totalWithoutGST}</strong></p>
          <p>GTS(12%): <strong>₹{gstAmount}</strong></p>
          <p>Subtotal: <strong>₹{subtotal}</strong></p>
          <Link to="/checkout" state={{ products: [cartProductsList] }}>
          <button className="checkout-btn">PROCEED TO CHECKOUT</button>
          </Link> 
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default CartPage;
