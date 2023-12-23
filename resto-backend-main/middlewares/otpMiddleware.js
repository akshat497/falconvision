// otpMiddleware.js
const { verifyOTP } = require('../utils/otpUtils');

const otpVerificationMiddleware = async (req, res, next) => {
  const { phoneNumber, email, enteredOTP } = req.body;

  const verificationResult = await verifyOTP(phoneNumber, email, enteredOTP,res);

  if (verificationResult.isValid) {
    req.otpVerificationResult = verificationResult;
    next();
  } else {
    res.status(400).json({ message: verificationResult.message });
  }
};

module.exports = {
  otpVerificationMiddleware,
};
