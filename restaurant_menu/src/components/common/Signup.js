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
import { showToast } from "../../services/ToastInstance";
import waiterImage from "../../images/waiter-wearing-face-mask-serving_23-2148592573-removebg-preview.png"

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
    password: "",
    confirmPassword: "",
    referralCode:""
  });
  const [otpSendAttempts, setOtpSendAttempts] = useState(0);
  const [showResendButton, setShowResendButton] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(59);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [displayReferCode, setdisplayReferCode] = useState(false);
  const [matched, setmatched] = useState(false);
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
      !formData.password ||
      !formData.confirmPassword
    ) {
   
      showToast("Field missing!","warn")
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
     
      showToast("Password and confirm password do not match.","warn")
      return;
    }
    const body = {
      email: formData.email,
      name: formData.restaurantName,
      phone: formData.phoneNumber,
      address: formData.area,
      area: formData.street,
      zip: formData.pincode,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      enteredOTP: formData.otp,
      referralCode:formData.referralCode
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
  
    // Check if the field is phoneNumber and restrict its length to 10 characters
    if (name === 'phoneNumber') {
      if (value.length <= 10) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      // For other fields, update the state without any length restriction
      setFormData({ ...formData, [name]: value });
    }
  };
  
  useEffect(()=>{
    if (formData.password === formData.confirmPassword&&formData.password?.length >0&&formData.confirmPassword?.length>0 ) {
      setmatched(true)
    }else{
      setmatched(false)
    }
  },[formData])
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
     showToast("Invalid phone number")
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
        className="container d-flex flex-column justify-content-center align-items-center "
        style={{ minHeight: "100vh" }}
      >
        <section
          className="card mb-3"
          style={{
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "10px",
            width: "70%",
            height: "auto",
            display: "flex",
            
          }}
        >
          {/* Form section */}
          <div className="row g-0 d-flex align-items-center">
            <div className="col-lg-4 d-none d-lg-flex">
              <img
                src={waiterImage}
                alt="waiter  img"
                                                
                className="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5"
                height="390vh"
              />
            </div>
            <div className="col-lg-8" >
              <div className="card-body ">
                {/* Render different form sections based on the current step */}
                {step === 0 && (
                  <div className="col-lg-12">
                    <form onSubmit={handleSubmit}>
                      {/* Restaurant Name input */}
                      <div className="form-outline">
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
                      
                        
                        <div className="form-outline ">
                        <input
                          type="text"
                          id="pincode"
                          className="form-control "
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="Pincode"
                        />
                        
                            
                          
                          {/* Password strength indicator */}
                          <div classname="form-outline">
                        <input
                            type="password"
                            id="password"
                            className={passwordStrength<90?"form-control-validate-week":"form-control"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="password"
                          />
                        
                         
                          </div>
                        {/* Confirm Password input */}
                       
                        <div className="form-outline ">
                          <input
                            type="password"
                            id="confirmPassword"
                            className={matched===false?"form-control-validate-week":"form-control"}
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
                            name="referralCode"
                            value={formData.referralCode}
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
        className={step===0?`btn btn-secondary d-none`:"btn btn-secondary"}
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
            backgroundColor: "purple",
            color: "white",
            transition: "background-color 0.3s",
            
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
