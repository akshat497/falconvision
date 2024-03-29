import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaEarlybirds } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="site-footer ">
      <div className="container">
        <div className="footer-top">
          <div className="footer-logo text-light">
            <FaEarlybirds size={52}/>
          </div>
          <div className="footer-nav d-flex">
          
          </div>
          <div className="footer-social">
            <a href="#" style={{color:"#1877F2"}}><FaFacebook /></a>
            <a href="#" style={{color:"#1DA1F2"}}><FaTwitter /></a>
            <a href="https://www.instagram.com/falcon.vision.in/" style={{color:" #E4405f"}}><FaInstagram /></a>
            <a href="#" style={{color:"#0A66C2"}}><FaLinkedin /></a>
          </div>
        </div>
        <div className="footer-contact">
          <p><FaEnvelope /> Email: <b>support@falcon-vision.online</b></p>
          <p>Phone: +91 81686-41371</p>
          <p>Address: 205/14 Chunnipura, Rohtak, India</p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Falcon-Vision. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
