import React, { useState } from 'react';
import {  FaBackward } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { createOrder } from '../redux/orders/orderThunk';
import { useEffect } from 'react';
import { sendOtp, verifyOtp } from '../redux/auth/authThunks';
import { toast } from 'react-toastify';




const CheckoutPage = () => {
    const dispatch=useDispatch();
    const loadingCreateOrder=useSelector((state)=>state.createorder.createorderloading)
    const sendingOtp=useSelector((state)=>state.otpsend.otploading)
    let OtpResponse=useSelector((state)=>state.otpsend.otp)
    const OtpVerifyResponse=useSelector((state)=>state.otpverify.v_otp)
    const orderResponse=useSelector((state)=>state.createorder.createorder)
    // const loadingCreateOrder=useSelector((state)=>state.createorder.createorderloading)
    const CreateOrderError=useSelector((state)=>state.createorder.createordererror)
  
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email:''
  });
  const [otpSendAttempts, setOtpSendAttempts] = useState(0);
  const [showResendButton, setShowResendButton] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(59);
  const [userId, setuserId] = useState('')
  const [tableNumber, settableNumber] = useState('')
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
useEffect(()=>{
const data=JSON.parse(localStorage.getItem('params'));
settableNumber(data.tableNumber);
setuserId(data.userId)
setFormData([])
},[])
  const handleOrderSubmit = (e) => {
    e.preventDefault();
    // Handle the order submission here
    const cartItems= JSON.parse(localStorage.getItem('cart'))
    if(!cartItems){
      return toast.error("Empty cart",{
        position:"top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton:false
        
      
      })
    }
    dispatch(verifyOtp(formData))
    }
   const placeOrder=()=>{
    const cartItems= JSON.parse(localStorage.getItem('cart'))
    if(!cartItems){
      return toast.error("Empty cart",{
        position:"top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton:false
        
      
      })
    }
    const obj = {
     userName: formData.username,
     phoneNumber: formData.phoneNumber,
     items: cartItems,
   };
   
   // Convert 'obj' into the desired format
   const convertedObj = {
     username: obj.userName,
     phoneNumber: obj.phoneNumber,
     totalAmount: 0, // You would need to calculate the totalAmount based on 'cartItems' and other properties.
     tableNumber: 0, // Set the appropriate table number.
     userId: '', 
     name:localStorage.getItem("coupen"),// Set the user ID as needed.
     items: obj?.items?.map((item) => {
       return {
         menuItemId:item.menuItemId,
         item_name: item.name,
         quantity: item.quantity,
         price: item.price,
       };
     }),
   };
   localStorage.setItem('userPhone',JSON.stringify(obj.phoneNumber))
   // Calculate 'totalAmount' based on 'cartItems'
   const totalAmount = cartItems?.reduce((total, item) => total + item.quantity * item.price, 0);
   convertedObj.totalAmount = totalAmount;
   
   // Set other properties as needed
   convertedObj.tableNumber = tableNumber; // Set the table number.
   convertedObj.userId = userId; // Set the user ID.
   
    
   
     dispatch(createOrder(convertedObj))
     
   }
   useEffect(()=>{
if(OtpVerifyResponse?.message==="OTP is valid"){
   placeOrder()
}else{
 
}
   },[OtpVerifyResponse])

 
   
//     ('Order placed with data:', cartItems);
    // You can send the formData to your backend for further processing
  
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
    const SendOtp=()=>{
      
      if(formData?.phoneNumber?.length<10){
        return toast.error("Invalid phone number",{
          autoClose:true,
          closeOnClick:true,
          closeButton:true,
          hideProgressBar:true
        })
      }
      const obj={
        email:formData.email,
        phoneNumber:Number(formData.phoneNumber)
      }
      dispatch(sendOtp(obj)); setOtpSendAttempts(otpSendAttempts + 1);
    }
  return (
 <>
       <Link to="/cart" className="btn btn-info ">
          <FaBackward/>
        </Link>
    <div className="checkout-container">
     
      <h2>Checkout Page</h2>
      <form onSubmit={handleOrderSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="username">Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="number"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={OtpResponse!==null?"form-group ":"form-group d-none" }>
          <label htmlFor="phoneNumber">Enter Otp:</label>
         <div className='d-flex '>
         <input
            type="text"
            id="otp"
            name="otp"
            value={formData.otp}
            onChange={handleInputChange}
            required
          />
       {showResendButton ? (
            <div>
              <button
              type="button" 
                className="btn btn-secondary mt-2 mx-2"
                onClick={() => {
                  // Handle OTP resend logic here
                 SendOtp()
                  setShowResendButton(false)
                  setSecondsRemaining(59); // Reset the timer when the "Resend" button is clicked
                }}
              >
                Resend
              </button>
            </div>
          ):(<div>
              <button
                className="btn btn-secondary mt-2 mx-2"
                disabled
              >
                      {`00:${secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining}`}
              </button>
            </div>)}
         </div>
        </div>
        <button type="submit" 
        style={{backgroundColor:"purple"}} 
        className={OtpResponse===null?"btn btn-primary":"btn btn-primary d-none" }
         disabled={sendingOtp} 
         onClick={()=>{SendOtp()}}>
          {sendingOtp?"Sending Otp...":"Send Otp"}</button>
         
        <button type="submit" style={{backgroundColor:"purple"}} className={OtpResponse!==null?"btn btn-primary":"btn btn-primary d-none" } disabled={loadingCreateOrder}>{loadingCreateOrder?"Order Processing":"Place Order"}</button>
          {/* Back button linking to the cart page */}
         
      </form>
    </div>
 </>
  );
};

export default CheckoutPage;
