import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../admin/components/main/ProtectedRoute'
import SuperAdminHeader from './components/common/SuperAdminHeader'
import Users from './components/main/Users'

import Details from './components/main/Details'
export default function SuperAdmin() {
  return (
   <>
     <Routes>
   
   <Route path="/" element={ <ProtectedRoute Component={<Users/>}/>}/>
   <Route path="/details" element={ <ProtectedRoute Component={<Details/>}/>}/>
  
</Routes>
   </>
  )
}
