import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  
  resetPassword,
} from "../../../../../redux/auth/authThunks";
import { toast } from "react-toastify";
import PasswordResetLinkConfirmModal from "./PasswordResetLinkConfirmModal";

export default function PasswordResetModal() {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [ShowAlert, setShowAlert] = useState(false);
  const ForgetPasswordResponse=useSelector((state)=>state.forgetpassword.forgetpassword) 
   

  const loadingForgetPassword = useSelector(
    (state) => state.forgetpassword.forgetpasswordloading
  );

  const handleReset = () => {
    if (
      oldPassword.trim() === "" ||
      newPassword.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      return toast.warn("Fill All Fields");
    }
    if (newPassword !== confirmPassword) {
      return toast.warn("Passwords Don't Match");
    }
    if (newPassword === oldPassword) {
      return toast.warn("New password should be different than old one.");
    }
    const body = {
      oldPassword: oldPassword,
      password: newPassword,
      confirmPassword: confirmPassword,
    };
    dispatch(resetPassword(body));
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  useEffect(()=>{
    if(ForgetPasswordResponse!==null){
        if(ForgetPasswordResponse?.success===true){
            setShowAlert(false)
        }
    }
  },[ForgetPasswordResponse])
  return (
    <>
      
      <div
        className="modal fade "
        tabIndex={-1}
        id="passwordResetModal"
        aria-labelledby="passwordResetModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Password Reset</h2>
              <button
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
                className="close"
                onClick={() => {
                  setOldPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div>
                <div className="mb-3">
                  <label htmlFor="oldPassword" className="form-label">
                    Old Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="oldPassword"
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newPassword" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="newPassword"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button
                  onClick={()=>{setShowAlert(!ShowAlert)}}
                  className="btn"
                  disabled={loadingForgetPassword}
                >
                  Forget password?
                </button>
              </div>
              {
        ShowAlert&&(
          <div className="my-3">{
            <PasswordResetLinkConfirmModal />
          }</div>
        )
      }
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={handleReset}
                style={{ backgroundColor: "purple" }}
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <ForgetPassword/> */}
     
      
    </>
  );
}
