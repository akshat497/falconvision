import React from "react";
import ClientHeader from "../common/ClientHeader";
import aboutUsLogo from '../../images/aboutus_image-removebg-preview.png'
import Footer from "../common/Footer";


function AboutUs() {
  return (
    <>
      <ClientHeader />
   

      <section className="about-us" style={{minHeight:"100vh"}}>
      <div className="" style={{ width: "95%", paddingLeft: "10%" }}>
        <div className="row">
          <div className="col-lg-6">
            <h2 className="about-us-heading">
              Elevate Your Dining Experience with Smart_Dine
            </h2>

            <p className="about-us-content">
              Welcome to the forefront of restaurant management technology. At Smart_Dine, crafted by Falcon Vision, we are dedicated to revolutionizing the dining experience for both restaurateurs and patrons through innovative solutions.
            </p>

            <div className="about-us-feature">
              <h3 className="about-us-sub-heading">Transformative Technology 🚀</h3>
              <p className="about-us-feature-content">
                Smart_Dine is a state-of-the-art web application meticulously crafted for restaurant owners seeking efficiency, control, and a seamless dining experience for their customers.
              </p>
            </div>

            <div className="about-us-feature">
              <h3 className="about-us-sub-heading">Complimentary One-Month Trial 💼</h3>
              <p className="about-us-feature-content">
                In our unwavering commitment to excellence, Smart_Dine extends an exclusive one-month trial, providing restaurants an opportunity to experience the full suite of features without any initial financial commitment.
              </p>
            </div>

            {/* Add more feature sections as needed */}

            <p className="about-us-content">
              Join the Smart_Dine revolution and witness firsthand how Falcon Vision is reshaping the future of dining experiences. Sign up today for your complimentary trial and embark on a journey toward unparalleled restaurant management!
            </p>
          </div>

          <div className="col-lg-6">
            <img src={aboutUsLogo} alt="About Smart_Dine" className="about-us-image img-fluid" />
          </div>
        </div>
      </div>
    </section>

    <Footer/>
    </>
  );
}



export default AboutUs;
