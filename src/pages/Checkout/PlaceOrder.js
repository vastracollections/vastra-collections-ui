import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./PlaceOrder.css"; // Import the CSS file

const PlaceOrder = () => {
  return (
    <>
      <Header />
      <div className="place-order-container">
        <h2>Order Placed Successfully!</h2>
      </div>
      <Footer />
    </>
  );
};

export default PlaceOrder;