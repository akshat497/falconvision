import axios from "axios";
import { createAxiosInstance } from "./ApiInstance";

const SIGNUP_URL =
  process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SIGNUP_ENDPOINT;
const SIGNIN_URL =
  process.env.REACT_APP_BASE_URL + process.env.REACT_APP_SIGNIN_ENDPOINT;
const ADDITEM_URL =
  process.env.REACT_APP_BASE_URL + process.env.REACT_APP_ADDITEM_ENDPOINT;
const FETCHITEM_URL =
  process.env.REACT_APP_BASE_URL + process.env.REACT_APP_FETCHITEM_ENDPOINT;
const UPDATEITEM_URL =
  process.env.REACT_APP_BASE_URL + process.env.REACT_APP_UPDATEITEM_ENDPOINT;
const DELETEITEM_URL =
  process.env.REACT_APP_BASE_URL +
  process.env.REACT_APP_DELETE_MENUITEM_BYID_ENDPOINT;
const ADDCATEGORY_URL =
  process.env.REACT_APP_BASE_URL + process.env.REACT_APP_ADDCATEGORY_ENDPOINT;
const FETCHCATEGORY_URL =
  process.env.REACT_APP_BASE_URL + process.env.REACT_APP_FETCHCATEGORY_ENDPOINT;
const DELETE_CATEGORY_URL =
  process.env.REACT_APP_BASE_URL +
  process.env.REACT_APP_DELETE_CATEGORY_BYID_ENDPOINT;
const UPDATE_CATEGORY_URL =
  process.env.REACT_APP_BASE_URL +
  process.env.REACT_APP_UPDATE_CATEGORY_BYID_ENDPOINT;
  const GET_RESTAURANT_DETAIL_URL =
  process.env.REACT_APP_BASE_URL +
  process.env.REACT_APP_GET_RESTAURANT_DETAILS_ENDPOINT;


 
export const RegisterUser = async (body) => {
  try {
    const response = await axios.post(SIGNUP_URL, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const LoginUser = async (body) => {
  try {
   
    const response = await axios.post(SIGNIN_URL, body);
    return response.data;
  } catch (error) {

    throw error;
  }
};
export const AddItem = async (body) => {
  try {
  
    const response = await createAxiosInstance().post(ADDITEM_URL, body);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const FetchItem = async (ID) => {
  try {
  
    const response = await createAxiosInstance().get(`${FETCHITEM_URL}/${ID}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};
export const DeleteItem = async (data) => {
  
  try {
  
    const response = await createAxiosInstance().delete(`${DELETEITEM_URL}/${data.menuItemId}/${data.userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const UpdateItem = async (body) => {
  
  try {
  
    const response = await createAxiosInstance().put(UPDATEITEM_URL, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const AddCategory = async (body) => {
  try {
  
    const response = await createAxiosInstance().post(ADDCATEGORY_URL, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const FetchCategory = async (ID) => {
 
  try {
  
    const response = await createAxiosInstance().get(`${FETCHCATEGORY_URL}/${ID}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const DeleteCategory = async (body) => {
  
  try {
    
    const response = await createAxiosInstance().delete(`${DELETE_CATEGORY_URL}/${body.categoryId}/${body.userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const UpdateCategory = async (body) => {
  
  try {
    const response = await createAxiosInstance().put(UPDATE_CATEGORY_URL, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetRestaurantDetails = async () => {
 
  try {
    const response = await createAxiosInstance().get(GET_RESTAURANT_DETAIL_URL,);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const FetchOrders = async (obj) => {
 
  try {
    const response = await createAxiosInstance().get(process.env.REACT_APP_BASE_URL+`getOrder/${obj.userId}?page=${obj.page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const UpdateIsActiveOfOrder = async (body) => {
 
  try {
    const response = await createAxiosInstance().put(process.env.REACT_APP_BASE_URL+"updateIsActiveOfOrder",body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const CreateOrder = async (body) => {
 
  try {
    const response = await axios.post(process.env.REACT_APP_BASE_URL+"addOrders",body);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const ResetPassword = async (body) => {
 
  try {
    const response = await createAxiosInstance().post(process.env.REACT_APP_BASE_URL+"resetpassword",body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const FetchAllUsers = async () => {
 
  try {
    const response = await createAxiosInstance().get(process.env.REACT_APP_BASE_URL+`getAllUserDetails`);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const ActiveUser = async (obj) => {
 
  try {
    const response = await createAxiosInstance().put(process.env.REACT_APP_BASE_URL+`updateUserDetails`,obj);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const SalesSummery = async (obj) => {
 
  try {
    const response = await createAxiosInstance().post(process.env.REACT_APP_BASE_URL+`getSalesSummary/${obj?.userId}`,obj);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const OtpSend = async (obj) => {
 
  try {
  
    const response = await axios.post(process.env.REACT_APP_BASE_URL+`otp`,obj);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const OtpVerify = async (formdata) => {
 
  try {
  var obj={
    phoneNumber:Number(formdata.phoneNumber),
    enteredOTP:formdata.otp,
    email:formdata.email
  }
    const response = await axios.post(process.env.REACT_APP_BASE_URL+`verifyotp`,obj);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const QrGenerator = async (obj) => {
 
  try {
 
    const response = await createAxiosInstance().post(process.env.REACT_APP_BASE_URL+`qrgenerator`,obj);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const CreateContactus = async (obj) => {
 
  try {
 
    const response = await axios.post(process.env.REACT_APP_BASE_URL+`createcontactus`,obj);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const Forgetpassword = async (obj) => {
 
  try {
 
    const response = await axios.post(process.env.REACT_APP_BASE_URL+`forgetpassword`,obj);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const AuthResetPassword = async (obj) => {
 
  try {
 
    const response = await axios.post(process.env.REACT_APP_BASE_URL+`authresetpassword `,obj);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const ApplyCouponCode = async (obj) => {
 
  try {
 
    const response = await axios.post(process.env.REACT_APP_BASE_URL+`applyCoupenCode `,obj);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GenerateCouponCode = async (obj) => {
 
  try {
 
    const response = await createAxiosInstance().post(process.env.REACT_APP_BASE_URL+`createCoupenCode `,obj);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const GetCouponCode = async (userId) => {
 
  try {
 
    const response = await createAxiosInstance().get(process.env.REACT_APP_BASE_URL+`CoupenCodeByUserId/${userId} `,);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const UpdateCouponCode = async (obj) => {
 
  try {
 
    const response = await createAxiosInstance().put(process.env.REACT_APP_BASE_URL+`updateCoupenCodeById `,obj);
 
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const DeleteCouponCode = async (obj) => {
 
  try {
 
    const response = await createAxiosInstance().delete(process.env.REACT_APP_BASE_URL+`deleteCoupenCodeById/${obj.CoupenCodeId}/${obj.userId} `);
 
    return response.data;
  } catch (error) {
    throw error;
  }
}
  export const GenerateReferCode = async (userId) => {
 
    try {
   
      const response = await createAxiosInstance().get(process.env.REACT_APP_BASE_URL+`generaterefercode/${userId} `);
   
      return response.data;
    } catch (error) {
      throw error;
    }
};