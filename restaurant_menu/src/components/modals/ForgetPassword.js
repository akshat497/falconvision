import React, { useState } from 'react'
import {  FaQuestion } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../redux/auth/authThunks'
import { useLocation } from 'react-router-dom';

export default function ForgetPassword() {
    const dispatch=useDispatch();
    const location=useLocation()
    const lodaing=useSelector((state)=>state.forgetpassword.forgetpasswordloading)
    const [email, setemail] = useState('')

    const sendEmail=()=>{
  var obj={
    email:email,
    url:window.location.origin+"/resetpassword"
  }
  dispatch(forgetPassword(obj))
    }
  return (
    <div className="modal fade" tabIndex={-1} id="forgetpassword" aria-labelledby="forgetpassword" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Forget Password <FaQuestion/></h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        <div className='container'>
        <span></span>
           <input
           type='email'
            className="form-control" 
           placeholder={`Enter email ` }
           rows={6}
              onChange={(e)=>{setemail(e.target.value)}}
              value={email}
           />
        </div>
        </div>
        <div className="modal-footer">
          <button className='btn text-light' style={{backgroundColor:"purple"}} onClick={sendEmail} disabled={lodaing}>{lodaing?"Sending...":"Send"} </button>
        </div>
      </div>
    </div>
  </div>
  )
}
