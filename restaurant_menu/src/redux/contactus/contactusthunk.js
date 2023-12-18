import { toast } from "react-toastify";
import { CreateContactus, DeleteFeedback, FetchFeedbacks } from "../../services/Services";
import { setContactus, setContactuserror, setContactusloading } from "./contactUsSlice";
import { showToast } from "../../services/ToastInstance";
import { setfetchContactus, setfetchContactuserror, setfetchContactusloading } from "./fetchContactUsSlide";
import { setdeleteContactus, setdeleteContactuserror, setdeleteContactusloading } from "./deleteFeedbackSlice";

export const createContact = (userdata) => async (dispatch) => {
  try {
    dispatch(setContactusloading(true));
    const response = await CreateContactus(userdata);
    if(response.message==="Contact Us created successfully"){
        toast.success("Thank you for contacting us",{
            autoClose:false,
            closeOnClick:true,
            closeButton:true
    
            
          })
    }
    dispatch(setContactusloading(false));
    dispatch(setContactus(response));
  } catch (error) {
    showToast(error?.response?.data?.message ||error.message)
    dispatch(setContactusloading(false));
    dispatch(setContactuserror(error));
  }
};
export const fetchContact = (userdata) => async (dispatch) => {
  try {
    dispatch(setfetchContactusloading(true));
    const response = await FetchFeedbacks(userdata);
  
    dispatch(setfetchContactusloading(false));
    dispatch(setfetchContactus(response));
  } catch (error) {
    showToast(error?.response?.data?.message ||error.message)
    dispatch(setfetchContactusloading(false));
    dispatch(setfetchContactuserror(error));
  }
};
export const deleteContact = (userdata) => async (dispatch) => {
  try {
    dispatch(setdeleteContactusloading(true));
    const response = await DeleteFeedback(userdata);
  
    dispatch(setdeleteContactusloading(false));
    dispatch(setdeleteContactus(response));
  } catch (error) {
    showToast(error?.response?.data?.message ||error.message)
    dispatch(setdeleteContactusloading(false));
    dispatch(setdeleteContactuserror(error));
  }
};
