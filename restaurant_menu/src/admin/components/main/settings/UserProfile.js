import React from "react";
import {
  FaCogs,
  FaEdit,
  FaExclamationTriangle,
  FaHourglassEnd,
  FaLink,
  FaRegSave,
  FaUndo,
  FaUserAlt,
  FaUserCheck,
  
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { referCodeGenerator } from "../../../../redux/auth/authThunks";
import { useState } from "react";
import { useEffect } from "react";
import { updateUser } from "../../../../redux/users/userthunk";

export default function UserProfile() {
  const dispatch = useDispatch();
  
  const restroDetails = useSelector((state) => state.restrodetail.restro);
  const updatingUser = useSelector((state) => state.updateUser.updateUserloading);

  // updateUser.updateUser.updateUserloading


  const [displayReferCode, setdisplayReferCode] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [editedName, setEditedName] = useState(restroDetails?.name);
  const [editedArea, setEditedArea] = useState(restroDetails?.area);
  const [editedAddress, setEditedAddress] = useState(restroDetails?.address);
  const [DaysLeft, setDaysLeft] = useState(0);
  const handleEditClick = () => {
    setIsEditing(true);
  };
 useEffect(()=>{
  setEditedAddress(restroDetails?.address)
  setEditedName(restroDetails?.name)
  setEditedArea(restroDetails?.area)

 },[restroDetails])
  const handleSaveClick = () => {
    const userObj={
      name: editedName,
      area: editedArea,
      address: editedAddress,
      userId:restroDetails?.userId
    }
    dispatch(updateUser(userObj))
    
  };
  useEffect(()=>{
   if(updatingUser!==null){
    if(updatingUser){
      setIsEditing(true);
    }else{
      setIsEditing(false);
    }
   }
  },[updatingUser])
  const referCode = useSelector(
    (state) => state.generateReferCode.generateReferCode
  );
  const referCodeLoading = useSelector(
    (state) => state.generateReferCode.generateReferCodeloading
  );

  const generateReferCode = () => {
    dispatch(referCodeGenerator(restroDetails?.userId));
  };
  useEffect(() => {
    if (referCode !== null) {
      setdisplayReferCode(true);
    }
  }, [referCode]);
  useEffect(() => {
    if (
      editedAddress !== restroDetails?.address ||
      editedArea !== restroDetails?.area ||
      editedName !== restroDetails?.name
    ) {
      setdisabled(false);
    } else {
      setdisabled(true);
    }
  }, [editedAddress, editedName, editedArea, restroDetails]);
  
 

  // Convert the difference to days
  
  useEffect(() => {
    const currentDate = new Date();
    const trialDate = new Date(restroDetails?.trialExpirationDate);
  
    // Set the time to midnight for both dates
    currentDate.setHours(0, 0, 0, 0);
    trialDate.setHours(0, 0, 0, 0);
  
    // Calculate the difference in milliseconds
    const timeDifference = trialDate.getTime() - currentDate.getTime();
    const daysRemain = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    if (trialDate.getTime() === currentDate.getTime()) {
      setDaysLeft(<div className="text-warning"><b>Today <FaHourglassEnd/></b></div>);
    } else if (trialDate.getTime() < currentDate.getTime()) {
      setDaysLeft(<div className="text-danger"><b>Expired <FaExclamationTriangle/></b></div>);
    } else {
      setDaysLeft(<div>{daysRemain} days left </div>);
    }
  
  }, [restroDetails]);
  
  
  return (
    <div
      className="modal fade"
      tabIndex={-1}
      id="userProfileModal"
      aria-labelledby="userProfileModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title mt-1 ">
            Restaurant Details 
            {isEditing ? (
                    <>{updatingUser===false?<>{disabled===true?<FaRegSave  className="mx-4" size={32} style={{ cursor: disabled===true ? 'not-allowed' : 'pointer' ,color:"purple"}}/>:<FaRegSave onClick={handleSaveClick} size={32} className="mx-4" style={{ cursor: disabled===true ? 'not-allowed' : 'pointer' ,color:"purple"}}/>}<FaUndo onClick={()=>{setIsEditing(false)}} style={{cursor:"pointer"}}/></>:"Saving..."}</>
                  ) : (
               <>     <FaEdit onClick={handleEditClick} className="mx-2" style={{cursor:"pointer"}} size={32}/></>
                  )}
            
            </h5>
            <button
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              className="close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="">
              <div className="">
                <div className="">
                  <p className="d-flex ">
                    <div className="col-md-4"><strong>Name:</strong></div>
                    {isEditing ? (
                      <div className="col-md-8"><input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="form-control " style={{height:"25px",width:"50%"}}/></div>
                    ) : (
                      restroDetails?.name
                    )}
                  </p>
                  <p className="d-flex ">
                  <div className="col-md-4"><strong>Area:</strong></div>
                    {isEditing ? (
                      <div className="col-md-8">  <input type="text" value={editedArea} onChange={(e) => setEditedArea(e.target.value)} className="form-control " style={{height:"25px",width:"50%"}}/>
                    </div>
                    ) : (
                      restroDetails?.area
                    )}
                  </p>
                  <p className="d-flex ">
                  <div className="col-md-4"><strong>Address:</strong></div>
                    {isEditing ? (
                      <div className="col-md-8">  <input type="text" value={editedAddress} onChange={(e) => setEditedAddress(e.target.value)} className="form-control " style={{height:"25px",width:"50%"}}/>
                    </div>
                    ) : (
                      restroDetails?.address
                    )}
                  </p>
                  <p  className="d-flex ">
                  <div className="col-md-4"><strong>Phone:</strong></div> {restroDetails?.phone}
                  </p>
                  <p  className="d-flex ">
                  <div className="col-md-4"><strong>Email:</strong></div>  {restroDetails?.email}
                  </p>
                  <p  className="d-flex ">
                  <div className="col-md-4"><strong>Expire:</strong></div>  {DaysLeft}

                  </p>
                  <p  className="d-flex ">
                  <div className="col-md-4"><strong>Account Is:</strong></div> 
                    {restroDetails?.isActive === true ? (
                      <span className="btn bg-success text-light">
                        Active <FaUserCheck />
                      </span>
                    ) : (
                      <span className="btn bg-secondary text-light">
                        Not Active <FaUserAlt />
                      </span>
                    )}
                  </p>
                  <div
                    onClick={generateReferCode}
                    style={{ cursor: "pointer" }}
                  >
                    <b>
                      <FaLink />
                      <small> Generate refer code</small>
                    </b>
                  </div>
                  <small>
                    <b>
                      {displayReferCode && (
                        <>
                          <small>Refer code is:</small>{" "}
                          {referCode?.referralCode}
                        </>
                      )}
                    </b>
                  </small>
                  {referCodeLoading && (
                    <div className="ml-5">
                      <FaCogs size={25} />
                    </div>
                  )}
                </div>
                <div>
                  <small>
                    <b>
                      {displayReferCode && (
                        <>
                          <small>Refer link is:</small>{" "}
                          <a
                            href={`${window.location.origin}/Signup`}
                            target="_"
                          >
                            {window.location.origin}
                          </a>
                        </>
                      )}
                    </b>
                  </small>
                </div>
                
                <div className="text-danger">
                <small>
                    Please note: The bonus 2 days of membership will only be
                    granted if the signup is done by a restaurant user. If the
                    signup is done by a non-restaurant user, the bonus will not
                    be applicable.
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer"></div>
        </div>
      </div>
    </div>
  );
}
