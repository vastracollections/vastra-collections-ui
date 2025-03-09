import React from "react";
import "./PaymentSuccess.css";
import Header from "../../components/Header/Header";

const PaymentSuccess = () => {
  return (
    <div>
      <Header />
      <div className="payment-success-container">
      <div className="success-icon">✔</div>
      <h1>PAYMENT SUCCESS!</h1>
      <p>
        Lean back and relax, knowing our team is hard at work preparing and shipping your package swiftly. 
        Feel free to browse our diverse product selection during this time – 
        <br/> you might discover another item you'd like to add to your collection!
      </p>
      <button className="back-home">BACK TO HOME</button>
    </div>
    </div>
    );
};
export default PaymentSuccess;
