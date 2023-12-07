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
      answer: "Yes, our web application is free for all restaurants for the first 6 months. Enjoy our services without any cost during this period.",
    },
    {
      question: "How can I add my restaurant's menu to the platform?",
      answer: "After signing in, go to your dashboard, select 'Menu Management,' and easily upload your restaurant's menu items, including descriptions and prices.",
    },
    {
      question: "Can I customize the appearance of my restaurant's page?",
      answer: "Absolutely! You have full control over your restaurant's page. Add images, customize the layout, and create a unique online presence.",
    },
    {
      question: "How can customers place orders on our restaurant's page?",
      answer: "Customers can view your menu and place orders directly from your restaurant's page. You'll receive the orders in real-time for easy processing.",
    },
    {
      question: "What payment methods are supported on your platform?",
      answer: "We support various payment methods, including credit/debit cards and digital wallets, ensuring a smooth payment experience for your customers.",
    },
    {
      question: "How do I manage customer reviews and ratings?",
      answer: "You can view, respond to, and manage customer reviews and ratings from your dashboard to maintain a positive online reputation.",
    },
    {
      question: "Is there a mobile app available for restaurant owners?",
      answer: "Yes, we offer a mobile app that allows you to manage your restaurant and orders on-the-go, ensuring convenience and flexibility.",
    },
    {
      question: "What marketing tools are available to promote my restaurant?",
      answer: "Explore our marketing tools, including promotional offers, email marketing, and social media integration, to boost your restaurant's visibility.",
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
      
      <div className="faq-section my-5" style={{height:"100vh"}}>
        {faqData.map((item, index) => (
          <div key={index} className="faq-item">
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
