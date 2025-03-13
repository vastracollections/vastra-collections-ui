import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./PlaceOrder.css"; // Import the CSS file
import {  useLocation } from "react-router-dom";


const PlaceOrder = () => {
  const location = useLocation();
  const { state } = location;
  const status = state?.status || null;

  return (
    <>
      <Header />
      <div className="place-order-container">
        {(status ==="true" ) ? 
        <h2>Order Placed Successfully!</h2>
        :
        <h2>Payment failed please try again</h2>

}
      </div>
      <Footer />
    </>
  );
};

export default PlaceOrder;