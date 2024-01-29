// store.js
import { configureStore,getDefaultMiddleware  } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import loginReducer from "../auth/loginSlice"
import additemReducer from "../items/addItemSlice"
import addcategoryReducer from "../items/addCategorySlice"
import fetchcategoryReducer from "../items/fetchCategorySlice"
import deletecategoryReducer from "../items/deleteCategorySlice"
import updatecategoryReducer from "../items/updateCategorySlice"
import fetchitemReducer from "../items/fetchItemSlice"
import deleteitemReducer from "../items/deleteitemSlice"
import restrodetailReducer from "../items/fetchRestroSlice"
import updateitemReducer from "../items/updateItemSlice"
import getOrderReducer from "../orders/getorderSlice"
import createorderReducer from "../orders/createOrderSlice"
import updateisactiveorderReducer from "../orders/updateIsActiveOrderSlice"
import salessummeryReducer from "../orders/salessSummerySlice"
import otpsendReducer from '../auth/otpSendSlice'
import otpverifyReducer from '../auth/otpVerifySlice'
import qrgeneratorReducer from '../auth/qrGeneratorSlice'
import contactusReducer from "../contactus/contactUsSlice";
import forgetpasswordReducer from "../auth/forgetPasswordSlice";
import couponcodesReducer from "../coupon/couponCodeSlice";
import generatecoupencodeReducer from "../coupon/generateCoupenCodeSlice";
import getCouponReducer from "../coupon/getCouponCodeSlice";
import deletecouponReducer from "../coupon/deleteCouponCodeSlice";
import updatecouponReducer from "../coupon/updateCouponCodeSlice";
import generateReferCodeReducer from "../auth/generateReferSlice"
import extendmembershipReducer from "../users/extendMembershipSlice"
import fetchcontactusReducer from "../contactus/fetchContactUsSlide"
import deletecontactusReducer from "../contactus/deleteFeedbackSlice"
import updateUserReducer from "../users/updateUserSlice"
import fetchAllUsersReducer from "../users/fetchAllUsersSlice"
import resetReducer from "../auth/resetPasswordSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    login: loginReducer,
    addItem:additemReducer,
    addcategory:addcategoryReducer,
    fetchcategory:fetchcategoryReducer,
    deletecategory:deletecategoryReducer,
    updatecategory:updatecategoryReducer,
    fetchitem:fetchitemReducer,
    deleteitem:deleteitemReducer,
    restrodetail:restrodetailReducer,
    updateitem:updateitemReducer,
    getOrder:getOrderReducer,
    createorder:createorderReducer,
    updateisactiveorder:updateisactiveorderReducer,
    salessummery:salessummeryReducer,
    otpsend:otpsendReducer,
    otpverify:otpverifyReducer,
    qrgenerator:qrgeneratorReducer,
    contactus:contactusReducer,
    forgetpassword:forgetpasswordReducer,
    couponcodes:couponcodesReducer,
    generatecoupencode:generatecoupencodeReducer,
    getCoupon:getCouponReducer,
    deletecoupon:deletecouponReducer,
    updatecoupon:updatecouponReducer,
    generateReferCode:generateReferCodeReducer,
    extendmembership:extendmembershipReducer,
    fetchcontactus:fetchcontactusReducer,
    deletecontactus:deletecontactusReducer,
    updateUser:updateUserReducer,
    fetchAllUsers:fetchAllUsersReducer,
    reset:resetReducer

  },
  
});

export default store;
