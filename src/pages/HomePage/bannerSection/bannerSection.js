import React, { useState, useEffect } from "react";
import Circle from "../../../assets/Circle";
import Search from "../../../assets/Search";
import Curve from "../../../assets/Curve/Curve";
import "./bannerSection.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

const BannerSection = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [bannerImageUrl, setBannerImageUrl] = useState([]);

  const handleNavigation = (category) => {
    navigate("/all-products", { state: { searchParameter: [category] } });
  };

  const getBannerImageUrl = async () => {
    try {
      const response = await axios.get(`https://api.thevastracollections.com/getSiteInfo`);
      if (response.data?.length > 0) {
        setBannerImageUrl(response.data[0].bannerImageUrl);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  useEffect(() => {
    getBannerImageUrl();
  }, []);

  return (
    <div className="banner-wrapper">
      <div className="fashion-page-container">
  <div className="text-section">
    <div className="circle-background">
      <Circle />
    </div>
    <h1>
      Find Your Perfect <br />
      <span className="highlight">Blend</span> of Our <br />
      <span className="highlight">Traditional</span> and <br />
      Modern <span className="highlight">Fashion</span>
    </h1>
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="What are you looking for?" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button className="search-button" onClick={() => handleNavigation(query)}>
        <i className="search-icon">
          <Search />
        </i>
      </button>
    </div>
    <div className="categoriess">
      <button onClick={() => handleNavigation("Banarasi Silk Sarees")}>
        Banarasi Silk Sarees
      </button>
      <button onClick={() => handleNavigation("Soft Silk Sarees")}>
        Soft Silk Sarees
      </button>
      <button onClick={() => handleNavigation("Mysore Silk Sarees")}>
        Mysore Silk Sarees
      </button>
      <button onClick={() => handleNavigation("Kanjeevaram Silk Sarees")}>
        Kanjeevaram Silk Sarees
      </button>
      <button onClick={() => handleNavigation("Patola Silk Sarees")}>
        Patola Silk Sarees
      </button>
      <button onClick={() => handleNavigation("Printed Silk Sarees")}>
        Printed Silk Sarees
      </button>
    </div>
  </div>
  <div className="image-section">
    <img src={bannerImageUrl} alt="Fashion showcase" />
  </div>
</div>
      <div className="curve-container">
        <Curve />
      </div>
    </div>
  );
};

export default BannerSection;