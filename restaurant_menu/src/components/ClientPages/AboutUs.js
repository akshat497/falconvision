import React from "react";
import ClientHeader from "../common/ClientHeader";
import menLogo from '../../images/2men logo.png'
const aboutUsStyles = {
  container: {
    padding: "20px",
    background: "#f5f5f5",
    marginTop:"3%",
    height:"auto"
  },
  heading: {
    fontSize: "2.5rem",
    color: "#333",
  },
  content: {
    fontSize: "1.2rem",
    color: "#555",
    lineHeight: "1.6",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
};

function AboutUs() {
  return (
    <div>
      <ClientHeader />
      <section style={aboutUsStyles.container} className="about-us">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h2 style={aboutUsStyles.heading} className="display-4 mb-4">
                Our Story 
              </h2>
              <p style={aboutUsStyles.content}>
                Welcome to FalconVision, where excellence meets innovation.
                Founded in 2023, we have been on a remarkable journey to
                redefine the IT industry.
              </p>
              <p style={aboutUsStyles.content}>
                Our relentless commitment to quality and customer
                satisfaction has made us a leader in the field. At FalconVision,
                we specialize in developing user-friendly web applications to
                streamline the order-making process for restaurants. Our flagship
                product is a restaurant web application that simplifies
                the entire ordering experience for both customers and restaurant
                owners.
              </p>
              <p style={aboutUsStyles.content}>
                In addition to our restaurant web application, we also provide
                a range of services for other web applications. Our mission is to
                deliver top-notch web applications at prices that make technology
                accessible to everyone. We strive to achieve this mission every day.
                We are more than just a company; we are a community of like-minded
                individuals passionate about the technology industry.
              </p>
            </div>
            <div className="col-lg-6">
              <img
                src={menLogo}
                alt="About Us"
                style={aboutUsStyles.image}
              />
            </div>
          </div>
        </div>
      </section>
    
    </div>
  );
}



export default AboutUs;
