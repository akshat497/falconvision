const User = require("../../models/user");
const CustomErrorHandler = require("../../services/CustomErrorHandler");
const bcrypt = require('bcrypt');
const JwtService = require("../../services/JwtService");
const { sendMessage } = require('fast-two-sms');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { Sequelize } = require('sequelize');
var unirest = require("unirest");


const otpStore = new Map(); // Store OTPs securely
const otpExpiry = 5 * 60 * 1000; 
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'akshatsaini497@gmail.com',
    pass: 'wivohkdnqnizwhrp',
  },
});
const authController = {
    login: async (req, res, next) => {
        const { email, password } = req.body;
        if (email.trim() === "" || password.trim() === "" || !email || !password) {
            return res.status(400).json({ message: "fields missing" });
        }
        let authorization = null;
        try {
            let user = await User.findOne({ where: { email: email } });
            if (!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }
            // Compare passwords
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return next(CustomErrorHandler.wrongCredentials());
            }
            // Generate token
            authorization = JwtService.sign({ userId: user.userId, role: user.role ,isActive:user.isActive});
            res.json({ Authorization: authorization });
        } catch (err) {
            return next(err);
        }
    },
    
    register: async (req, res, next) => {
        const {email,name, password, confirmPassword,phone,address,area,zip, role,isActive } = req.body;
        let hashedPassword = null;
        if (password !== confirmPassword) {
            return next(CustomErrorHandler.passwordError('Password and Confirm Password should be same !'))
        }

        hashedPassword = await bcrypt.hash(password, 10);
        const userObj = {
            
            email,
            name,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            phone,
            address,
            area,
            zip,
            role,
            isActive:false
        }
        let Authorization = null;
        try {
            let user = await User.create(userObj);
            Authorization = JwtService.sign({ userId: user.userId, role: user.role ,isActive:isActive})
        } catch (err) {
            return next(err)
        }

       return res.json({ Authorization })

    },
    SendOtp : async (req, res) => {
  const { phoneNumber, email } = req.body;

  try {
    const otp = generateOTP(6);

    // Store the OTP securely with an expiration time
    const otpData = {
      otp,
      timestamp: Date.now(),
      phoneNumber,
      email,
    };
    otpStore.set(phoneNumber, otpData);

    // Send OTP to email
    await transporter.sendMail({
      from: 'akshatsaini497@gmail.com',
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for password reset is: ${otp}`,
    });

    // Send OTP via SMS
    sendMessage({
      authorization: process.env.API_KEY, // Replace with your Fast2SMS API key
      message: `Your OTP for password reset is: ${otp}`,
      numbers: [phoneNumber],
    });

    console.log(`OTP sent to ${email} and ${phoneNumber}`);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
},
VerifyOtp: async (req, res) => {
  const { phoneNumber, email, enteredOTP } = req.body;

  // Retrieve the stored OTP data
  const otpData = otpStore.get(phoneNumber);
  console.log(`Retrieved OTP for ${phoneNumber}: ${otpData ? otpData.otp : 'Not found'}`);

  if (otpData && enteredOTP === otpData.otp && isOTPValid(otpData.timestamp)) {
    // Check if the email matches the stored data
    if (email === otpData.email) {
      // OTP is valid for both phone and email
      otpStore.delete(phoneNumber); // Remove the used OTP
      res.status(200).json({ message: 'OTP is valid' });
    } else {
      // Email does not match
      res.status(400).json({ message: 'Invalid email associated with this OTP' });
    }
  } else {
    // OTP is invalid or expired
    res.status(400).json({ message: 'Invalid OTP' });
  }
},

    forgetPassword: async(req,res,next)=>{
      const { email,phoneNumber } = req.body;

  try {
    
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(CustomErrorHandler.UserNotFound())
    }
   
    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiration = new Date(Date.now() + 3600000); // Token expires in 1 hour

    await user.save();

    const resetUrl = `http://localhost:3000/resetpassword/${token}`;

    await transporter.sendMail({
      from: 'akshatsaini497@gmail.com',
      to: email,
      subject: 'Password Reset',
      text: `Click on the following link to reset your password: ${resetUrl}`,
    });
    var req = unirest("POST", "https://www.fast2sms.com/dev/bulkV2");

    req.headers({
      "authorization": process.env.QUICK_SMS_API
    });
    
    req.form({
      "message": `Click on the following link to reset your password: ${resetUrl}`,
      "language": "english",
      "route": "q",
      "numbers": phoneNumber,
    });
    
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
    
      console.log(res.body);
    });

// Sending SMS

    // sendMessage({
    //   authorization: process.env.QUICK_SMS_API, // Replace with your Fast2SMS API key
    //   message: `Click on the following link to reset your password: ${resetUrl}`,
    //   numbers: [phoneNumber],
    // });
    
    return res.json({ message: 'Password reset link sent' });
  } catch (error) {
    console.error(error);
   return  res.status(500).json({ message: 'Internal server error' });
  }
},


 authresetPassword : async (req, res, next) => {
  const { token, newPassword, confirmPassword } = req.body;

  try {
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password do not match' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOne({
      where: {
        resetToken: token,
        resetTokenExpiration: { [Sequelize.Op.gt]: new Date() },
      },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Check if new password is different from the old password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: 'New password cannot be the same as the old password' });
    }

    // Update the user's password (hash the new password)
  

    user.password = hashedPassword;
    user.confirmPassword = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;

    await user.save();

    return res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
}







function generateOTP() {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    return otp.toString();
}

  function isOTPValid(timestamp) {
    return Date.now() - timestamp <= otpExpiry;
  }
  
module.exports = authController;