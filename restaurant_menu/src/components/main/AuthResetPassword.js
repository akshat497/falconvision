// React component for resetting password
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you use React Router

import { useDispatch } from 'react-redux';
import { authResetPassword } from '../../redux/auth/authThunks';
import { toast } from 'react-toastify';

const AuthResetPassword = () => {
    const dispatch=useDispatch()
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const validatePasswords = () => {
    setPasswordsMatch(newPassword === confirmPassword);
  };
  const handlePasswordChange = (value) => {
    setNewPassword(value);
    validatePasswords();
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    validatePasswords();
  };
  
  const handleResetPassword = async () => {
    if (newPassword!==confirmPassword || newPassword.length === 0) {
      // You can handle this validation more gracefully (e.g., show an error message)
      toast.error('Invalid passwords',{
        autoClose:false,
        position:"top-right",
        hideProgressBar: false,
        closeOnClick: true,
        closeButton:false
      });
      return;
    }

    const resetData = {
      token,
      newPassword,
      confirmPassword
    };

    dispatch(authResetPassword(resetData));
  };

  return (
    <div className="reset-password-form my-5">
    <h2>Reset Password</h2>
    <label htmlFor="newPassword">New Password:</label>
    <input
      type="password"
      id="newPassword"
      value={newPassword}
      onChange={(e) => handlePasswordChange(e.target.value)}
    />
    <label htmlFor="confirmPassword">Confirm Password:</label>
    <input
      type="password"
      id="confirmPassword"
      value={confirmPassword}
      onChange={(e) => handleConfirmPasswordChange(e.target.value)}
    />
    {/* {!passwordsMatch && <p className="error-text">Passwords do not match.</p>} */}
    <button
      onClick={handleResetPassword}
      className='btn '
      style={{backgroundColor:"purple"}}
    >
      Submit
    </button>
  </div>
  );
};

export default AuthResetPassword;
