import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderSummary.css";

const OrderSummary = ({ setFinalTotal, setDiscount }) => {
  const [finalProducts, setFinalProducts] = useState([]);
  const [voucherCode, setVoucherCode] = useState("");
  const [finalDiscount, setFinalDiscount] = useState(0);
  const [error, setError] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const shippingAmount = 99;

  useEffect(() => {
    getStoredProductsId();
  }, []);

  const getStoredProductsId = async () => {
    const storedProductId = JSON.parse(localStorage.getItem("productIds")) || [];
    if (storedProductId.length > 0) {
      getProductsByListOfIds(storedProductId);
    }
  };

  const getProductsByListOfIds = async (productIds) => {
    try {
      const response = await axios.get(`https://api.thevastracollections.com/products/getProductsByListOfIds?ids=${productIds.join(",")}`);
      const products = response?.data || [];
      setFinalProducts(products);

      const itemsSubtotal = products.reduce((sum, item) => sum + Number((item.price - (item.price * item.discountInPercentage) / 100).toFixed(2)), 0);
      const finalSubTotal = itemsSubtotal + shippingAmount;

      setSubtotal(itemsSubtotal);
      setFinalTotal(finalSubTotal - finalDiscount); // Update checkout total
      setFinalAmount(finalSubTotal - finalDiscount)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleApplyVoucher = async () => {
    setError(""); // Reset error message
    try {
      const response = await axios.post(
        "https://api.thevastracollections.com/vouchers/validateVoucherCode",
        null,
        { params: { VoucherCode: voucherCode } }
      );

      if (response.status === 200) {
        setError(`Hurray! voucher applied`);
        setFinalDiscount(response.data);
        setFinalTotal(subtotal - response.data); // Update checkout total
        setDiscount(voucherCode);
      }
    } catch (err) {
      setError(err.response?.data || "Invalid voucher code");
    }
  };

  return (
    <div className="order-summary">
      <h2 className="order-title">ORDER SUMMARY</h2>

      {/* Coupon Section */}
      <div className="coupon-section">
        <input
          type="text"
          placeholder="Have coupon code? Apply now!"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
        />
        <button className="apply-btn" onClick={handleApplyVoucher}>Apply</button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {/* Order Items */}
      {finalProducts.length > 0 ? (
        finalProducts.map((product) => (
          <div className="order-items" key={product.id}>
            <div className="order-item">
              <img src={product?.imageUrls?.[0]} className="item-image" alt="Product" />
              <div className="item-details">
                <p className="item-name"><strong>{product?.name}</strong></p>
                <p className="item-price">1 X INR {(product.price - (product.price * product.discountInPercentage) / 100).toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}

      {/* Summary Totals */}
      <div className="summary-totals">
        <p>Subtotal <span>INR {subtotal}</span></p>
        <p className="discount">Voucher <span>- INR {finalDiscount}</span></p>
        <p>Shipping <span>INR {shippingAmount}</span></p>
        <p className="total">Total <span>INR {finalAmount - finalDiscount}</span></p>
      </div>
    </div>
  );
};

export default OrderSummary;
