import React from "react";
import VastraLogofooter from "../../assets/Vastra-Logo-footer";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

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
          <h4>Quick Links</h4>
          <ul>
           <Link to="/all-products" state={{ searchParameter:"Sarees" }}>
            <li>Sarees</li>
            </Link>
           <Link to="/all-products" state={{ searchParameter:"Dresses" }}>
            <li>Dresses</li>
            </Link>
           <Link to="/all-products" state={{ searchParameter:"Kanjivaram" }}>
            <li>Kanjivaram</li>
            </Link>
           <Link to="/all-products" state={{ searchParameter:"Festival" }}>
            <li>Festival</li>
            </Link>
          </ul>
        </div>

        <div className="policies-section">
          <h4>Policies</h4>
          <ul>
            <li><a href="/assets/policy-documents/Terms_and_Conditions.pdf" download="Terms_and_Conditions.pdf">Terms & Conditions</a></li>
            <li><a href="/assets/policy-documents/Shipping_Policy.pdf" download="Shipping_Policy.pdf">Shipping</a></li>
            <li><a href="/assets/policy-documents/Return_Policy.pdf" download="Return_Policy.pdf">Return</a></li>
            <li><a href="/assets/policy-documents/Privacy_policy.pdf" download="Privacy_policy.pdf">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="locate-section">
          <h4>Locate Us</h4>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9334549833143!2d77.52991087410315!3d12.976108014781373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d54c906989d%3A0x7e1f39fcefb6c49a!2sVastra%20Collections!5e0!3m2!1sen!2sin!4v1741887302754!5m2!1sen!2sin" 
            width="300"
            height="200" 
             style={{ border: 0 }} allowfullscreen="" 
             loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>

        <div className="follow-page">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://www.instagram.com/vastracollections_bangalore/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://wa.me/6360354017" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      <hr style={{ backgroundColor: 'black', height: '1px', width: '90%', border: '1px' }} />

      <div className="footer-bottom">
        <p className="line">We Ship Across the World</p>
        <p className="copyright">
          © 2025 Vastra Collections. All Rights Reserved.<br/>
          Powered by <a href="https://pentomino.in" target="_blank" rel="noopener noreferrer">Pentomino Solutions</a>
        </p>
      </div>
    </>
  );
};

export default Footers;
