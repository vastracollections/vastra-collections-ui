import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./Header.css";
import VastraLogoIcon from "../../assets/Vastra-Logo-Icon";
import CartIcon from "../../assets/Cart-Icon";
import { GiHamburgerMenu } from "react-icons/gi"; // Hamburger menu icon

const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(2);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    getStoredProductsId();
    fetchCategories();
  }, []);

  const getStoredProductsId = async () => {
    const storedProductId = JSON.parse(localStorage.getItem("productIds")) || [];
    setCartItemCount(storedProductId.length);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://api.thevastracollections.com/type/getHeaderContent");

      if (response.data && typeof response.data === "object") {
        const formattedCategories = Object.entries(response.data).reduce((acc, [categoryType, items]) => {
          acc[categoryType] = items.map((item) => item.name);
          return acc;
        }, {});

        setCategories(formattedCategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const isActiveMenu = (category, subCategories) => {
    // Check if the main category or any of its subcategories are active
    return (
      location.pathname.includes("all-products") &&
      (location.state?.searchParameter?.includes(category) ||
        subCategories.some((subCategory) => location.state?.searchParameter?.includes(subCategory)))
    );
  };

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
            <GiHamburgerMenu style={{ color: "black" }} />
          </button>
          <ul className={`nav-list ${menuOpen ? "open" : ""}`}>
            <li className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>
              <Link to="/">Home</Link>
            </li>

            {Object.entries(categories).map(([type, subCategories]) => (
              <li
                key={type}
                className={`nav-item dropdown ${isActiveMenu(type, subCategories) ? "active" : ""}`}
              >
                <Link to="/all-products" state={{ searchParameter: [type] }}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Link>
                <ul className="submenu">
                  {subCategories.map((subCategory) => (
                    <li key={subCategory} className={location.state?.searchParameter?.includes(subCategory) ? "active" : ""}>
                      <Link to="/all-products" state={{ searchParameter: [subCategory] }}>
                        {subCategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

            <li className="nav-item nav-cart">
              <Link to="/Cart">
                <div className="cart-icon-container">
                  <CartIcon />
                  {cartItemCount > 0 && <span className="cart-count-badge">{cartItemCount}</span>}
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
