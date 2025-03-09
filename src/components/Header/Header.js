import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Header.css";
import VastraLogoIcon from "../../assets/Vastra-Logo-Icon";
import CartIcon from "../../assets/Cart-Icon";
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger menu icon

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(2);

    useEffect(() => {
      getStoredProductsId();
    }, []);

  const  getStoredProductsId = async () => {
    const storedProductId = JSON.parse(localStorage.getItem("productIds")) || [];
    if (storedProductId) {
      console.log(`value added in cart page is : ${storedProductId}`)
      setCartItemCount(storedProductId.length);
    }

  }

  return (
    <>
      <div className="header">
        <div className="nav">
          <div className="logo">
            <Link to="/">
              <VastraLogoIcon />
            </Link>
          </div>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <GiHamburgerMenu style={{ color: "black" }}/>
          </button>
          <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/all-products" state={{ searchParameter: ["Sarees"] }}>
                Sarees
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/all-products" state={{ searchParameter: ["Dresses"] }}>
                Dresses
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/all-products" state={{ searchParameter: ["Occasions"] }}>
                Occasions
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/all-products" state={{ searchParameter: ["Collections"] }}>
                Collections
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/all-products" state={{ searchParameter: ["Virtual"] }}>
                Virtual
              </Link>
            </li>
            <li className="nav-item nav-cart">
              <Link to="/Cart">
                <div className="cart-icon-container">
                  <CartIcon />
                  {cartItemCount > 0 && (
                    <span className="cart-count-badge">{cartItemCount}</span>
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <hr className="divider" />
    </>
  );
};

export default Header;
