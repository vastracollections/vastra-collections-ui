import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllProduct from "./pages/AllProduct/AllProduct";
import HomePage from "./pages/HomePage/HomePage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import CartPage from "./pages/CartPage/CartPage";
import "./App.css";
import PaymentSuccess from "./pages/Payment/PaymentSuccess";
import CheckoutForm from "./pages/Checkout/CheckoutForm";
import PlaceOrder from "./pages/Checkout/PlaceOrder";
//import PaymentOptions from "./pages/Checkout/PaymentOptions";
import ConfirmPage from "./pages/Checkout/ConfirmPage";


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/all-products" element={<AllProduct />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/Cart" element={<CartPage />} />
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
        <Route  path="/place-order" element={<PlaceOrder />} />
        <Route path="/ConfirmPayment" element={<ConfirmPage/>} />      
       <Route path="/checkout" element={<CheckoutForm />} />
      </Routes>
    </Router>
  );
}



export default App;



