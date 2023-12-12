import { toast } from "react-toastify";
import { CreateContactus } from "../../services/Services";
import { setContactus, setContactuserror, setContactusloading } from "./contactUsSlice";
import { showToast } from "../../services/ToastInstance";

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
