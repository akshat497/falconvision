

import { toast } from 'react-toastify';
import {setorder, setorderLoading, setorderError } from './getorderSlice'
import { CreateOrder, FetchOrders, SalesSummery, UpdateIsActiveOfOrder } from '../../services/Services';
import { setisActiveOrder, setisActiveOrderloading, setisActiveOrdererror } from './updateIsActiveOrderSlice'
import { setcreateorder, setcreateorderloading, setcreateordererror } from './createOrderSlice'
import { setSales, setLoadingSales, setErrorSales } from './salessSummerySlice'
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../services/ToastInstance';

export const fetchOrders = (userData) => async (dispatch) => {
 
    try {
      dispatch(setorderLoading(true));
      const response = await FetchOrders(userData);  
      
      dispatch(setorder(response));
      dispatch(setorderLoading(false));
    } catch (error) {
      dispatch(setorderError(error.message));
      dispatch(setorderLoading(false));
     showToast(error?.response?.data?.message ||error.message)
    }
  };
  export const updateIsActiveOrder = (userData) => async (dispatch) => {
    try {
      dispatch(setisActiveOrderloading(true));
      const response = await UpdateIsActiveOfOrder(userData); 
      const orderObj = {
        userId: response?.Customer?.userId,
        page: 100,
      }; 
       dispatch(fetchOrders(orderObj))
      dispatch(setisActiveOrder(response));
      dispatch(setisActiveOrderloading(false));
    } catch (error) {
      dispatch(setisActiveOrdererror(error.message));
      dispatch(setisActiveOrderloading(false));
     showToast(error?.response?.data?.message ||error.message)
    }
  };
  export const createOrder = (userData) => async (dispatch) => {
    try {
      dispatch(setcreateorderloading(true));
      const response = await CreateOrder(userData);  
     
      
      dispatch(setcreateorder(response));
      dispatch(setcreateorderloading(false));
    } catch (error) {
     showToast(error?.response?.data?.message ||error.message)
      dispatch(setcreateordererror(error.message));
      dispatch(setcreateorderloading(false));
      
    }
  };
  export const salesSummery = (userData) => async (dispatch) => {
    try {
      dispatch(setLoadingSales(true));
      const response = await SalesSummery(userData);  
      dispatch(setSales(response));
      dispatch(setLoadingSales(false));
    } catch (error) {
      dispatch(setErrorSales(error.message));
      dispatch(setLoadingSales(false));
     showToast(error?.response?.data?.message ||error.message)
    }
  };