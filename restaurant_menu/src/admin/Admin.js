import React, { useEffect } from 'react'
import Header from './components/common/Header'
import { Route, Routes } from 'react-router-dom'
import AddItem from './components/main/AddItem'
import ProtectedRoute from './components/main/ProtectedRoute'
import Dashbord from './components/main/Dashbord'
import AddCategory from './components/main/AddCategory'
import Preview from './components/main/Preview'
import OrderManagement from './components/main/OrderManagement'
import { fetchRestraurantDetails } from '../redux/items/itemThunk'
import { useDispatch, useSelector } from 'react-redux'
import AddHolder from './components/main/AddHolder'
import Tables from './components/main/Tables'
import QrGenerator from './components/main/QrGenerator'
import OrderManagementHolder from './components/main/OrderManagementHolder'
import CouponGenerator from './components/main/CouponGenerator'


export default function Admin() {
  const dispatch = useDispatch();
  const restroLoading = useSelector((state) => state.restrodetail.loading);
    useEffect(() => {
    dispatch(fetchRestraurantDetails());
  }, []);

  return (
    <>
    <Header/>
    {restroLoading?<div className='overlay'></div>:null}
   <Routes>     
            <Route path="/" element={ <ProtectedRoute Component={<Dashbord/>}/>}/>
            <Route path="/additem" element={<ProtectedRoute Component={<AddItem/>}/>}/>
            <Route path="/addcategory" element={ <ProtectedRoute Component={<AddCategory/>}/>}/>
            <Route path="/preview" element={<ProtectedRoute Component={<Preview/>}/>}/>
            <Route path="/ordermanagement" element={<ProtectedRoute Component={<OrderManagementHolder/>}/>}/>
            <Route path="/add" element={<ProtectedRoute Component={<AddHolder/>}/>}/>
            <Route path="/tables" element={<ProtectedRoute Component={<Tables/>}/>}/>
            <Route path="/qr" element={<ProtectedRoute Component={<QrGenerator/>}/>}/>
            <Route path="/coupon" element={<ProtectedRoute Component={<CouponGenerator/>}/>}/>
   </Routes>
   {/* <Footer/> */}
    </>
  )
}
