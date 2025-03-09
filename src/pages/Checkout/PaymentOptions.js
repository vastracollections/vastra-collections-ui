import React from "react";
//import { useNavigate } from "react-router-dom"; 
import "./PaymentOptions.css";

const PaymentOptions = ({ paymentMethod, setPaymentMethod }) => {
  // const navigate = useNavigate(); 

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="payment-options">
      <h2>PAYMENT OPTIONS</h2>

      <label className="payment-option">
        <input
          type="radio"
          name="payment"
          value="COD"
          checked={paymentMethod === "COD"}
          onChange={() => handlePaymentChange("COD")}
        />
        Cash On Delivery
      </label>

      <label className="payment-option">
        <input
          type="radio"
          name="payment"
          value="Online"
          checked={paymentMethod === "Online"}
          onChange={() => handlePaymentChange("Online")}
        />
        Online Payment
      </label>
    </div>
  );
};

export default PaymentOptions;
