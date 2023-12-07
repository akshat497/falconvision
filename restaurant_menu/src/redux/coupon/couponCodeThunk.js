import { toast } from "react-toastify";
import { ApplyCouponCode, DeleteCouponCode, GenerateCouponCode, GetCouponCode, UpdateCouponCode } from "../../services/Services";
import { setCouponCode, setCouponCodeerror, setCouponCodeloading } from "./couponCodeSlice";
import { setGenerateCoupenCode, setGenerateCoupenCodeError, setGenerateCoupenCodeLoading } from "./generateCoupenCodeSlice";
import { setGetCoupon, setGetCouponError, setGetCouponLoading } from "./getCouponCodeSlice";

import { setupdateCoupon, setupdateCouponerror, setupdateCouponloading } from "./updateCouponCodeSlice";
import { setDeleteCoupon, setDeleteCouponerror, setDeleteCouponloading } from "./deleteCouponCodeSlice";
import { useSelector } from "react-redux";
import { showToast } from "../../services/ToastInstance";


export const applyCoupon = (userdata) => async (dispatch) => {
    
  try {
    dispatch(setCouponCodeloading(true));
    const response = await ApplyCouponCode(userdata);
    if(response.message==="Coupon applied"){
        showToast(response?.message,"success")
          localStorage.setItem("coupen",userdata.name)
    }
    dispatch(setCouponCodeloading(false));
    dispatch(setCouponCode(response));
  } catch (error) {
    showToast(error?.response?.data?.message ||error.message,"warn")
    dispatch(setCouponCodeloading(false));
    dispatch(setCouponCodeerror(error));
  }
};
export const generateCoupen= (userData) => async (dispatch) => {
    try {
      
      dispatch(setGenerateCoupenCodeLoading(true));
      const response = await GenerateCouponCode(userData); // Call your API function here
      dispatch(getCouponCode(response?.newCouponCode?.userId))
      dispatch(setGenerateCoupenCode(response));
      dispatch(setGenerateCoupenCodeLoading(false));
    } catch (error) {
     showToast(error?.response?.data?.message ||error.message)
      dispatch(setGenerateCoupenCodeError(error?.message));
      dispatch(setGenerateCoupenCodeLoading(false));
    }
  };
  export const getCouponCode = (userData) => async (dispatch) => {
    
    try {
      dispatch(setGetCouponLoading(true));
      const response = await GetCouponCode(userData); 
      // Call your API function here
      dispatch(setGetCoupon(response));
      dispatch(setGetCouponLoading(false));
    } catch (error) {
     showToast(error?.response?.data?.message ||error.message)
      dispatch(setGetCouponError(error?.message));
      dispatch(setGetCouponLoading(false));
    }
  };
  export const updateCoupon = (userData) => async (dispatch) => {
    try {
       
      dispatch(setupdateCouponloading(true));
      
      const response = await UpdateCouponCode(userData); 
      
      dispatch(getCouponCode(userData?.userId));
      dispatch(setupdateCoupon(response));
      dispatch(setupdateCouponloading(false));
    } catch (error) {
     showToast(error?.response?.data?.message ||error.message)
      dispatch(setupdateCouponerror(error?.message));
      dispatch(setupdateCouponloading(false));
    }
  };
  export const deleteCoupon = (userData) => async (dispatch) => {
    try {
      dispatch(setDeleteCouponloading(true));
      
      const response = await DeleteCouponCode(userData); 
      dispatch(getCouponCode(userData?.userId));
      dispatch(setDeleteCoupon(response));
      dispatch(setDeleteCouponloading(false));
    } catch (error) {
     showToast(error?.response?.data?.message ||error.message)
      dispatch(setDeleteCouponerror(error?.message));
      dispatch(setDeleteCouponloading(false));
    }
  };