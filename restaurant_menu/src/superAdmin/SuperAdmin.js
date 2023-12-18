import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../admin/components/main/ProtectedRoute'
import SuperAdminHeader from './components/common/SuperAdminHeader'
import Users from './components/main/Users'

import Details from './components/main/Details'
import MembershipExtensionForm from './components/main/Membership'
import Feedbacks from './components/main/Feedbacks'
import { useDispatch } from 'react-redux'
import { fetchRestraurantDetails } from '../redux/items/itemThunk'
export default function SuperAdmin() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchRestraurantDetails())
  },[])
  return (
   <>
     <Routes>
   
   <Route path="/" element={ <ProtectedRoute Component={<Users/>}/>}/>
   <Route path="/details" element={ <ProtectedRoute Component={<Details/>}/>}/>
   <Route path="/membership" element={ <ProtectedRoute Component={<MembershipExtensionForm/>}/>}/>
   <Route path="/feedback" element={ <ProtectedRoute Component={<Feedbacks/>}/>}/>
  
</Routes>
   </>
  )
}
