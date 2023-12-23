// otpUtils.js
const OTP = require('../models/OTP');
const otpExpiry = 7 * 60 * 1000; // Assuming otpExpiry is defined somewhere in your code

function isOTPValid(timestamp) {
  return Date.now() - timestamp <= otpExpiry;
}

const verifyOTP = async (phoneNumber, email, enteredOTP, res) => {
  try {
    const otpData = await OTP.findOne({ where: { phoneNumber, email,otp:enteredOTP } });

    if (otpData && enteredOTP === otpData.otp && isOTPValid(otpData.timestamp)) {
      // Valid OTP
      // Destroy the OTP record
      await OTP.destroy({ where: { phoneNumber, email,otp:enteredOTP } });

      return { isValid: true, message: 'OTP is valid' };
    } else {
      // Invalid OTP or expired
      // Destroy the expired OTP record
      if (otpData && !isOTPValid(otpData.timestamp)) {
        await OTP.destroy({ where: { phoneNumber, email ,otp:enteredOTP} });
      }

      return { isValid: false, message: 'Invalid OTP or phone number' };
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    // Handle the error and send an appropriate response
    res.status(500).json({ message: 'Internal server error during OTP verification' });
    return { isValid: false, message: 'Internal server error' };
  }
};

module.exports = {
  verifyOTP,
};
