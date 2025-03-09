import React from "react";
import VastraLogofooter from "../../assets/Vastra-Logo-footer";
/*import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";*/
import "./Footer.css";

const Footers = () => {
  return (
    <>
      <hr style={{ backgroundColor: '#E9AB26', height: '1px', width: '90%', border: '1px' }} />
      <div className="footer">
        <div className="brand-section">
          <VastraLogofooter />
        </div>

        <div className="links-section">
          <h4>Quick Link</h4>
          <ul>
            <li>Sarees</li>
            <li>Limited Collection</li>
            <li>Party Wear</li>
            <li>Virtual</li>
          </ul>
        </div>

        <div className="policies-section">
          <h4>Policies</h4>
          <ul>
            <li>Terms & Conditions</li>
            <li>Shipping</li>
            <li>Return</li>
            <li>Payment Policy</li>
          </ul>
        </div>

        <div className="locate-section">
          <h4>Locate Us</h4>
          {/* <iframe
  width="600"
  height="450"
  style={{ border: 0 }} // Correct: style prop is an object
  loading="lazy"
  allowFullScreen
  src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJnZgGyVQ9rjsRmsS27_w5H34&key=..."
></iframe>    */}
</div>
        {/* follow up Section */}
       {/*<div className="follow-page">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <FaInstagram />
            <FaFacebook />
            <FaWhatsapp />
          </div>
        </div>*/}
      </div>
      <hr style={{ backgroundColor: 'black', height: '1px', width: '90%', border: '1px' }} />
      <div className="footer-bottom">
    <p className="line">We Ship Across the World</p>
    <p className="copyright">© 2025 Vastra Collections. All Rights Reserved.<br/>Powered by Pentomino Solutions</p>
  </div>
      
      
    </>
  );
};

export default Footers;
