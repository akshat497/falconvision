// authThunks.js
import {
  AddCategory,
  AddItem,
  DeleteCategory,
  DeleteItem,
  FetchCategory,
  FetchItem,
  GetRestaurantDetails,
  UpdateCategory,
  UpdateItem,
} from "../../services/Services";
import { setItem, setItemLoading, setItemError } from "./addItemSlice";
import {
  setCategory,
  setCategoryloading,
  setCategoryerror,
} from "./addCategorySlice";
import {
  setFetchedCategory,
  setFetchedCategoryloading,
  setFetchedCategoryerror,
} from "./fetchCategorySlice";
import {
  setDeleteCategory,
  setDeleteCategoryloading,
  setDeleteCategoryerror,
} from "./deleteCategorySlice";
import {
  setupdateCategory,
  setupdateCategoryloading,
  setupdateCategoryerror,
} from "./updateCategorySlice";
import {
  setupdateItem,
  setupdateItemloading,
  setupdateItemerror,
} from "./updateItemSlice";
import {
  setFetchedItem,
  setFetchedItemLoading,
  setFetchedItemError,
  setName,
} from "./fetchItemSlice";
import {
  setDeleteItem,
  setDeleteItemloading,
  setDeleteItemerror,
} from "./deleteitemSlice";
import {
  setRestro,
  setRestroLoading,
  setRestroError,
} from "./fetchRestroSlice";
import { toast } from "react-toastify";
import { fetchOrders } from "../orders/orderThunk";
import { getCouponCode } from "../coupon/couponCodeThunk";
import { showToast } from "../../services/ToastInstance";

export const addItem = (userData) => async (dispatch) => {
  try {
    dispatch(setItemLoading(true));
    const response = await AddItem(userData);
    if(response?.success===true){
      showToast("The menu item has been successfully added.","success");

    }
    dispatch(fetchItem(userData?.userId));
    dispatch(setItem(response));
    dispatch(setItemLoading(false));
  } catch (error) {
    showToast(error?.response?.data?.message ||error.message)

    dispatch(setItemError(error?.message));
    dispatch(setItemLoading(false));
  }
};
export const addCategory = (userData) => async (dispatch) => {
  try {
    dispatch(setCategoryloading(true));
    const response = await AddCategory(userData); // Call your API function here
    if(response){
      showToast("New category has been successfully added.","success");

    }
    dispatch(fetchCategory(userData?.userId));
    dispatch(setCategory(response));
    dispatch(setCategoryloading(false));
  } catch (error) {
    showToast(error?.response?.data?.message ||error.message)
    dispatch(setCategoryerror(error?.message));
    dispatch(setCategoryloading(false));
  }
};
export const fetchCategory = (userData) => async (dispatch) => {
  try {
    dispatch(setFetchedCategoryloading(true));
    const response = await FetchCategory(userData);
    // Call your API function here
    dispatch(setFetchedCategory(response));
    dispatch(setFetchedCategoryloading(false));
  } catch (error) {
    showToast(error?.response?.data?.message ||error.message)
    dispatch(setFetchedCategoryerror(error?.message));
    dispatch(setFetchedCategoryloading(false));
  }
};
export const deleteCategory = (userData) => async (dispatch) => {
  try {
    dispatch(setDeleteCategoryloading(true));

    const response = await DeleteCategory(userData);
    if(response){
      showToast(response.message,"success");

    }
    dispatch(fetchItem(userData?.userId));
    dispatch(fetchCategory(userData?.userId));

    dispatch(setDeleteCategory(response));
    dispatch(setDeleteCategoryloading(false));
  } catch (error) {
    showToast(error?.response?.data?.message ||error.message)
    dispatch(setDeleteCategoryerror(error?.message));
    dispatch(setDeleteCategoryloading(false));
  }
};
export const updateCategory = (userData) => async (dispatch) => {
  try {
    dispatch(setupdateCategoryloading(true));

    const response = await UpdateCategory(userData);
    if(response.success===true){
      showToast(response.message,"success")
      dispatch(fetchItem(userData?.userId))
      dispatch(fetchCategory(userData?.userId));
    }
  

    dispatch(setupdateCategory(response));
    dispatch(setupdateCategoryloading(false));
  } catch (error) {
    showToast(error?.response?.data?.message ||error.message)
    dispatch(setupdateCategoryerror(error?.message));
    dispatch(setupdateCategoryloading(false));
  }
};
export const updateItem = (userData) => async (dispatch) => {
  try {
    dispatch(setupdateItemloading(true));

    const response = await UpdateItem(userData);
    if(response.success===true){
      showToast(response.message,"success")
      dispatch(fetchItem(userData?.userId));
    }

    

    dispatch(setupdateItem(response));
    dispatch(setupdateItemloading(false));
  } catch (error) {
    showToast(error?.response?.data?.message ||error.message)
    dispatch(setupdateItemerror(error?.message));
    dispatch(setupdateItemloading(false));
  }
};
export const fetchItem = (userData) => async (dispatch) => {
  try {
    dispatch(setFetchedItemLoading(true));
    const response = await FetchItem(userData);
   
    dispatch(setFetchedItem(response?.data));
    dispatch(setName(response?.message))
    dispatch(setFetchedItemLoading(false));
  } catch (error) {
    showToast(error?.response?.data?.message ||error.message)
    dispatch(setFetchedItemError(error?.message));
    dispatch(setFetchedItemLoading(false));
  }
};
export const deleteItem = (userData) => async (dispatch) => {
  try {
    dispatch(setDeleteItemloading(true));

    const response = await DeleteItem(userData);
    if(response.success===true){
      showToast(response.message,"success");

    }
    dispatch(fetchItem(userData?.userId));

    dispatch(setDeleteItem(response));
    dispatch(setDeleteItemloading(false));
  } catch (error) {
    showToast(error?.response?.data?.message ||error.message)
    dispatch(setDeleteItemerror(error?.message));
    dispatch(setDeleteItemloading(false));
  }
};
export const fetchRestraurantDetails = () => async (dispatch) => {
  try {
    dispatch(setRestroLoading(true));
    const response = await GetRestaurantDetails();
    // Call your API function here
    if (response) {
      var orderObj = {
        userId: response?.userId,
        page: 100,
      };
      dispatch(fetchOrders(orderObj));
      dispatch(fetchItem(response?.userId));
      dispatch(fetchCategory(response?.userId));
      dispatch(getCouponCode(response?.userId));
    }
    dispatch(setRestro(response));
    dispatch(setRestroLoading(false));
  } catch (error) {
    
    // toast.error(error?.response?.data?.message ||error?.message)

    dispatch(setRestroError(error?.message));
    dispatch(setRestroLoading(false));
   
  }
};
