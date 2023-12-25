import {  ExtendMembership, FetchAllUsers, UpdateUser } from "../../services/Services";
import { showToast } from "../../services/ToastInstance";
import { fetchRestraurantDetails } from "../items/itemThunk";
import { setextendmembership, setextendmembershiperror, setextendmembershiploading } from "./extendMembershipSlice";
import { setfetchAllUsers, setfetchAllUserserror, setfetchAllUsersloading } from "./fetchAllUsersSlice";
import { setupdateUser, setupdateUsererror, setupdateUserloading } from "./updateUserSlice";

export const extendMembership = (userData) => async (dispatch) => {
    try {
      dispatch(setextendmembershiploading(true));
      const response = await ExtendMembership(userData);  
      
      dispatch(setextendmembership(response));
      dispatch(setextendmembershiploading(false));
    } catch (error) {
      dispatch(setextendmembershiperror(error.message));
      dispatch(setextendmembershiploading(false));
     showToast(error?.response?.data?.message ||error.message)
    }
  };
  export const updateUser = (userData) => async (dispatch) => {
    try {
      dispatch(setupdateUserloading(true));
      const response = await UpdateUser(userData);  
      if(response.message==="Record has been successfully updated."){
        
        dispatch(fetchRestraurantDetails(userData?.userId))
        showToast("Profile Updated","success")

      }
      dispatch(setupdateUser(response));
      dispatch(setupdateUserloading(false));
    } catch (error) {
      dispatch(setupdateUsererror(error.message));
      dispatch(setupdateUserloading(false));
     showToast(error?.response?.data?.message ||error.message)
    }
  };
  export const fetchAllUsers = (userData) => async (dispatch) => {
    try {
      dispatch(setfetchAllUsersloading(true));
      const response = await FetchAllUsers(userData);  
      
      dispatch(setfetchAllUsers(response));
      dispatch(setfetchAllUsersloading(false));
    } catch (error) {
      dispatch(setfetchAllUserserror(error.message));
      dispatch(setfetchAllUsersloading(false));
     showToast(error?.response?.data?.message ||error.message)
    }
  };