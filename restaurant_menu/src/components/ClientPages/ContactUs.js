import React, { useState } from "react";
import ClientHeader from "../common/ClientHeader";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "../../redux/contactus/contactusthunk";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Footer from "../common/Footer";
import { showToast } from "../../services/ToastInstance";

function ContactUs() {
  const dispatch=useDispatch();
  const contactusResponse=useSelector((state)=>state.contactus.contactus)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const isValidEmail = (email) => {
    // Basic email format validation using a regular expression
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create an object containing user input data
    
    const data = {
      name,
      email,
      message,
    };
    if (!data.name || !data.email || !data.message) {
      // Check if any of the fields are empty
     
      showToast("Please fill in all the fields.","warn")
      return;
    }
  
    if (!isValidEmail(data.email)) {
      // Check if the email is in a valid format
      
      showToast("Please enter a valid email address.")
      return;
    }
    dispatch(createContact(data))
    // Send the data to the server to handle the email sending (explained in the backend section)

    // Clear the form after submission
    setName("");
    setEmail("");
    setMessage("");
   
  };
  const contactInfoStyles = {
    boxShadow: "5px 5px 15px 0px rgba(0,0,0,0.2)",
    padding: "20px",
    borderRadius: "10px",
  };
  
  const contactFormStyles = {
    boxShadow: "5px 5px 15px 0px rgba(0,0,0,0.2)",
    padding: "20px",
    borderRadius: "10px",
  };
  
  return (
    <>
      <ClientHeader />
      <div className="container" style={{minHeight:"100vh"}}>
  <div className="row" style={{ marginTop: "10%" }}>
    <div className="col-md-6 contact-info" style={contactInfoStyles}>
      <h2 className="mb-4">Contact Information</h2>
      <p>We'd love to hear from you! You can reach us using the contact information below:</p>
      
      <div className="contact-details">
        <h4>Address</h4>
        <p>205/14 Chunnipura</p>
        <p>Rohtak, 124001</p>

        <h4>Email</h4>
        <p>Email: <a href=""><b>contact@falcon-vision.in</b></a></p>

        <h4>Phone</h4>
        <p>Phone: +91 81686-41371</p>
      </div>
    </div>
    <div className="col-md-6 contact-form" style={contactFormStyles}>
      {/* <h2 className="mb-4">Contact Us</h2> */}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="5"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Send Message
        </button>
      </form>
    </div>
  </div>
</div>
<Footer/>

    </>
  );
}

export default ContactUs;
