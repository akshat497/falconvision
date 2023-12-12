import React from 'react';
import { FaCogs, FaEdit, FaLink, FaUserAlt, FaUserCheck, FaUserCog } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { referCodeGenerator } from '../../../../redux/auth/authThunks';
import { useState } from 'react';
import { useEffect } from 'react';

export default function UserProfile() {
  const dispatch=useDispatch()
  const [displayReferCode, setdisplayReferCode] = useState(false)
  const restroDetails = useSelector((state) => state.restrodetail.restro);
  const referCode = useSelector((state) => state.generateReferCode.generateReferCode);
  const referCodeLoading = useSelector((state) => state.generateReferCode.generateReferCodeloading);
 
  
  const generateReferCode=()=>{
    dispatch(referCodeGenerator(restroDetails?.userId))
  } 
  useEffect(()=>{
    if(referCode!==null){
      setdisplayReferCode(true)
    }
  },[referCode])
  const date = new Date();
  const trialdate = new Date(restroDetails?.trialExpirationDate);
  
  // Calculate the difference in milliseconds
  const timeDifference = trialdate.getTime()- date.getTime();
  
  // Convert the difference to days
  const daysRemain = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
  return (
    <div className="modal fade" tabIndex={-1} id="userProfileModal" aria-labelledby="userProfileModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title mt-1">Restaurant Details</h5>
            <button type="button" data-bs-dismiss="modal" aria-label="Close" className="close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="">
              <div className="">
               
                <div className="">
                  
                  <p>
                    <strong>Name:</strong> {restroDetails?.name}
                  </p>
                  <p>
                    <strong>Address:</strong> {restroDetails?.address}
                  </p>
                  <p>
                    <strong>Phone:</strong> {restroDetails?.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {restroDetails?.email}
                  </p>
                  <p>
                    <strong>Expire In:</strong> {daysRemain} Days
                  </p>
                  <p>
                    <strong>Account is:</strong> {restroDetails?.isActive===true?<span className='btn bg-success text-light'>Active <FaUserCheck/></span>:<span className='btn bg-secondary text-light'>Not Active <FaUserAlt/></span>}
                
                  </p>
                  {/* <div onClick={generateReferCode} style={{cursor:"pointer"}}><b><FaLink /><small > Generate refer code</small></b></div>
                <small><b>{displayReferCode&&(<><small>Refer code is:</small> {referCode?.referralCode}</>)}</b></small>
                {referCodeLoading&&(<div className='ml-5'><FaCogs size={25}/></div>)} */}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
       
          </div>
        </div>
      </div>
    </div>
  );
}
