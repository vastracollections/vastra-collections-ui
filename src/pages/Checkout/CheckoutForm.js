import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import "./CheckoutForm.css";
import OrderSummary from "./OrderSummary";
import PaymentOptions from "./PaymentOptions";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footers from "../../components/Footer/Footer";


const CheckoutForm = () => {
  const location = useLocation();
  const { state } = location;
  const products = state?.products || null;
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [productsId, setProductsId] = useState(0);
  const [order, setOrder] = useState(0);
  const navigate = useNavigate();

  const countryStateData = {
      "India": ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
      "United States": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"],
      "Canada": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"],
      "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania", "Australian Capital Territory", "Northern Territory"],
      "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"]
    };

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "",
    state: "",
    pincode: "",
    address: "",
  });


    useEffect(() => {
      getStoredProductsId();
    }, []);



  const getStoredProductsId = async () => {
    const storedProductId = JSON.parse(localStorage.getItem("productIds")) || [];
    if (storedProductId.length > 0) {
      setProductsId(storedProductId);
    }
  };


  

  const  getTtoalFinalAmount = async () => {
    const totalAmount = JSON.parse(localStorage.getItem("totalAmount")) || [];
    if (totalAmount) {
      console.log(`total amount checkout page is : ${totalAmount}`)
      // getProductsByListOfIds(storedProductId);
    }
  }

  const createOrder = async (paymentMethod) => {
    try {
      console.log(productsId);
      if (productsId.length > 0) {
        const items = productsId.map((id) => ({
          productId: id
        }));
    
        const postData = {
          customerName: formData.email,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: formData.address,
          country: formData.country,
          state: formData.state,
          city: formData.state,
          pinCode: formData.pincode,
          voucherUsed: discount,
          items: items, // Dynamically assigned items array
          totalAmount: finalTotal,
          paymentMethod: (paymentMethod === "COD" ? "COD" : "ONLINE" )
        };
    
        console.log(postData); // Verify the output before sending
     
  
        const response = await axios.post(`https://api.thevastracollections.com/orders/createOrder`, postData);
        
        setOrder(response?.data || []);
      }
  
    } catch (error) {
      console.error("Error creating order:", error);
      throw error; // Re-throw the error for further handling
    }
  };
  
  

  const razorpay = () => {
    var options = {
      "key": "rzp_test_MWzadOJZ0Yt4u1",
      "amount": (finalTotal * 100),
      "currency": "INR",
      "name": "Vastra Collections",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": order.razorpayOrderId, 
      "handler": function (response){
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature)
      },
      "prefill": { 
          "name": "Gaurav Kumar", 
          "email": "gaurav.kumar@example.com", 
          "contact": "9000090000" 
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
  rzp1.on('payment.failed', function (response){
          // alert(response.error.code);
          // alert(response.error.description);
          // alert(response.error.source);
          // alert(response.error.step);
          alert(response.error.reason);
          // alert(response.error.metadata.order_id);
          // alert(response.error.metadata.payment_id);
           navigate("/place-order", { state: { status: "false" } });
  });

  rzp1.open();
  // e.preventDefault();
  }

  const [errors, setErrors] = useState({});
  const [finalTotal, setFinalTotal] = useState(0);


  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    else if (!/^[A-Za-z ]+$/.test(formData.name)) tempErrors.name = "Name should contain only letters.";
    
    if (!formData.phone) tempErrors.phone = "Phone number is required.";
    else if (!/^[0-9]{10}$/.test(formData.phone)) tempErrors.phone = "Phone number must be 10 digits.";

    if (!formData.email) tempErrors.email = "Email is required.";
    else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email))
      tempErrors.email = "Enter a valid email.";

    if (!formData.country) tempErrors.country = "Country is required.";
    if (!formData.state) tempErrors.state = "State is required.";
    if (!formData.pincode) tempErrors.pincode = "Pincode is required.";
    else if (!/^[0-9]{6}$/.test(formData.pincode)) tempErrors.pincode = "Pincode must be 6 digits.";

    if (!formData.address) tempErrors.address = "Address is required.";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log(`total amout after vouvjer is ${finalTotal}`)
    if (validateForm()) {
      if (paymentMethod === "COD") {
       await createOrder(paymentMethod);
         navigate("/place-order", { state: { status: "true" } })
      } else {      
        await createOrder();
        await razorpay();
        navigate("/place-order", { state: { status: "true" } })
      }
    }
  };

  return (
    <>
      <Header />
      <div className="checkout-container">
        {/* Order Summary Section - Moved to the top in the DOM */}
        <div className="checkout-right">
          <OrderSummary
            setFinalTotal={(total) => setFinalTotal(total)}
            setDiscount={(discount) => setDiscount(discount)}
          />
        </div>
  
        {/* Checkout Form Section */}
        <div className="checkout-left">
          <h1 className="checkout-title">CHECKOUT FORM</h1>
          <PaymentOptions
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
          />
  
          <div className="contact-section">
            <h2 className="contact-title">CONTACT PERSON</h2>
            <label>NAME</label>
            <input
              type="text"
              className="input-field"
              placeholder="Eg: John Doe"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            {errors.name && <p className="error-message">{errors.name}</p>}
  
            <label>PHONE NUMBER</label>
            <input
              type="tel"
              className="input-field"
              placeholder="9999-99-9999"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            {errors.phone && <p className="error-message">{errors.phone}</p>}
  
            <label>EMAIL</label>
            <input
              type="email"
              className="input-field"
              placeholder="Eg: example@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>
  
          <div className="address-section">
            <h2>ADDRESS DETAIL</h2>
            <label>ADDRESS</label>
            <textarea
              className="input-field address-field"
              placeholder="Eg: 1746, 1st Main Rd, North Vijay Nagar, Govindaraja"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            ></textarea>
            {errors.address && <p className="error-message">{errors.address}</p>}
  
            <div className="row-fields">
              <div>
                <label>COUNTRY</label>
                <select
                  className="input-field"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value, state: "" })
                  }
                >
                  <option value="">Select Country</option>
                  {Object.keys(countryStateData).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="error-message">{errors.country}</p>}
              </div>
              <div>
                <label>STATE/PROVINCE</label>
                <select
                  className="input-field"
                  value={formData.state}
                  onChange={(e) =>
                    setFormData({ ...formData, state: e.target.value })
                  }
                  disabled={!formData.country}
                >
                  <option value="">Select State</option>
                  {formData.country &&
                    countryStateData[formData.country].map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                </select>
                {errors.state && <p className="error-message">{errors.state}</p>}
              </div>
              <div>
                <label>PINCODE</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="PIN Code"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData({ ...formData, pincode: e.target.value })
                  }
                />
                {errors.pincode && <p className="error-message">{errors.pincode}</p>}
              </div>
            </div>
  
            {/* Submit Button */}
            <button className="submit-button" onClick={() => handleSubmit()}>
              {paymentMethod === "COD" ? "Place Order" : "Continue to Payment"}
            </button>
          </div>
        </div>
      </div>
      <Footers />
    </>

  );
};

export default CheckoutForm;
