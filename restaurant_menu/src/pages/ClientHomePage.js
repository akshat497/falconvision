import React from 'react'
import { Link } from 'react-router-dom'
import ClientHeader from '../components/common/ClientHeader'
import AboutUs from '../components/ClientPages/AboutUs'
import Footer from '../components/common/Footer'

export default function ClientHomePage() {
  return (
 <>
     <div style={{height:"100vh"}}>
   <ClientHeader/>
   <AboutUs/>
  
    </div>
    <Footer/>
 </>
  )
}
