// authThunks.js
import { toast } from "react-toastify";
import { AuthResetPassword, Forgetpassword, GenerateReferCode, LoginUser, OtpSend, OtpVerify, QrGenerator, RegisterUser, ResetPassword } from "../../services/Services";
import { fetchRestraurantDetails } from "../items/itemThunk";
import { setUser, setLoading, setError } from "./authSlice";
import { setUserLogin, setLoadingLogin, setErrorLogin } from "./loginSlice";
import { setReset, setResetloading, setReseterror }  from './resetPasswordSlice'
import { setOtp, setOtpLoading, setOtpError } from './otpSendSlice'
import { setOtpVerify, setOtpLoadingVerify, setOtpErrorVerify }  from './otpVerifySlice'
import { setForgetPassword, setForgetPasswordLoading, setForgetPasswordError }  from './forgetPasswordSlice'

import { setQr, setQrLoading, setQrError } from './qrGeneratorSlice'
import ForgetPassword from "../../components/modals/ForgetPassword";
import { setAuthResetPassword, setAuthResetPasswordError, setAuthResetPasswordLoading } from "./authResetPasswordSlice";
import { showToast } from "../../services/ToastInstance";
import { setgenerateReferCode, setgenerateReferCodeError, setgenerateReferCodeLoading } from "./generateReferSlice";
export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await RegisterUser(userData); // Call your API function here
    if(response){
      // (response)
      localStorage.setItem("token",  response?.Authorization );
      dispatch(fetchRestraurantDetails());
      //  window.location.reload()
    }
    dispatch(setUser(response));
    dispatch(setLoading(false));
  } catch (error) {
    
   showToast(error?.response?.data?.message ||error.message)
    dispatch(setError(error?.message));
    dispatch(setLoading(false));
  }
};

export const loginUser = (userData) => async (dispatch) => {
    try {
      
      dispatch(setLoadingLogin(true));
      const response = await LoginUser(userData); // Call your API function here
     

      if(response){
        
        localStorage.setItem("token",  response?.Authorization );
        dispatch(fetchRestraurantDetails());
      }
      dispatch(setUserLogin(response));
      dispatch(setLoadingLogin(false));
    } catch (error) {
      
     showToast(error?.response?.data?.message ||error.message)
      // toast.error("something went wrong")
      dispatch(setErrorLogin(error));
      dispatch(setLoadingLogin(false));
    }
  };
  export const resetPassword = (userData) => async (dispatch) => {
    try {
      
      dispatch(setResetloading(true));
      const response = await ResetPassword(userData); // Call your API function here
    
      dispatch(setReset(response));
      dispatch(setResetloading(false));
    } catch (error) {
     showToast(error?.response?.data?.message ||error.message)
      // toast.error("something went wrong")
      dispatch(setReseterror(error.message));
      dispatch(setResetloading(false));
    }
  };
  export const sendOtp = (userData) => async (dispatch) => {
    try {
      
      dispatch(setOtpLoading(true));
      const response = await OtpSend(userData); // Call your API function here
    
      dispatch(setOtp(response));
      dispatch(setOtpLoading(false));
    } catch (error) {
     showToast(error?.response?.data?.message ||error.message)
      // toast.error("something went wrong")
      dispatch(setOtpError(error.message));
      dispatch(setOtpLoading(false));
    }
  };
  // export const verifyOtp = (userData) => async (dispatch) => {
  //   try {
      
  //     dispatch(setOtpLoadingVerify(true));
  //     const response = await OtpVerify(userData); // Call your API function here
      
  //     dispatch(setOtpVerify(response));
  //     dispatch(setOtpLoadingVerify(false));
  //   } catch (error) {
      
  //    showToast(error?.response?.data?.message ||error.message)
  //     // toast.error("something went wrong")
  //     dispatch(setOtpErrorVerify(error.message));
  //     dispatch(setOtpLoadingVerify(false));
  //   }
  // };

  export const qrGenerator = (userData) => async (dispatch) => {
    try {
      
      dispatch(setQrLoading(true));
      const response = await QrGenerator(userData); // Call your API function here
      
      dispatch(setQr(response));
      dispatch(setQrLoading(false));
    } catch (error) {
      
     showToast(error?.response?.data?.message ||error.message)
      // toast.error("something went wrong")
      dispatch(setQrError(error.message));
      dispatch(setQrLoading(false));
    }
  };
  export const forgetPassword = (userData) => async (dispatch) => {
    try {
      
      dispatch(setForgetPasswordLoading(true));
      const response = await Forgetpassword(userData); // Call your API function here
    if(response){
    
      showToast("Password reset email sent","success")
      
    }
      dispatch(setForgetPassword(response));
      dispatch(setForgetPasswordLoading(false));
    } catch (error) {
      showToast(error?.response?.data?.message ||error.message)
      // toast.error("something went wrong")
      dispatch(setForgetPasswordError(error.response.data.message));
      dispatch(setForgetPasswordLoading(false));
    }
  };
  export const authResetPassword = (userData) => async (dispatch) => {
    try {
      
      dispatch(setAuthResetPasswordLoading(true));
      const response = await AuthResetPassword(userData); // Call your API function here
    if(response){
      showToast("Password reset successfull","success")
    }
      dispatch(setAuthResetPassword(response));
      dispatch(setAuthResetPasswordLoading(false));
    } catch (error) {
      showToast(error?.response?.data?.message ||error.message)
      // toast.error("something went wrong")
      dispatch(setAuthResetPasswordError(error.response.data.message));
      dispatch(setAuthResetPasswordLoading(false));
    }
  }; 
  export const referCodeGenerator = (userData) => async (dispatch) => {
    try {
      
      dispatch(setgenerateReferCodeLoading(true));
      const response = await GenerateReferCode(userData); // Call your API function here
      
      dispatch(setgenerateReferCode(response));
      dispatch(setgenerateReferCodeLoading(false));
    } catch (error) {
      
     showToast(error?.response?.data?.message ||error.message)
      // toast.error("something went wrong")
      dispatch(setgenerateReferCodeError(error.message));
      dispatch(setgenerateReferCodeLoading(false));
    }
  };