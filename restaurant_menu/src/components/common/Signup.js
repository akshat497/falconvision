import React, { useEffect, useState } from "react";
import Header from "./Header";
import { RegisterUser } from "../../services/Services";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signupUser, verifyOtp } from "../../redux/auth/authThunks";
import {
  FaArrowLeft,
  FaArrowRight,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ClientHeader from "./ClientHeader";
import Footer from "./Footer";
function Signup() {
  const sendingOtp = useSelector((state) => state.otpsend.otploading);
  let OtpResponse = useSelector((state) => state.otpsend.otp);
  const OtpVerifyResponse = useSelector((state) => state.otpverify.v_otp);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    phoneNumber: "",
    area: "",
    address: "",
    pincode: "",
    role: "fenchise",
    password: "",
    confirmPassword: "",
    referCode:""
  });
  const [otpSendAttempts, setOtpSendAttempts] = useState(0);
  const [showResendButton, setShowResendButton] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(59);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [displayReferCode, setdisplayReferCode] = useState(false);
  const [referCode, setReferCode] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);
  const response = useSelector((state) => state.auth.user);
  const Registeruser = async () => {
    // Check if any field is empty

    if (
      !formData.email ||
      !formData.restaurantName ||
      !formData.phoneNumber ||
      !formData.area ||
      !formData.street ||
      !formData.pincode ||
      !formData.role ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.warn("Field missing!");
      return;
    }

    // Check if the password meets the complexity requirements
    // const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!passwordRegex.test(formData.password)) {
    //   toast.warn("Password should contain at least one uppercase letter, one numeric digit, and one special character.");
    //   return;
    // }

    // Check if password and confirm password match
    if (formData.password !== formData.confirmPassword) {
      toast.warn("Password and confirm password do not match.");
      return;
    }
    const body = {
      email: formData.email,
      name: formData.restaurantName,
      phone: formData.phoneNumber,
      address: formData.area,
      area: formData.street,
      zip: formData.pincode,
      role: formData.role,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      enteredOTP: formData.otp,
      referCode:referCode
    };
    dispatch(signupUser(body));
    // dispatch(verifyOtp(formData))
    // All validation checks passed, you can now proceed with registration
  };
  // useEffect(()=>{
  //   if(OtpVerifyResponse?.message==="OTP is valid"){
  //   const body = {
  //     email: formData.email,
  //     name: formData.restaurantName,
  //     phone: formData.phoneNumber,
  //     address: formData.area,
  //     area: formData.street,
  //     zip: formData.pincode,
  //     role: formData.role,
  //     password: formData.password,
  //     confirmPassword: formData.confirmPassword,

  //   };
  //   dispatch(signupUser(body));
  // }
  // },[OtpVerifyResponse])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    const passwordScore = calculatePasswordStrength(formData.password);
    setPasswordStrength(passwordScore);
  }, [formData]);
  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };
  const calculatePasswordStrength = (password) => {
    // Define your criteria here
    const lengthScore = password.length >= 8 ? 2 : 0;
    const uppercaseScore = /[A-Z]/.test(password) ? 2 : 0;
    const lowercaseScore = /[a-z]/.test(password) ? 2 : 0;
    const digitScore = /[0-9]/.test(password) ? 2 : 0;
    const specialCharScore = /[@$!%*?&]/.test(password) ? 2 : 0;

    const totalScore =
      lengthScore +
      uppercaseScore +
      lowercaseScore +
      digitScore +
      specialCharScore;

    // Normalize the score to a percentage
    const maxScore = 10; // Adjust this as needed
    return (totalScore / maxScore) * 100;
  };
  useEffect(() => {
    if (response !== null && response !== undefined) {
      navigate("/admin/");
      window.location.reload();
    }
  }, [response]);

  const SendOtp = () => {
    if (formData.phoneNumber.length < 10) {
      return toast.error("Invalid phone number", {
        autoClose: false,
        closeOnClick: true,
        closeButton: false,
      });
    }
    const obj = {
      email: formData.email,
      phoneNumber: Number(formData.phoneNumber),
    };
    dispatch(sendOtp(obj));
    setOtpSendAttempts(otpSendAttempts + 1);
  };
  useEffect(() => {
    if (otpSendAttempts >= 1) {
      setShowResendButton(false);
      const timer = setInterval(() => {
        if (secondsRemaining > 0) {
          setSecondsRemaining(secondsRemaining - 1);
        } else {
          clearInterval(timer); // Clear the timer when the countdown reaches 0
          setShowResendButton(true);
        }
      }, 1000); // Update the timer every 1000 milliseconds (1 second)

      return () => clearInterval(timer);
    }
  }, [otpSendAttempts, secondsRemaining]);
  return (
    <>
      <ClientHeader />
      <div
        className="container d-flex flex-column justify-content-center align-items-center vh-100"
        style={{ minHeight: "100vh" }}
      >
        <section
          className="card mb-3"
          style={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            width: "70%",
            height: "62vh",
            display: "flex",
          }}
        >
          {/* Form section */}
          <div className="row g-0 d-flex align-items-center">
            <div className="col-lg-4 d-none d-lg-flex">
              <img
                src="https://img.freepik.com/free-vector/waiter-wearing-face-mask-serving_23-2148592573.jpg?w=740&t=st=1696666536~exp=1696667136~hmac=7179715719289404e6081cfcb7b8765d7ad8ac7729088381ae7f1d1c29ce8730"
                alt="Trendy Pants and Shoes"
                className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                height="390vh"
              />
            </div>
            <div className="col-lg-8" style={{ marginTop: "" }}>
              <div className="card-body ">
                {/* Render different form sections based on the current step */}
                {step === 0 && (
                  <div className="col-lg-12">
                    <form onSubmit={handleSubmit}>
                      {/* Restaurant Name input */}
                      <div className="form-outline my-4">
                        {/* <label className="form-label" htmlFor="restaurantName">
                        Restaurant Name
                      </label> */}
                        <input
                          type="text"
                          id="restaurantName"
                          className="form-control"
                          name="restaurantName"
                          value={formData.restaurantName}
                          onChange={handleChange}
                          placeholder="  Restaurant Name"
                        />
                      </div>
                      {/* Email input */}
                      <div className="form-outline my-4">
                        <input
                          type="email"
                          id="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder=" Email address"
                        />
                        {/* <label className="form-label" htmlFor="email">
                        Email address
                      </label> */}
                      </div>
                      {/* Phone Number input */}
                      <div className="form-outline my-4">
                        <input
                          type="tel"
                          id="phoneNumber"
                          className="form-control"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="Phone Number"
                        />
                        {/* <label className="form-label" htmlFor="phoneNumber">
                        Phone Number
                      </label> */}
                      </div>
                      <div className="form-outline my-4">
                        <input
                          type="text"
                          id="area"
                          className="form-control"
                          name="area"
                          value={formData.area}
                          onChange={handleChange}
                          placeholder="Area"
                        />
                        {/* <label className="form-label" htmlFor="area">
                        Area
                      </label> */}
                      </div>
                      {/* Street input */}
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="street"
                          className="form-control"
                          name="street"
                          value={formData.street}
                          onChange={handleChange}
                          placeholder="Street"
                        />
                       
                        {/* <label className="form-label" htmlFor="street">
                        Street
                      </label> */}
                      </div>
                    </form>
                  </div>
                )}

                {step === 1 && (
                  <div className="col-lg-12">
                    <form onSubmit={handleSubmit}>
                      
                        
                        <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="pincode"
                          className="form-control mb-4"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="Pincode"
                        />
                        
                            
                          
                          {/* Password strength indicator */}
                          <div className="password-strength-indicator"
                          style={{marginTop:"-4%"}}
                          
                          >
                               {/* <progress
                              max="100"
                              value={passwordStrength}
                              style={{
                                width: "100%",
                                height: "4px",
                                border: "none",
                                borderRadius: "5px",
                                backgroundColor: "#ddd",
                                
                                
                              }}
                            /> */}
                          
                            <div classname="form-outline">
                        <input
                            type="password"
                            id="password"
                            className="form-control "
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="password"
                          />
                        
                            <span>
                              {formData?.password?.length>0&&<div>
                                {
                                  passwordStrength === 0
                                ? <small style={{color:"red"}}><b>Weak</b></small>
                                : passwordStrength < 50
                                ? <small style={{color:"red"}}><b>Weak</b></small>
                                : passwordStrength < 70
                                ? <small style={{color:"gray"}}><b>Moderate</b></small>
                                : passwordStrength < 90
                                ? <small style={{color:"green"}}><b>Strong</b></small>
                                : <small style={{color:"darkgreen"}}><b>Very Strong</b></small>
                                }
                              </div>}
                            </span>
                          </div>
                        </div>
                        {/* Confirm Password input */}
                       
                        <div className="form-outline ">
                          <input
                            type="password"
                            id="confirmPassword"
                            className="form-control"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="confirmPassword"
                          />
                          {!displayReferCode&&( <small onClick={()=>{setdisplayReferCode(true)}} style={{cursor:"pointer"}}>Have a referal code?</small>
                         )}
                           {/* <label className="form-label" htmlFor="confirmPassword">
                        Confirm Password
                      </label> */}
                        </div>
                        {/* <label className="form-label" htmlFor="pincode">
                        Pincode
                      </label> */}
                      </div>
                     {displayReferCode&&(
                      <div className="form-outline ">
                          <input
                            type="text"
                            id="referCode"
                            className="form-control"
                            name="referCode"
                            value={formData.referCode}
                            onChange={handleChange}
                            placeholder="Enter refercode"
                          />
                          </div>
                     )}
                      <div className="col-lg-12">
                        <form onSubmit={handleSubmit}>
                          {/* Password input */}

                          {/* { (error)}   */}
                        </form>
                      </div>
                      {/* <div className="d-flex justify-content-between">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handlePrevious}
                      >
                        Previous
                      </button>
                      <button
                        type="button"
                        className="btn "
                        onClick={handleNext}
                        style={{
                          backgroundColor: "#CBC3E3",
                          color: "white",
                          transition: "background-color 0.3s",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#DA70D6";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor = "#CBC3E3";
                        }}
                      >
                        Next
                      </button>
                    </div> */}
                      <div
                        className={
                          OtpResponse !== null
                            ? "form-group "
                            : "form-group d-none"
                        }
                      >
                        <div className="d-flex ">
                          <input
                            type="text"
                            id="otp"
                            name="otp"
                            value={formData.otp}
                            onChange={handleChange}
                            placeholder="enter otp"
                            required
                          />
                         
                          {showResendButton ? (
                            <div>
                              <button
                                type="button"
                                className="btn btn-secondary mt-2 mx-2"
                                onClick={() => {
                                  // Handle OTP resend logic here
                                  SendOtp();
                                  setSecondsRemaining(59); // Reset the timer when the "Resend" button is clicked
                                }}
                              >
                                Resend
                              </button>
                            </div>
                          ) : (
                            <div>
                              <button
                                className="btn btn-secondary mt-2 mx-2"
                                disabled
                              >
                                {`00:${
                                  secondsRemaining < 10
                                    ? `0${secondsRemaining}`
                                    : secondsRemaining
                                }`}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          
          <section className="d-flex" style={{ marginLeft:"36%" ,borderRadius: "10px", width: "64%", marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "right" ,}}>
  <div className="d-flex justify-content-between w-100">
    <div>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handlePrevious}
        disabled={step === 0}
      >
        <FaArrowLeft />
      </button>
      
    </div>

    <div>
    {step !== 1 && (
        <button
          type="button"
          className="btn"
          onClick={handleNext}
          style={{
            backgroundColor: "#CBC3E3",
            color: "white",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#DA70D6";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#CBC3E3";
          }}
        >
          <FaArrowRight />
        </button>
      )}
      {step === 1 && (
        <button
          type="submit"
          className={OtpResponse !== null ? "btn " : "btn btn-primary d-none"}
          style={{ backgroundColor: "purple", color: "white" }}
          onClick={Registeruser}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      )}
      {step === 1 && (
        <button
          type="submit"
          style={{ backgroundColor: "purple" }}
          className={
            OtpResponse === null ? "btn text-light" : "btn btn-primary d-none"
          }
          disabled={sendingOtp}
          onClick={() => {
            SendOtp();
          }}
        >
          {sendingOtp ? "Sending Otp..." : "Send Otp"}
        </button>
      )}
    </div>
  </div>
</section>

           
           
          
        </section>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
