import React, { useState } from "react";
import ClientHeader from "../common/ClientHeader";
import { FaPlus, FaMinus, FaEarlybirds, FaKiwiBird } from "react-icons/fa"; // Import icons from a library like react-icons
import Footer from "../common/Footer";


const FAQPage = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const faqData = [
    {
      question: "How do I create an account on your platform?",
      answer: "To create an account, click on the 'Sign Up' button, provide your details, including your restaurant's name, and follow the registration steps.",
    },
    {
      question: "Is your web application free for restaurants?",
      answer: "Yes, our web application is free for all restaurants for the first month. Enjoy our services without any cost during this period.",
    },
    {
      question: "How can I add my restaurant's menu to the platform?",
      answer: "After signing in, go to your dashboard, select 'Add Tab,' and easily upload your restaurant's menu items, including category and prices.",
    },
   
    {
      question: "How can customers place orders on our restaurant's page?",
      answer: "Customers can view your menu and place orders directly from your restaurant's page. You'll receive the orders in real-time for easy processing.",
    },
    {
      "question": "Is there a mobile app available for restaurant owners?",
      "answer": "No, we currently do not offer a mobile app for restaurant owners. However, we provide other tools and services to help you manage your restaurant and orders efficiently."
    },
    
   
    {
      question: "How can I get in touch with your support team?",
      answer: "Feel free to contact our support team through the 'Contact Us' section on our website, and we'll be happy to assist you with any queries or issues.",
    },
  ];
  

  const handleToggle = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  return (
    <>
     
     
     
     <ClientHeader />
      
      <div className="faq-section " style={{minHeight:"100vh"}}>
        {faqData.map((item, index) => (
          <div key={index} className="faq-item" >
            <div
              className={`faq-question ${index === expandedIndex ? "active" : ""}`}
              onClick={() => handleToggle(index)}
            >
              <span className="question-icon">
                {index === expandedIndex ? <FaMinus /> : <FaPlus />}
              </span>
              <span className="question-text">{item.question}</span>
            </div>
            {index === expandedIndex && (
              <div className="faq-answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
      <Footer/>
    </>
  );
};

export default FAQPage;
