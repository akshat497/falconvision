import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../../../../../redux/auth/authThunks'

export default function PasswordResetLinkConfirmModal() {
    const dispatch=useDispatch()
    const restroDetails=useSelector((state)=>state.restrodetail.restro) 
    const loadingForgetPassword=useSelector((state)=>state.forgetpassword.forgetpasswordloading) 
   
    const sendEmail=()=>{
        var obj={
          email:restroDetails.email,
          phoneNumber:restroDetails.phone,
          url:window.location.origin+"/resetpassword"
        }
        dispatch(forgetPassword(obj))
          }
  return (
    <div className="alert alert-danger " role="alert">
    <div className="flex-grow-1">
      <small className="mb-0">
        Are you sure you want to reset your password? We will send a password reset link to your registered email address. Please confirm your decision below.
      </small>
    </div>
    <div className='d-flex justify-content-end ' >
      <button
        type="submit"
        onClick={sendEmail}
        disabled={loadingForgetPassword}
        className="btn btn-danger text-light "
      >
        {loadingForgetPassword ? "Sending..." : "Confirm"}
      </button>
    </div>
  </div>
  

  )
}
