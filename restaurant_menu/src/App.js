import React from 'react'
import RestaurantContextState from './context/RestaurantContextState'
// import Header from './components/common/Header'
import Homepage from './pages/Homepage'
import CartPage from './pages/CartPage'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import Footer from './components/common/Footer'
import Login from './components/common/Login'
import Signup from './components/common/Signup'
import Admin from './admin/Admin'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './redux/store/store'
import { Provider, useSelector } from "react-redux"

import CheckoutPage from './pages/CheckoutPage'
import ClientHomePage from './pages/ClientHomePage'
import AboutUs from './components/ClientPages/AboutUs'
import ContactUs from './components/ClientPages/ContactUs'
import SuperAdmin from './superAdmin/SuperAdmin'
import FAQPage from './components/ClientPages/FaqPage'
import AuthResetPassword from './components/main/AuthResetPassword'
import Customer from './components/main/Customer'

export default function App() {
 
  return (
    <> <Provider store={store}>
      <RestaurantContextState>
        <BrowserRouter>
        <ToastContainer />
          <Routes>
          <Route path="/" element={<ClientHomePage/>}/>
          <Route path="/faq" element={<FAQPage/>}/>
          <Route path="/contactus" element={<ContactUs/>} />
            <Route path="/:userId/:tableNumber" element={<Homepage/>}/>
            <Route path="/cart" element={<CartPage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/checkoutpage" element={<CheckoutPage/>}/>
            <Route path="/superadmin/*" element={<SuperAdmin />} />
            <Route path="/admin/*" element={<Admin/>}/>
            <Route path="/resetpassword/:token" element={<AuthResetPassword/>} />
            <Route path="/customer" element={<Customer/>} />
            {/* <Route path="/admin/dashbord" element={ <ProtectedRoute Component={<Dashbord/>}/>}/>
            <Route path="/admin/additem" element={<ProtectedRoute Component={<AddItem/>}/>}/>
            <Route path="/admin/addcategory" element={ <ProtectedRoute Component={<AddCategory/>}/>}/>
            <Route path="/admin/preview" element={<ProtectedRoute Component={<Preview/>}/>}/> */}
          </Routes>
          
        </BrowserRouter>
        
      </RestaurantContextState>
      </Provider>
    </>
  )
}
